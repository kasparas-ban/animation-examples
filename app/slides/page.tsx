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
import Slide13 from "./slide-13";
import Slide14 from "./slide-14";
import Slide15 from "./slide-15";
import Slide16 from "./slide-16";
import Slide17 from "./slide-17";
import Slide18 from "./slide-18";
import Slide19 from "./slide-19";
import Slide20 from "./slide-20";
import Slide21 from "./slide-21";
import Slide22 from "./slide-22";
import Slide23 from "./slide-23";
import Slide24 from "./slide-24";
import Slide25 from "./slide-25";

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
  Slide13,
  Slide14,
  Slide15,
  Slide16,
  Slide17,
  Slide18,
  Slide19,
  Slide20,
  Slide21,
  Slide22,
  Slide23,
  Slide24,
  Slide25,
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
