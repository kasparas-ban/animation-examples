import { Sparkle } from "lucide-react";
import { Easing, motion } from "motion/react";

export type LoadingSpinnerStatus = "idle" | "loading";

interface LoadingSpinnerProps {
  status?: LoadingSpinnerStatus;
  width?: number;
}

const LOADING_GRADIENT_RIGHT =
  "linear-gradient(131.05deg, var(--muted-25) -13.19%, var(--accent) 76.2%)";
const LOADING_GRADIENT_LEFT =
  "linear-gradient(225.69deg, var(--muted-25) -12.38%, var(--accent) 55.51%)";
const IDLE_GRADIENT =
  "linear-gradient(131.73deg, var(--muted-50) 13.53%, var(--accent) 108.44%)";

const DEFAULT_WIDTH = 80;
const HEIGHT_TO_WIDTH_RATIO = 38 / 80;
const SPARKLE_PADDING = 4;

const EASING: Easing = [0.65, 0, 0.35, 1];
const SPARKLE_ROTATION = 180; // degrees
const ANIMATION_DURATION = 1.5; // seconds
const ANIMATION_DELAY = 0.1; // seconds

export function SpinnerMotionStates({
  status = "loading",
  width = DEFAULT_WIDTH,
}: LoadingSpinnerProps) {
  const height = width * HEIGHT_TO_WIDTH_RATIO;
  const sparkleSize = height - 2 * SPARKLE_PADDING;
  const translateX = width - sparkleSize - 2 * SPARKLE_PADDING;

  return (
    <motion.div
      className="relative flex rounded-full"
      animate={status}
      variants={{
        idle: { width: sparkleSize + SPARKLE_PADDING * 2 },
        loading: { width, height },
      }}
    >
      <motion.div
        className="flex w-full rounded-full"
        animate={status}
        style={{ background: IDLE_GRADIENT, padding: SPARKLE_PADDING }}
        variants={{
          idle: {
            background: IDLE_GRADIENT,
            transition: {
              duration: 0.3,
              ease: "easeInOut",
              layout: { type: "tween", ease: EASING },
            },
          },
          loading: {
            background: [LOADING_GRADIENT_LEFT, LOADING_GRADIENT_RIGHT],
            transition: {
              duration: ANIMATION_DURATION,
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: ANIMATION_DELAY,
              ease: EASING,
            },
          },
        }}
      >
        <motion.div
          variants={{
            idle: { x: 0, transition: { duration: 0.1, type: "tween" } },
            loading: {
              x: translateX,
              transition: {
                duration: ANIMATION_DURATION,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: ANIMATION_DELAY,
                ease: EASING,
              },
            },
          }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            variants={{
              loading: { rotate: SPARKLE_ROTATION },
              idle: {
                rotate: 0,
                transition: {
                  repeat: 0,
                  type: "tween",
                  layout: { type: "tween", ease: EASING },
                },
              },
            }}
            transition={{
              duration: ANIMATION_DURATION,
              repeat: Infinity,
              repeatDelay: ANIMATION_DELAY,
              ease: EASING,
              repeatType: "mirror",
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
    </motion.div>
  );
}
