import { useRive } from "@rive-app/react-canvas-lite";

const DEFAULT_WIDTH = 80;
const HEIGHT_TO_WIDTH_RATIO = 38 / 80;

export default function SpinnerRive({
  width = DEFAULT_WIDTH,
}: {
  width?: number;
}) {
  const height = width * HEIGHT_TO_WIDTH_RATIO;
  const { RiveComponent } = useRive({
    src: "spinner.riv",
    autoplay: true,
  });

  return (
    <div className={`w-[${width}px] h-[${height}px]`}>
      <RiveComponent />
    </div>
  );
}
