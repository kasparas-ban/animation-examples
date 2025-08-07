"use client";

import SpinnerCSS from "@/components/spinner/css/unoptimised/spinner-css.module";
import ShikiHighlighter from "react-shiki";
import { Slide } from "spectacle";

export default function SlideCSSAnim() {
  return (
    <Slide>
      <section className="relative h-full flex flex-col">
        <div className="absolute inset-0 flex flex-col">
          <p className="font-bold text-center pb-8 text-6xl">CSS Animations</p>

          <div className="flex flex-1 h-0">
            <div className="flex flex-col overflow-y-auto gap-3 basis-2/3">
              <div className="flex flex-col items-start">
                <p className="text-3xl pl-8 pb-3">Sparkle</p>
                <ShikiHighlighter
                  language="css"
                  showLanguage={false}
                  theme="ayu-dark"
                  className="w-full"
                >
                  {sparkleCode.trim()}
                </ShikiHighlighter>
              </div>

              <div className="flex flex-col items-start">
                <p className="text-3xl pl-8 pb-3">Background</p>
                <ShikiHighlighter
                  language="css"
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

const sparkleCode = `
.sparkle {
  animation: sparkle-spin 1.6s infinite;
  animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  animation-direction: alternate;
}

@keyframes sparkle-spin {
  0% {
    transform: translateX(0) rotate(0deg);
  }
  100% {
    transform: translateX(var(--sparkle-translate-x)) rotate(180deg);
  }
}
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
