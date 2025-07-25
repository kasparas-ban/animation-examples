"use client";

import { useEffect, useState } from "react";
import Slide1 from "./slide-1";
import Slide2 from "./slide-2";
import ViewTransitionsMotion from "../../components/view-transitions/motion/view-transitions-motion";
import ViewTransitionsCSS from "@/components/view-transitions/css/view-transitions-css";
import Test from "./test";

const slides = [
  Test,
  ViewTransitionsCSS,
  ViewTransitionsMotion,
  Slide1,
  Slide2,
];

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (event.key === "ArrowLeft") {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <div>{slides[currentSlide]()}</div>;
}
