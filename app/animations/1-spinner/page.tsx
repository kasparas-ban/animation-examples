import SpinnerCSS from "@/components/spinner/css/unoptimised/spinner-css";
import SpinnerMotion from "@/components/spinner/motion/spinner-motion";
import SpinnerWebAnimations from "@/components/spinner/waapi/spinner-waapi";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <SpinnerWebAnimations />
      <SpinnerCSS />
      <SpinnerMotion />
    </div>
  );
}
