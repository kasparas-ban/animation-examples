"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Slide1 from "./slide-1";
import Slide2 from "./slide-2";
import Slide3 from "./slide-3";
import Slide4 from "./slide-4";
import Slide5 from "./slide-5";
import Slide6 from "./slide-6";
import Slide7 from "./slide-7";
import Slide8 from "./slide-8";
import Slide9 from "./slide-9";
import Slide10 from "./slide-10";
import Slide11 from "./slide-11";
import Slide12 from "./slide-12";

const slides = [
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  Slide8,
  Slide9,
  Slide10,
  Slide11,
  Slide12,
  // SlideRive,
  // SlideTech2,
  // SlideTransition,
  // Test,
  // ViewTransitionsCSS,
  // ViewTransitionsMotion,
];

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialSlideParam = Number(searchParams.get("slide"));
  const initialSlide = Number.isNaN(initialSlideParam)
    ? 0
    : Math.min(Math.max(initialSlideParam, 0), slides.length - 1);

  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const CurrentSlide = slides[currentSlide];

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

  useEffect(() => {
    router.replace(`${pathname}?slide=${currentSlide}`, { scroll: false });
  }, [currentSlide, pathname, router]);

  return (
    <div>
      <CurrentSlide />
    </div>
  );
}
