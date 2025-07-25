import { Sparkle } from "lucide-react";
import "./spinner.css";

const DEFAULT_WIDTH = 80;
const HEIGHT_TO_WIDTH_RATIO = 38 / 80;
const SPARKLE_PADDING = 4;

export default function SpinnerCSS({
  width = DEFAULT_WIDTH,
}: {
  width?: number;
}) {
  const height = width * HEIGHT_TO_WIDTH_RATIO;
  const sparkleSize = height - 2 * SPARKLE_PADDING;
  const translateX = width - sparkleSize - 2 * SPARKLE_PADDING;

  return (
    <div
      className="loader relative rounded-full flex items-center"
      style={
        {
          width,
          height,
          padding: SPARKLE_PADDING,
          "--sparkle-translate-x": `${translateX}px`,
        } as React.CSSProperties
      }
    >
      <div className="sparkle">
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
