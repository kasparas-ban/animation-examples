"use client";

import { Sparkle } from "lucide-react";
import { Easing, motion } from "motion/react";

const LOADING_GRADIENT_RIGHT =
  "linear-gradient(131.05deg, var(--muted-25) -13.19%, var(--accent) 76.2%)";
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
    <motion.div
      className="relative flex h-fit rounded-full"
      style={{ width, height }}
    >
      <motion.div
        className="flex w-full rounded-full p-1"
        animate={{
          background: [LOADING_GRADIENT_LEFT, LOADING_GRADIENT_RIGHT],
        }}
        transition={{
          duration: ANIMATION_DURATION,
          repeat: Infinity,
          repeatType: "mirror",
          ease: EASING,
        }}
      >
        <motion.div
          animate={{
            x: translateX,
            rotate: SPARKLE_ROTATION,
          }}
          transition={{
            duration: ANIMATION_DURATION,
            repeat: Infinity,
            repeatType: "mirror",
            ease: EASING,
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
      </motion.div>
    </motion.div>
  );
}
