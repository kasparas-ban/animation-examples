"use client";

import { useState } from "react";
import SpinnerCSS from "@/components/spinner/css/spinner-css";
import SpinnerMotion from "@/components/spinner/motion/spinner-motion";
import SpinnerWAAPI from "@/components/spinner/waapi/spinner-waapi";

type AnimationType = "css" | "waapi" | "motion";

export default function CleanPerformanceTest() {
  const [animationType, setAnimationType] = useState<AnimationType>("css");
  const [spinnerCount, setSpinnerCount] = useState(1000);

  const getSpinnerComponent = (key: number) => {
    switch (animationType) {
      case "css":
        return <SpinnerCSS key={key} />;
      case "waapi":
        return <SpinnerWAAPI key={key} />;
      case "motion":
        return <SpinnerMotion key={key} />;
    }
  };

  const spinners = Array.from({ length: spinnerCount }, (_, i) =>
    getSpinnerComponent(i)
  );

  const presetCounts = [100, 500, 1000, 2000, 4000, 8000];

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Minimal Control Panel */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b p-2">
        <div className="max-w-7xl mx-auto flex items-center gap-4 text-sm">
          <div className="font-semibold">Clean Performance Test</div>

          {/* Animation Type Selector */}
          <div className="flex gap-1">
            {(["css", "waapi", "motion"] as AnimationType[]).map((type) => (
              <button
                key={type}
                onClick={() => setAnimationType(type)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  animationType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Spinner Count Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs">Count:</span>
            <div className="flex gap-1">
              {presetCounts.map((count) => (
                <button
                  key={count}
                  onClick={() => setSpinnerCount(count)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    spinnerCount === count
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-muted-foreground ml-auto">
            Zero monitoring overhead • Use DevTools for profiling
          </div>
        </div>
      </div>

      {/* Spinner Grid */}
      <div className="p-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-2 place-items-center">
          {spinners}
        </div>
      </div>
    </div>
  );
}
