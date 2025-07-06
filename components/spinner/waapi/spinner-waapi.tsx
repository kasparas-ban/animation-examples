"use client";

import { Sparkle } from "lucide-react";
import { useEffect, useRef } from "react";
import "./spinner-waapi.css";

const DEFAULT_WIDTH = 80;
const HEIGHT_TO_WIDTH_RATIO = 38 / 80;
const SPARKLE_PADDING = 4;

const EASING = "cubic-bezier(0.65, 0, 0.35, 1)";
const LOADING_GRADIENT = `linear-gradient(var(--g-angle), var(--muted-25) var(--g-stop1), var(--accent) var(--g-stop2))`;

const LEFT_GRADIENT_ANGLES = {
  "--g-angle": "131.05deg",
  "--g-stop1": "-13.19%",
  "--g-stop2": "76.2%",
};

const RIGHT_GRADIENT_ANGLES = {
  "--g-angle": "225.69deg",
  "--g-stop1": "-12.38%",
  "--g-stop2": "55.51%",
};

const gradientKeyframes: Keyframe[] = [
  {
    ...RIGHT_GRADIENT_ANGLES,
    easing: EASING,
  },
  {
    ...LEFT_GRADIENT_ANGLES,
    easing: EASING,
  },
];

const getSparkleKeyframes = (transformX: number): Keyframe[] => [
  {
    transform: "translateX(0px) rotate(0deg)",
    easing: EASING,
  },
  {
    transform: `translateX(${transformX}px) rotate(180deg)`,
    easing: EASING,
  },
];

const animationOptions: KeyframeAnimationOptions = {
  duration: 1600, // 1.6s
  iterations: Infinity,
  direction: "alternate",
};

export default function SpinnerWebAnimations({
  width = DEFAULT_WIDTH,
}: {
  width?: number;
}) {
  const height = width * HEIGHT_TO_WIDTH_RATIO;
  const sparkleSize = height - 2 * SPARKLE_PADDING;
  const translateX = width - sparkleSize - 2 * SPARKLE_PADDING;

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
      getSparkleKeyframes(translateX),
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
      className="rounded-full flex items-center"
      style={{
        backgroundImage: LOADING_GRADIENT,
        width,
        height: width * HEIGHT_TO_WIDTH_RATIO,
        padding: SPARKLE_PADDING,
      }}
    >
      <div ref={sparkleRef}>
        <Sparkle
          fill="var(--background)"
          className="text-transparent translate-x-0"
          style={{
            width: sparkleSize,
            height: sparkleSize,
          }}
        />
      </div>
    </div>
  );
}
