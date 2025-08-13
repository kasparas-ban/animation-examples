import SpinnerCSSUnoptimised from "@/components/spinner/css/svg-unoptimised/spinner-css";
import SpinnerCSS from "@/components/spinner/css/optimised/spinner-css";
import SpinnerGSAP from "@/components/spinner/gsap/spinner-gsap";
import AnimationInterruptionCSS from "@/components/animation-interruption/animation-interruption-css";
import SpinnerMotionLayout from "@/components/spinner/motion/spinner-motion-layout";

export default function Test() {
  return (
    <div>
      {/* <SpinnerCSS width={150} /> */}
      {/* <SpinnerCSSUnoptimised width={150} /> */}
      <SpinnerGSAP />
      <SpinnerMotionLayout />
      <AnimationInterruptionCSS />
    </div>
  );
}
