import SlideBackground from "@/components/slide-background/slide-background";
import SpinnerMotionLayout from "@/components/spinner/motion/spinner-motion-layout";

export default function Slide19() {
  return (
    <SlideBackground idx={19}>
      <div className="absolute translate-x-[270px] translate-y-[690px] w-[710px]">
        <SpinnerMotionLayout width={340} />
      </div>
    </SlideBackground>
  );
}
