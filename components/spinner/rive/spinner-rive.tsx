import {
  useRive,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceColor,
} from "@rive-app/react-canvas-lite";
import { useEffect } from "react";

const DEFAULT_WIDTH = 80;
const HEIGHT_TO_WIDTH_RATIO = 38 / 80;

export default function SpinnerRive({
  width = DEFAULT_WIDTH,
  color,
}: {
  width?: number;
  color?: string;
}) {
  const height = width * HEIGHT_TO_WIDTH_RATIO;
  const { RiveComponent, rive } = useRive({
    src: "spinner-data-binding.riv",
    autoplay: true,
    autoBind: false,
  });

  const viewModel = useViewModel(rive, { name: "View Model 1" });
  const accentBound = useViewModelInstance(viewModel, { rive });
  const { setRgb } = useViewModelInstanceColor("accent", accentBound);

  useEffect(() => {
    if (!color) return;
    setRgb(
      parseInt(color.slice(0, 2), 16),
      parseInt(color.slice(2, 4), 16),
      parseInt(color.slice(4, 6), 16)
    );
  }, [color]);

  return (
    <div className={`w-[${width}px] h-[${height}px]`}>
      <RiveComponent style={{ width, height }} />
    </div>
  );
}
