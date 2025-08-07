import { useState } from "react";
import SpinnerRive from "@/components/spinner/rive/spinner-rive";
import { Wheel } from "@uiw/react-color";

const DEFAULT_COLOR = "116DFF";

export default function SlideRive() {
  const [color, setColor] = useState(DEFAULT_COLOR);

  return (
    <div>
      <SpinnerRive width={80} color={color} />
      <Wheel color={color} onChange={(color) => setColor(color.hex.slice(1))} />
    </div>
  );
}
