import { Player } from "@lottiefiles/react-lottie-player";
import spinnerAnim from "./sparkle_lottie.json";

const DEFAULT_WIDTH = 80;

export default function SpinnerLottieCanvas({
  width = DEFAULT_WIDTH,
}: {
  width?: number;
}) {
  return (
    <Player
      autoplay
      loop
      src={spinnerAnim}
      style={{ width }}
      renderer="canvas"
    />
  );
}
