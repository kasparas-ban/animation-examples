import SlideBackground from "@/components/slide-background/slide-background";
import SpinnerCSS from "@/components/spinner/css/optimised/spinner-css";
import SpinnerMotion from "@/components/spinner/motion/spinner-motion";
import SpinnerWebAnimations from "@/components/spinner/waapi/spinner-waapi";

export default function Slide10() {
  return (
    <SlideBackground idx={10}>
      <div className="absolute translate-x-[150px] translate-y-[435px]">
        <SpinnerCSS width={340} />
      </div>

      <div className="absolute translate-x-[650px] translate-y-[435px]">
        <SpinnerWebAnimations width={340} />
      </div>

      <div className="absolute translate-x-[1150px] translate-y-[435px]">
        <SpinnerMotion width={340} />
      </div>
    </SlideBackground>
  );
}
