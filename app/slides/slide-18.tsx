"use client";

import SlideBackground from "@/components/slide-background/slide-background";
import { SpinnerToInput } from "@/components/spinner-to-input/spinner-to-input";
import { useEffect, useState } from "react";

export default function Slide18() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <SlideBackground idx={18}>
      <div className="absolute translate-x-[500px] translate-y-[782px] w-[710px]">
        <SpinnerToInput key={key} />
      </div>
    </SlideBackground>
  );
}
