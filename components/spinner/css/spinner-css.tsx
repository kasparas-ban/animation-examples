import { Sparkle } from "lucide-react";
import "./spinner.css";

export default function SpinnerCSS() {
  return (
    <div className="loader rounded-full h-[38px] w-[80px] flex items-center p-1">
      <div className="sparkle">
        <Sparkle
          fill="var(--background)"
          className="text-transparent size-7.5"
        />
      </div>
    </div>
  );
}
