"use client";

import { Sparkle } from "lucide-react";
import { useEffect, useRef } from "react";
import "./spinner-waapi.css";

const DEFAULT_WIDTH = 80;
const HEIGHT_TO_WIDTH_RATIO = 38 / 80;
const SPARKLE_PADDING = 4;

const EASING = "cubic-bezier(0.65, 0, 0.35, 1)";
const LOADING_GRADIENT = `linear-gradient(225.69deg, var(--muted-5) -0.38%, var(--accent) 55.51%)`;

const gradientKeyframes: Keyframe[] = [
  {
    rotate: "0deg",
    easing: EASING,
  },
  {
    rotate: "-90deg",
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
  }, [translateX]);

  return (
    <div
      className="relative rounded-full flex items-center overflow-hidden"
      style={{
        width,
        height: width * HEIGHT_TO_WIDTH_RATIO,
        padding: SPARKLE_PADDING,
      }}
    >
      <div
        ref={containerRef}
        className="absolute inset-0 rounded-full top-[-50%]"
        style={{ width, height: width, background: LOADING_GRADIENT }}
      />
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
