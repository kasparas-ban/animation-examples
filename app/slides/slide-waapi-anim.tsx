"use client";

import SpinnerCSS from "@/components/spinner/css/unoptimised/spinner-css";
import ShikiHighlighter from "react-shiki";
import { Slide } from "spectacle";

export default function SlideWAAPIAnim() {
  return (
    <Slide>
      <section className="relative h-full flex flex-col">
        <div className="absolute inset-0 flex flex-col">
          <p className="font-bold text-center pb-8 text-6xl">
            Web Animations API
          </p>

          <div className="flex flex-1 h-0">
            <div className="flex flex-col overflow-y-auto gap-6 basis-2/3">
              <div className="flex flex-col items-start">
                <p className="text-3xl pl-8 pb-3">Sparkle</p>
                <ShikiHighlighter
                  language="tsx"
                  showLanguage={false}
                  theme="ayu-dark"
                  className="w-full"
                >
                  {animateCode.trim()}
                </ShikiHighlighter>
              </div>

              <div className="flex flex-col items-start">
                <p className="text-3xl pl-8 pb-3">Background</p>
                <ShikiHighlighter
                  language="tsx"
                  showLanguage={false}
                  theme="ayu-dark"
                  className="w-full"
                >
                  {backgroundCode.trim()}
                </ShikiHighlighter>
              </div>
            </div>

            <div className="flex items-center justify-center basis-1/3">
              <SpinnerCSS width={260} />
            </div>
          </div>
        </div>
      </section>
    </Slide>
  );
}

const animateCode = `
const getSparkleKeyframes = (transformX: number): Keyframe[] => [
  {
    transform: "translateX(0px) rotate(0deg)",
    easing: EASING,
  },
  {
    transform: \`translateX(\${transformX}px) rotate(180deg)\`,
    easing: EASING,
  },
];

const animationOptions: KeyframeAnimationOptions = {
  duration: 1600, // 1.6s
  iterations: Infinity,
  direction: "alternate",
};

const sparkleAnimation = sparkle.animate(
  getSparkleKeyframes(translateX),
  animationOptions
);
`;

const backgroundCode = `
const LEFT_GRADIENT_ANGLES = {
  "--g-angle": "131.05deg",
  "--g-stop1": "-13.19%",
  "--g-stop2": "76.2%",
};

const RIGHT_GRADIENT_ANGLES = {
  "--g-angle": "225.69deg",
  "--g-stop1": "-12.38%",
  "--g-stop2": "55.51%",
};

const gradientKeyframes: Keyframe[] = [
  {
    ...RIGHT_GRADIENT_ANGLES,
    easing: EASING,
  },
  {
    ...LEFT_GRADIENT_ANGLES,
    easing: EASING,
  },
];

const gradientAnimation = container.animate(
  gradientKeyframes,
  animationOptions
);
`;
