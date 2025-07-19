import { ReactNode } from "react";
import Image from "next/image";

const RELATIVE_WIDTH = 1728;
const RELATIVE_HEIGHT = 1080;

export default function SlideBackground({
  idx,
  children,
}: {
  idx: number;
  children?: ReactNode;
}) {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div
        className="absolute overflow-hidden"
        style={{
          width: RELATIVE_WIDTH,
          height: RELATIVE_HEIGHT,
        }}
      >
        <Image
          src={`/slides/slide-${idx}.svg`}
          alt={`Slide ${idx}`}
          className="w-full h-full object-contain"
          width={RELATIVE_WIDTH}
          height={RELATIVE_HEIGHT}
          priority
        />
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  );
}
