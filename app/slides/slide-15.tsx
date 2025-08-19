import SlideBackground from "@/components/slide-background/slide-background";
import SpinnerCSS from "@/components/spinner/css/optimised/spinner-css";
import SpinnerMotion from "@/components/spinner/motion/spinner-motion-optimised";
import SpinnerWebAnimations from "@/components/spinner/waapi/spinner-waapi-optimised";

export default function Slide15() {
  return (
    <SlideBackground idx={15}>
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
