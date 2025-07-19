import SlideBackground from "@/components/slide-background/slide-background";
import SpinnerCSS from "@/components/spinner/css/spinner-css";

export default function Slide2() {
  return (
    <SlideBackground idx={8}>
      <div className="translate-x-[615px] translate-y-[635px]">
        <SpinnerCSS width={240} />
      </div>
    </SlideBackground>
  );
}
