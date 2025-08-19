import SlideBackground from "@/components/slide-background/slide-background";
import SpinnerCSS from "@/components/spinner/css/unoptimised/spinner-css";
import SpinnerMotionUnoptimised from "@/components/spinner/motion/spinner-motion-unoptimised";
import SpinnerWebAnimationsUnoptimised from "@/components/spinner/waapi/spinner-waapi-unoptimised";

export default function Slide5() {
  return (
    <SlideBackground idx={5}>
      <div className="absolute translate-x-[150px] translate-y-[435px]">
        <SpinnerCSS width={340} />
      </div>

      <div className="absolute translate-x-[650px] translate-y-[435px]">
        <SpinnerWebAnimationsUnoptimised width={340} />
      </div>

      <div className="absolute translate-x-[1150px] translate-y-[435px]">
        <SpinnerMotionUnoptimised width={340} />
      </div>
    </SlideBackground>
  );
}
