import { SpinnerToInput } from "@/components/spinner-to-input/spinner-to-input";
import SpinnerCSS from "@/components/spinner/css/optimised/spinner-css";
import SpinnerRive from "@/components/spinner/rive/spinner-rive";

export default function Test() {
  return (
    <div className="relative p-10">
      <div className="w-[640px]">
        <SpinnerToInput />
        <SpinnerCSS />
        <SpinnerRive />
      </div>
    </div>
  );
}
