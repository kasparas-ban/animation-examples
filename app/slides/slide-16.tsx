import SlideBackground from "@/components/slide-background/slide-background";
import SpinnerMotionBackground from "@/components/spinner/motion/spinner-motion-background";

export default function Slide16() {
  return (
    <SlideBackground idx={16}>
      <div className="absolute translate-x-[660px] translate-y-[745px]">
        <SpinnerMotionBackground width={340} />
      </div>
    </SlideBackground>
  );
}
