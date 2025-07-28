import { useRive } from "@rive-app/react-canvas-lite";

export default function SpinnerRive() {
  const { RiveComponent } = useRive({
    src: "spinner.riv",
    autoplay: true,
  });

  return (
    <div className="w-[80px] h-[38px]">
      <RiveComponent />
    </div>
  );
}
