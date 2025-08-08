import { useState } from "react";
import SlideBackground from "@/components/slide-background/slide-background";
import SpinnerRive from "@/components/spinner/rive/spinner-rive";
import { Wheel } from "@uiw/react-color";

const DEFAULT_COLOR = "116DFF";

export default function Slide13() {
  const [color, setColor] = useState(DEFAULT_COLOR);

  return (
    <SlideBackground idx={13}>
      <div className="absolute translate-x-[1010px] translate-y-[330px]">
        <SpinnerRive width={490} color={color} />
      </div>
      <div className="absolute translate-x-[1150px] translate-y-[640px]">
        <Wheel
          color={color}
          onChange={(color) => setColor(color.hex.slice(1))}
        />
      </div>
    </SlideBackground>
  );
}
