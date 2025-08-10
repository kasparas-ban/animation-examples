"use client";

import dynamic from "next/dynamic";
import spinnerAnim from "./sparkle_lottie.json";

const DEFAULT_WIDTH = 80;

// Dynamically import the Player component with SSR disabled
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => (
      <div style={{ width: DEFAULT_WIDTH, height: DEFAULT_WIDTH }} />
    ),
  }
);

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
