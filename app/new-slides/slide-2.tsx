"use client";

import SpinnerCSS from "@/components/spinner/css/spinner-css";
import ShikiHighlighter from "react-shiki";
import { Slide } from "spectacle";

export default function Slide2() {
  return (
    <Slide>
      <section className="relative h-full flex flex-col">
        <div className="absolute inset-0 flex flex-col">
          <p className="font-bold text-center pb-4 text-6xl">
            Web Animations API
          </p>

          <div className="flex flex-1 h-0">
            <div className="flex flex-col overflow-y-auto gap-3 basis-2/3">
              <div className="flex flex-col items-start">
                <p className="text-2xl pl-8 pb-2">animate() calls</p>
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
                <p className="text-2xl pl-8 pb-2">Background</p>
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
@property --g-angle {
  syntax: "<angle>";
  initial-value: 225.69deg;
  inherits: false;
}
@property --g-stop1 {
  syntax: "<percentage>";
  initial-value: -12.38%;
  inherits: false;
}
@property --g-stop2 {
  syntax: "<percentage>";
  initial-value: 55.51%;
  inherits: false;
}

.loader {
  background: linear-gradient(
    var(--g-angle),
    var(--muted-25) var(--g-stop1),
    var(--accent) var(--g-stop2)
  );
  animation: gradient-shift 1.6s infinite;
  animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  animation-direction: alternate;
}

@keyframes gradient-shift {
  0% {
    --g-angle: 225.69deg;
    --g-stop1: -12.38%;
    --g-stop2: 55.51%;
  }
  100% {
    --g-angle: 131.05deg;
    --g-stop1: -13.19%;
    --g-stop2: 76.2%;
  }
}
`;
