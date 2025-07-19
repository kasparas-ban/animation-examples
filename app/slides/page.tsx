"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import SpinnerCSS from "@/components/spinner/css/spinner-css";

const RELATIVE_WIDTH = 1728;
const RELATIVE_HEIGHT = 1080;

const slides = [Slide1, Slide8];

function Slide1() {
  return <SlideBackground idx={1} />;
}

function Slide8() {
  return (
    <SlideBackground idx={8}>
      <div className="translate-x-[615px] translate-y-[635px]">
        <SpinnerCSS width={240} />
      </div>
    </SlideBackground>
  );
}

function SlideBackground({
  idx,
  children,
}: {
  idx: number;
  children?: ReactNode;
}) {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div
        className="absolute overflow-hidden"
        style={{
          width: RELATIVE_WIDTH,
          height: RELATIVE_HEIGHT,
        }}
      >
        <Image
          src={`/slides/slide-${idx}.svg`}
          alt={`Slide ${idx}`}
          className="w-full h-full object-contain"
          width={RELATIVE_WIDTH}
          height={RELATIVE_HEIGHT}
          priority
        />
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  );
}

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
