"use client";

import { Sparkle } from "lucide-react";
import { useEffect, useRef } from "react";
import "./spinner-waapi.css";

const EASING = "cubic-bezier(0.65, 0, 0.35, 1)";

const LOADING_GRADIENT_RIGHT =
  "linear-gradient(131.05deg, var(--muted-25) -13.19%, var(--accent) 76.2%)";
const LOADING_GRADIENT_LEFT =
  "linear-gradient(225.69deg, var(--muted-25) -12.38%, var(--accent) 55.51%)";

const gradientKeyframes: Keyframe[] = [
  {
    background: LOADING_GRADIENT_LEFT,
    easing: EASING,
  },
  {
    background: LOADING_GRADIENT_RIGHT,
    easing: EASING,
  },
];

const sparkleKeyframes: Keyframe[] = [
  {
    transform: "translateX(0px) rotate(0deg)",
    easing: EASING,
  },
  {
    transform: "translateX(42px) rotate(180deg)",
    easing: EASING,
  },
  {
    transform: "translateX(0px) rotate(0deg)",
    easing: EASING,
  },
];

const animationOptions: KeyframeAnimationOptions = {
  duration: 3200, // 3.2s to match motion implementation
  iterations: Infinity,
};

export default function SpinnerWebAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sparkleRef.current) return;

    const container = containerRef.current;
    const sparkle = sparkleRef.current;

    const gradientAnimation = container.animate(
      gradientKeyframes,
      animationOptions
    );

    const sparkleAnimation = sparkle.animate(
      sparkleKeyframes,
      animationOptions
    );

    return () => {
      gradientAnimation.cancel();
      sparkleAnimation.cancel();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-full h-[38px] w-[80px] flex items-center p-1"
      style={{ backgroundImage: LOADING_GRADIENT_RIGHT }}
    >
      <div ref={sparkleRef}>
        <Sparkle
          fill="var(--background)"
          className="text-transparent size-7.5"
        />
      </div>
    </div>
  );
}
