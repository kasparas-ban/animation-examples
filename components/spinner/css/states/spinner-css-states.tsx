"use client";

import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./spinner-css-states.module.css";
import { LoadingSpinnerStatus } from "../../motion/spinner-motion-states";
import { useEffect, useRef } from "react";

const DEFAULT_WIDTH = 80;
const HEIGHT_TO_WIDTH_RATIO = 38 / 80;
const SPARKLE_PADDING = 4;

export function SpinnerCSSStates1({
  status = "loading",
  width = DEFAULT_WIDTH,
}: {
  status?: LoadingSpinnerStatus;
  width?: number;
}) {
  const height = width * HEIGHT_TO_WIDTH_RATIO;
  const sparkleSize = height - 2 * SPARKLE_PADDING;
  const translateX = width - sparkleSize - 2 * SPARKLE_PADDING;

  return (
    <div
      className="relative rounded-full flex items-center overflow-hidden"
      style={
        {
          width: status === "idle" ? sparkleSize + SPARKLE_PADDING * 2 : width,
          height,
          padding: SPARKLE_PADDING,
          "--sparkle-translate-x": `${translateX}px`,
          transition: "width 0.5s cubic-bezier(0.65, 0, 0.35, 1)",
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          styles["loader-bg"],
          status === "idle" && styles["loader-bg-idle"],
          "absolute inset-0 rounded-full top-[-50%]"
        )}
        style={{
          width: status === "idle" ? sparkleSize + SPARKLE_PADDING * 2 : width,
          height: width,
          transition: "width 0.5s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />
      <div
        className={cn(
          styles.sparkle,
          status === "idle" && styles["sparkle-idle"]
        )}
      >
        <Sparkle
          fill="var(--background)"
          className="text-transparent"
          style={{
            width: sparkleSize,
            height: sparkleSize,
          }}
        />
      </div>
    </div>
  );
}

export function SpinnerCSSStates2({
  status = "loading",
  width = DEFAULT_WIDTH,
}: {
  status?: LoadingSpinnerStatus;
  width?: number;
}) {
  const height = width * HEIGHT_TO_WIDTH_RATIO;
  const sparkleSize = height - 2 * SPARKLE_PADDING;
  const translateX = width - sparkleSize - 2 * SPARKLE_PADDING;
  const sparkleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sparkleElement = sparkleRef.current;
    if (!sparkleElement) return;

    if (status === "idle") {
      // Capture current animated transform value
      const computedTransform = getComputedStyle(sparkleElement).transform;

      // Stop the CSS animation and freeze at the captured transform
      sparkleElement.style.animation = "none";
      sparkleElement.style.transform =
        computedTransform && computedTransform !== "none"
          ? computedTransform
          : "";

      // Force layout so the browser acknowledges the frozen transform
      // before we transition to the idle transform
      void sparkleElement.getBoundingClientRect();

      // Now transition to the idle transform smoothly
      sparkleElement.style.transition =
        "transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)";
      sparkleElement.style.transform = "translateX(0) rotate(0deg)";
    } else {
      // Resume CSS animation for loading state
      sparkleElement.style.transition = "";
      sparkleElement.style.transform = "";
      sparkleElement.style.animation = "";
    }
  }, [status]);

  return (
    <div
      className="relative rounded-full flex items-center overflow-hidden"
      style={
        {
          width: status === "idle" ? sparkleSize + SPARKLE_PADDING * 2 : width,
          height,
          padding: SPARKLE_PADDING,
          "--sparkle-translate-x": `${translateX}px`,
          transition: "width 0.5s cubic-bezier(0.65, 0, 0.35, 1)",
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          styles["loader-bg"],
          status === "idle" && styles["loader-bg-idle"],
          "absolute inset-0 rounded-full top-[-50%]"
        )}
        style={{
          width: status === "idle" ? sparkleSize + SPARKLE_PADDING * 2 : width,
          height: width,
          transition: "width 0.5s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />
      <div ref={sparkleRef} className={cn(styles.sparkle)}>
        <Sparkle
          fill="var(--background)"
          className="text-transparent"
          style={{
            width: sparkleSize,
            height: sparkleSize,
          }}
        />
      </div>
    </div>
  );
}
