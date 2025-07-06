"use client";

import { useEffect, useRef } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import Slide1 from "./slide-1";
import Slide2 from "./slide-2";
import Slide3 from "./slide-3";

export default function Page() {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance

  useEffect(() => {
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current!, {
      transition: "slide",
      center: false,
    });

    deckRef.current.initialize().then(() => {
      // good place for event handlers and plugin setups
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
        <Slide1 />
        <Slide2 />
        <Slide3 />
      </div>
    </div>
  );
}
