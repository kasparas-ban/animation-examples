"use client";

import { useState, useEffect, useRef } from "react";
import SpinnerCSS from "@/components/spinner/css/spinner-css";
import SpinnerMotion from "@/components/spinner/motion/spinner-motion";
import SpinnerWAAPI from "@/components/spinner/waapi/spinner-waapi";
import PerformanceTracker from "@/components/performance-tracker";

type AnimationType = "css" | "waapi" | "motion";

interface PerformanceMetrics {
  fps: number;
  memoryUsed: number;
  renderTime: number;
}

export default function Page() {
  const [animationType, setAnimationType] = useState<AnimationType>("motion");
  const [spinnerCount, setSpinnerCount] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);
  const [enableMonitoring, setEnableMonitoring] = useState(true);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsed: 0,
    renderTime: 0,
  });

  const frameRef = useRef<number>(0);

  // Lightweight FPS Counter - only updates UI every 30 frames to reduce overhead
  useEffect(() => {
    if (!isRunning || !enableMonitoring) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let lastUIUpdate = performance.now();

    const measureFPS = () => {
      const now = performance.now();
      frameCount++;

      // Only calculate and update metrics every 30 frames to reduce overhead
      if (frameCount >= 30) {
        const elapsed = now - lastTime;
        const fps = Math.round((frameCount * 1000) / elapsed);

        // Only update UI every 500ms to reduce React overhead
        if (now - lastUIUpdate > 500) {
          const memoryUsed = (
            performance as unknown as { memory?: { usedJSHeapSize: number } }
          ).memory
            ? Math.round(
                (
                  performance as unknown as {
                    memory: { usedJSHeapSize: number };
                  }
                ).memory.usedJSHeapSize /
                  1024 /
                  1024
              )
            : 0;

          setMetrics((prev) => ({
            ...prev,
            fps,
            memoryUsed,
          }));

          lastUIUpdate = now;
        }

        frameCount = 0;
        lastTime = now;
      }

      frameRef.current = requestAnimationFrame(measureFPS);
    };

    frameRef.current = requestAnimationFrame(measureFPS);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isRunning, enableMonitoring]);

  // Measure render time
  useEffect(() => {
    if (!enableMonitoring) return;

    const startTime = performance.now();

    const measureRenderTime = () => {
      const endTime = performance.now();
      setMetrics((prev) => ({
        ...prev,
        renderTime: Math.round(endTime - startTime),
      }));
    };

    const timeoutId = setTimeout(measureRenderTime, 100);
    return () => clearTimeout(timeoutId);
  }, [animationType, spinnerCount, enableMonitoring]);

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

  return <PerformanceTracker />;

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Control Panel */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">
            Animation Performance Benchmark
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Animation Type Selector */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Animation Type
              </label>
              <div className="flex gap-2">
                {(["css", "waapi", "motion"] as AnimationType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setAnimationType(type)}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      animationType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Spinner Count Controls */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Spinner Count: {spinnerCount}
              </label>
              <div className="flex gap-1 flex-wrap">
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

            {/* Performance Metrics */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Performance Metrics
              </label>
              {enableMonitoring ? (
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>FPS:</span>
                    <span
                      className={`font-mono ${
                        metrics.fps < 30
                          ? "text-red-500"
                          : metrics.fps < 60
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {metrics.fps}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory:</span>
                    <span className="font-mono">{metrics.memoryUsed}MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Render Time:</span>
                    <span className="font-mono">{metrics.renderTime}ms</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  Monitoring disabled for best performance
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                isRunning
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {isRunning ? "Pause Monitoring" : "Start Monitoring"}
            </button>

            <button
              onClick={() => setEnableMonitoring(!enableMonitoring)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                enableMonitoring
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
            >
              {enableMonitoring ? "Disable Monitoring" : "Enable Monitoring"}
            </button>

            <div className="text-sm text-muted-foreground">
              {enableMonitoring
                ? "Monitoring adds ~5-10% overhead. Disable for pure performance testing."
                : "Use browser DevTools Performance tab for detailed analysis"}
            </div>
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
