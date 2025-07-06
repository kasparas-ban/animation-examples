import SpinnerCSS from "@/components/spinner/css/spinner-css";
import SpinnerMotion from "@/components/spinner/motion/spinner-motion";
import SpinnerWebAnimations from "@/components/spinner/waapi/spinner-waapi";

export default function Slide3() {
  return (
    <section className="h-full !flex flex-col">
      <p className="font-bold text-center mb-4 text-6xl">CSS Animations</p>

      <div className="flex flex-col pt-12">
        <SpinnerCSS width={140} />
        <SpinnerWebAnimations width={140} />
        <SpinnerMotion />
      </div>
    </section>
  );
}
