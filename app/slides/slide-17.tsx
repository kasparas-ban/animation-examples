import { useState } from "react";
import SlideBackground from "@/components/slide-background/slide-background";
import {
  LoadingSpinnerStatus,
  SpinnerMotionStates,
} from "@/components/spinner/motion/spinner-motion-states";
import {
  SpinnerCSSStates1,
  SpinnerCSSStates2,
} from "@/components/spinner/css/states/spinner-css-states";
import { Button } from "@/components/ui/button";

export default function Slide17() {
  const [status, setStatus] = useState<LoadingSpinnerStatus>("loading");

  return (
    <SlideBackground idx={17}>
      <div className="absolute translate-x-[1248px] translate-y-[282px]">
        <SpinnerMotionStates status={status} width={310} />
      </div>
      <div className="absolute translate-x-[1248px] translate-y-[470px]">
        <SpinnerCSSStates1 status={status} width={310} />
      </div>
      <div className="absolute translate-x-[1248px] translate-y-[656px]">
        <SpinnerCSSStates2 status={status} width={310} />
      </div>

      <div className="absolute translate-x-[1348px] translate-y-[842px]">
        <Button
          onClick={() => setStatus(status === "loading" ? "idle" : "loading")}
          className="m-4 scale-150"
        >
          TOGGLE
        </Button>
      </div>
    </SlideBackground>
  );
}
