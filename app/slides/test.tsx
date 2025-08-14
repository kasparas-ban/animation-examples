import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SpinnerCSSStates1 } from "@/components/spinner/css/states/spinner-css-states";
import {
  SpinnerMotionStates,
  LoadingSpinnerStatus,
} from "@/components/spinner/motion/spinner-motion-states";

export default function Test() {
  const [status, setStatus] = useState<LoadingSpinnerStatus>("loading");

  return (
    <div>
      <SpinnerMotionStates status={status} />
      <SpinnerCSSStates1 status={status} />
      <Button
        onClick={() => setStatus(status === "loading" ? "idle" : "loading")}
        className="m-4"
      >
        CHANGE
      </Button>
    </div>
  );
}
