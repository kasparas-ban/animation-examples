import SlideBackground from "@/components/slide-background/slide-background";
import SpinnerLottieCanvas from "@/components/spinner/lottie/spinner-lottie-canvas";
import SpinnerLottieSVG from "@/components/spinner/lottie/spinner-lottie-svg";

export default function Slide12() {
  return (
    <SlideBackground idx={12}>
      <div className="absolute translate-x-[1110px] translate-y-[330px]">
        <SpinnerLottieSVG width={400} />
      </div>

      <div className="absolute translate-x-[1110px] translate-y-[640px]">
        <SpinnerLottieCanvas width={400} />
      </div>
    </SlideBackground>
  );
}
