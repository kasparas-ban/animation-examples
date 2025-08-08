import SlideBackground from "@/components/slide-background/slide-background";
import SpinnerCSS from "@/components/spinner/css/optimised/spinner-css";
import SpinnerCSSUnoptimised from "@/components/spinner/css/unoptimised/spinner-css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const SPINNERS = {
  "v-1": <SpinnerCSSUnoptimised width={540} />,
  "v-2": <SpinnerCSS width={540} showOverlay={true} />,
  "v-3": <SpinnerCSS width={540} />,
};

export default function Slide10() {
  const [spinner, setSpinner] = useState<keyof typeof SPINNERS>("v-1");

  const Spinner = SPINNERS[spinner];

  return (
    <SlideBackground idx={10}>
      <div className="absolute translate-x-[850px] translate-y-[380px]">
        <div className="flex flex-col items-center gap-4">
          <Select
            onValueChange={(value) =>
              setSpinner(value as keyof typeof SPINNERS)
            }
            defaultValue={spinner}
          >
            <SelectTrigger className="w-[240px] z-100 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v-1">CSS (unoptimised)</SelectItem>
              <SelectItem value="v-2">CSS (optimised) - v1</SelectItem>
              <SelectItem value="v-3">CSS (optimised) - v2</SelectItem>
            </SelectContent>
          </Select>

          {Spinner}
        </div>
      </div>
    </SlideBackground>
  );
}
