import { Sparkle } from "lucide-react";
import "./spinner.css";

// const LOADING_GRADIENT_RIGHT =
//   "linear-gradient(131.05deg, var(--muted-25) -13.19%, var(--accent) 76.2%)";
// const LOADING_GRADIENT_LEFT =
//   "linear-gradient(225.69deg, var(--muted-25) -12.38%, var(--accent) 55.51%)";
// const IDLE_GRADIENT =
//   "linear-gradient(131.73deg, var(--muted-50) 13.53%, var(--accent) 108.44%)";

export default function SpinnerCSS() {
  return (
    <div className="loader rounded-full h-[38px] w-[80px] bg-blue-400 flex items-center p-1">
      <Sparkle
        fill="var(--background)"
        className="sparkle text-transparent size-7.5"
      />
    </div>
  );
}
