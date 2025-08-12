import SpinnerCSSUnoptimised from "@/components/spinner/css/svg-unoptimised/spinner-css";
import SpinnerCSS from "@/components/spinner/css/optimised/spinner-css";
import SpinnerGSAP from "@/components/spinner/gsap/spinner-gsap";

export default function Test() {
  return (
    <div className="">
      {/* <SpinnerCSS width={150} /> */}
      {/* <SpinnerCSSUnoptimised width={150} /> */}
      <SpinnerGSAP />
    </div>
  );
}
