"use client";

import { Sparkle } from "lucide-react";
import { Easing, motion } from "motion/react";
import { useEffect, useState } from "react";

const LOADING_GRADIENT_LEFT =
  "linear-gradient(225.69deg, var(--muted-25) -12.38%, var(--accent) 55.51%)";

const EASING: Easing = [0.65, 0, 0.35, 1];

const SPARKLE_ROTATION = 180; // degrees
const ANIMATION_DURATION = 1.6; // seconds

const DEFAULT_WIDTH = 80;
const HEIGHT_TO_WIDTH_RATIO = 38 / 80;
const SPARKLE_PADDING = 4;

export default function SpinnerMotionLayout({
  width = DEFAULT_WIDTH,
}: {
  width?: number;
}) {
  const height = width * HEIGHT_TO_WIDTH_RATIO;
  const sparkleSize = height - 2 * SPARKLE_PADDING;
  const translateX = width - sparkleSize - 2 * SPARKLE_PADDING;

  const [isLeft, setIsLeft] = useState(true);

  useEffect(() => {
    setIsLeft((prev) => !prev);
    const timer = setInterval(() => {
      setIsLeft((prev) => !prev);
    }, ANIMATION_DURATION * 1000);

    return () => clearInterval(timer);
  }, []);

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
          delay: ANIMATION_DURATION,
        }}
      />
      {isLeft ? (
        <motion.div
          key="left"
          layoutId="sparkle"
          className="z-10"
          style={{ x: 0, rotate: 0 }}
          transition={{
            layout: { duration: ANIMATION_DURATION, ease: EASING },
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
      ) : (
        <motion.div
          key="right"
          layoutId="sparkle"
          className="z-10"
          style={{ x: translateX, rotate: SPARKLE_ROTATION }}
          transition={{
            layout: { duration: ANIMATION_DURATION, ease: EASING },
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
      )}
    </div>
  );
}
