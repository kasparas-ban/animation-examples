import Lottie from "lottie-react";
import spinnerAnim from "./sparkle_lottie.json";

const DEFAULT_WIDTH = 80;

export default function SpinnerLottie({
  width = DEFAULT_WIDTH,
}: {
  width?: number;
}) {
  return <Lottie animationData={spinnerAnim} style={{ width }} />;
}
