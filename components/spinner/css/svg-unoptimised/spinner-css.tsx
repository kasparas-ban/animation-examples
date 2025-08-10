import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./spinner-css.module.css";

const DEFAULT_WIDTH = 80;
const HEIGHT_TO_WIDTH_RATIO = 38 / 80;
const SPARKLE_PADDING = 4;

export default function SpinnerCSS({
  width = DEFAULT_WIDTH,
  showOverlay = false,
}: {
  width?: number;
  showOverlay?: boolean;
}) {
  const height = width * HEIGHT_TO_WIDTH_RATIO;
  const sparkleSize = height - 2 * SPARKLE_PADDING;
  const translateX = width - sparkleSize - 2 * SPARKLE_PADDING;

  return (
    <div
      className={cn(
        "relative rounded-full flex items-center",
        !showOverlay && "overflow-hidden"
      )}
      style={
        {
          width,
          height,
          padding: SPARKLE_PADDING,
          "--sparkle-translate-x": `${translateX}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          styles["loader-bg"],
          "absolute inset-0 rounded-full top-[-50%]"
        )}
        style={{ width, height: width }}
      />
      {/* <Sparkle
        fill="var(--background)"
        className={cn(styles.sparkle, "text-transparent")}
        style={{
          width: sparkleSize,
          height: sparkleSize,
        }}
      /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "lucide lucide-sparkle-icon lucide-sparkle text-transparent",
          styles.sparkle
        )}
        style={{
          width: sparkleSize,
          height: sparkleSize,
        }}
      >
        <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
      </svg>
    </div>
  );
}
