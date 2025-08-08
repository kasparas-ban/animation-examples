"use client";

import { Sparkle } from "lucide-react";
import { Easing, motion } from "motion/react";

const LOADING_GRADIENT_LEFT =
  "linear-gradient(225.69deg, var(--muted-25) -12.38%, var(--accent) 55.51%)";

const EASING: Easing = [0.65, 0, 0.35, 1];

const SPARKLE_ROTATION = 180; // degrees
const ANIMATION_DURATION = 1.6; // seconds

const DEFAULT_WIDTH = 80;
const HEIGHT_TO_WIDTH_RATIO = 38 / 80;
const SPARKLE_PADDING = 4;

export default function SpinnerMotion({
  width = DEFAULT_WIDTH,
}: {
  width?: number;
}) {
  const height = width * HEIGHT_TO_WIDTH_RATIO;
  const sparkleSize = height - 2 * SPARKLE_PADDING;
  const translateX = width - sparkleSize - 2 * SPARKLE_PADDING;

  return (
    <div
      className="relative flex items-center h-fit rounded-full overflow-hidden"
      style={{ width, height, padding: SPARKLE_PADDING }}
    >
      <motion.div
        className="absolute inset-0 rounded-full top-[-50%]"
        style={{
          width,
          height: width,
          background: LOADING_GRADIENT_LEFT,
        }}
        initial={{ transform: `rotate(0deg)` }}
        animate={{ transform: `rotate(-90deg)` }}
        transition={{
          duration: ANIMATION_DURATION,
          repeat: Infinity,
          ease: EASING,
          repeatType: "reverse",
        }}
      />
      <motion.div
        initial={{ transform: `translateX(0px) rotate(0deg)` }}
        animate={{
          transform: `translateX(${translateX}px) rotate(${SPARKLE_ROTATION}deg)`,
        }}
        transition={{
          duration: ANIMATION_DURATION,
          repeat: Infinity,
          ease: EASING,
          repeatType: "reverse",
        }}
      >
        <Sparkle
          fill="var(--background)"
          className="text-transparent"
          style={{
            width: sparkleSize,
            height: sparkleSize,
          }}
        />
      </motion.div>
    </div>
  );
}
