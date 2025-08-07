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
        styles.loader,
        "relative rounded-full flex items-center overflow-hidden",
        showOverlay && "overflow-hidden"
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
      <div className={cn(styles.sparkle)}>
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
