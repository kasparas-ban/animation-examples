"use client";

import { useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { Sparkle } from "lucide-react";

const DEFAULT_WIDTH = 80;
const HEIGHT_TO_WIDTH_RATIO = 38 / 80;
const SPARKLE_PADDING = 4;

const EASING = CustomEase.create("custom", "0.65, 0, 0.35, 1");
const LOADING_GRADIENT = `linear-gradient(225.69deg, var(--muted-5) -0.38%, var(--accent) 55.51%)`;

export default function SpinnerGSAP({
  width = DEFAULT_WIDTH,
}: {
  width?: number;
}) {
  const containerRef = useRef(null);
  const sparkleRef = useRef(null);

  const height = width * HEIGHT_TO_WIDTH_RATIO;
  const sparkleSize = height - 2 * SPARKLE_PADDING;
  const translateX = width - sparkleSize - 2 * SPARKLE_PADDING;

  useGSAP(
    () => {
      if (!containerRef.current || !sparkleRef.current) return;

      gsap.to(containerRef.current, {
        rotate: -90,
        ease: EASING,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        yoyoEase: EASING,
      });
      gsap.to(sparkleRef.current, {
        x: translateX,
        rotate: 180,
        ease: EASING,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        yoyoEase: EASING,
      });
    },
    { scope: containerRef }
  );

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
