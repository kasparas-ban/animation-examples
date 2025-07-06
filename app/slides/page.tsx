"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import Slide1 from "./slide-1";
import Slide2 from "./slide-2";
import Slide3 from "./slide-3";

const slides = [Slide1, Slide2, Slide3];

export default function Page() {
  const deckDivRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<Reveal.Api | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current!, {
      transition: "slide",
      center: false,
    });

    deckRef.current.initialize().then(() => {
      deckRef.current?.on("slidechanged", (event: any) => {
        setCurrentSlide(event.indexh ?? 0);
      });
    });

    return () => {
      if (!deckRef.current) return;
      deckRef.current.destroy();
      deckRef.current = null;
    };
  }, []);

  return (
    <div
      className="reveal !font-(family-name:--font-geist-sans)"
      ref={deckDivRef}
    >
      <div className="slides">
        {slides.map((SlideComponent, idx) => (
          <section key={idx}>
            {currentSlide === idx ? <SlideComponent /> : null}
          </section>
        ))}
      </div>
    </div>
  );
}
