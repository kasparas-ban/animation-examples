"use client";

import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Document, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function Slides() {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

  const [numPages, setNumPages] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  const onDocumentLoad = (pdf: PDFDocumentProxy) => {
    setPdfDocument(pdf);
    setNumPages(pdf.numPages);
  };

  // Update viewport size
  useEffect(() => {
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewportSize();
    window.addEventListener("resize", updateViewportSize);

    return () => window.removeEventListener("resize", updateViewportSize);
  }, []);

  useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current!, {
      transition: "slide",
      // other config options
    });

    deckRef.current.initialize().then(() => {
      // Listen for slide change events
      deckRef.current?.on("slidechanged", (event) => {
        // Subtract 2 because we have 2 manual slides before PDF slides
        const slideEvent = event as unknown as {
          indexh: number;
          indexv: number;
        };
        const pdfSlideIndex = slideEvent.indexh - 2;
        if (pdfSlideIndex >= 0 && pdfSlideIndex < numPages) {
          setCurrentSlide(pdfSlideIndex);
        }
      });

      // Set initial slide if we're on a PDF slide
      const initialSlide = deckRef.current?.getIndices().h || 0;
      const initialPdfSlide = initialSlide - 2;
      if (initialPdfSlide >= 0 && initialPdfSlide < numPages) {
        setCurrentSlide(initialPdfSlide);
      }
    });

    return () => {
      if (deckRef.current) {
        deckRef.current.destroy();
        deckRef.current = null;
      }
    };
  }, [numPages]);

  // Portal content for PDF pages
  const renderPdfPages = () => {
    if (numPages === 0 || !pdfDocument || viewportSize.width === 0) return null;

    return slideRefs.current.map((slideElement, index) => {
      if (!slideElement) return null;

      // Only render the current slide to improve performance
      if (currentSlide === index) {
        return createPortal(
          <div className="flex items-center justify-center w-full h-full">
            <Page
              key={`portal-page-${index + 1}`}
              pdf={pdfDocument}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={viewportSize.width}
              height={viewportSize.height}
              className="max-w-full max-h-full object-contain"
            />
          </div>,
          slideElement
        );
      }

      return null;
    });
  };

  return (
    <>
      <div className="reveal" ref={deckDivRef}>
        <div className="slides">
          <section>Slide 1</section>
          <section>Slide 2</section>

          {/* Create empty sections for PDF pages */}
          {Array.from(new Array(numPages), (el, index) => (
            <section
              key={`page_${index + 1}`}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className="flex items-center justify-center w-full h-full"
            />
          ))}
        </div>
      </div>

      {/* Hidden Document component for PDF loading */}
      <div style={{ display: "none" }}>
        <Document
          file="/slides.pdf"
          onLoadSuccess={onDocumentLoad}
          onLoadError={(error) => console.error("Error loading PDF:", error)}
        />
      </div>

      {/* Render PDF pages via portals */}
      {renderPdfPages()}
    </>
  );
}
