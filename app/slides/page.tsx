"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialSlideParam = Number(searchParams.get("slide"));
  const initialSlide = Number.isNaN(initialSlideParam)
    ? 0
    : Math.min(Math.max(initialSlideParam, 0), slides.length - 1);

  const [currentSlide, setCurrentSlide] = useState(initialSlide);

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

  // Update the URL when the slide changes
  useEffect(() => {
    router.replace(`${pathname}?slide=${currentSlide}`, { scroll: false });
  }, [currentSlide, pathname, router]);

  const CurrentSlide = slides[currentSlide];

  return (
    <div>
      <CurrentSlide />
    </div>
  );
}
