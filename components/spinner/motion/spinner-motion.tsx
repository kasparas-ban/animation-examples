"use client";

import { Sparkle } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/utils/utils";

export type SpinnerStatus = "idle" | "loading";

interface SpinnerProps {
  status?: SpinnerStatus;
  animationDelay?: number;
  size?: string;
}

const LOADING_GRADIENT_RIGHT =
  "linear-gradient(131.05deg, var(--muted-25) -13.19%, var(--accent) 76.2%)";
const LOADING_GRADIENT_LEFT =
  "linear-gradient(225.69deg, var(--muted-25) -12.38%, var(--accent) 55.51%)";
const IDLE_GRADIENT =
  "linear-gradient(131.73deg, var(--muted-50) 13.53%, var(--accent) 108.44%)";

const SPARKLE_ROTATION = 180; // degrees
const ANIMATION_DURATION = 1.5; // seconds
const ANIMATION_DELAY = 0.1; // seconds

export default function SpinnerMotion({
  status = "loading",
  animationDelay = 0,
  size = "large",
}: SpinnerProps) {
  const LOADER_MAX_WIDTH = size === "large" ? 80 : 40;
  const sparkleX = size === "large" ? 42 : 15;
  const sparkleSize = size === "large" ? "size-7.5" : "size-4";

  return (
    <motion.div
      className="relative flex h-fit rounded-full"
      animate={status}
      variants={{
        idle: { width: 38 }, // calc(var(--spacing) * 7.5) + calc(var(--spacing) * 1) * 2
        loading: { width: LOADER_MAX_WIDTH },
      }}
      transition={{ delay: status === "idle" ? 0 : animationDelay }}
    >
      <motion.div
        className="flex w-full rounded-full p-1"
        animate={status}
        style={{ background: IDLE_GRADIENT }}
        variants={{
          idle: {
            background: IDLE_GRADIENT,
            transition: {
              duration: 0.3,
              ease: "easeInOut",
              layout: { type: "tween", ease: "linear" },
              delay: animationDelay,
            },
          },
          loading: {
            background: [LOADING_GRADIENT_LEFT, LOADING_GRADIENT_RIGHT],
            transition: {
              duration: ANIMATION_DURATION,
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: ANIMATION_DELAY,
              ease: "easeInOut",
              delay: animationDelay,
            },
          },
        }}
      >
        <motion.div
          variants={{
            idle: { x: 0, transition: { duration: 0.1, type: "tween" } },
            loading: {
              x: sparkleX,
              transition: {
                duration: ANIMATION_DURATION,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: ANIMATION_DELAY,
                ease: [0.65, 0, 0.35, 1],
                delay: animationDelay,
              },
            },
          }}
        >
          <motion.div
            className="w-min"
            initial={{ rotate: 0 }}
            variants={{
              loading: { rotate: SPARKLE_ROTATION },
              idle: {
                rotate: 0,
                transition: {
                  repeat: 0,
                  type: "tween",
                  layout: { type: "tween", ease: "linear" },
                },
              },
            }}
            transition={{
              duration: ANIMATION_DURATION,
              repeat: Infinity,
              repeatDelay: ANIMATION_DELAY,
              ease: "easeInOut",
              repeatType: "mirror",
              delay: animationDelay,
            }}
          >
            <Sparkle
              fill="var(--background)"
              className={cn("text-transparent", sparkleSize)}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
