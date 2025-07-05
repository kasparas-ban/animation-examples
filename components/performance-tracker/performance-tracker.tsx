"use client";

import { getBrowser, getDevice } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type Settings = {
  elementCount: number;
  animationType: "css" | "waapi" | "motion";
};

const animationTypes: { value: Settings["animationType"]; label: string }[] = [
  {
    value: "css",
    label: "CSS",
  },
  {
    value: "waapi",
    label: "WAAPI",
  },
  {
    value: "motion",
    label: "Motion",
  },
];

const elementCountOptions = [100, 500, 1000, 2000, 4000, 8000];

const isRunning = false;

export default function PerformanceTracker() {
  const [deviceParams] = useState({
    browser: getBrowser(),
    device: getDevice(),
  });

  const [settings, setSettings] = useState<Settings>({
    elementCount: elementCountOptions[0],
    animationType: animationTypes[0].value,
  });

  const avgFPSRef = useRef<HTMLParagraphElement>(null);

  const interval = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isRunning) return;

    const fpsMeter = () => {
      let prevTime = Date.now(),
        frames = 0;

      interval.current = requestAnimationFrame(function loop() {
        const time = Date.now();
        frames++;
        if (time > prevTime + 1000) {
          let fps = Math.round((frames * 1000) / (time - prevTime));
          prevTime = time;
          frames = 0;

          // Update FPS label
          avgFPSRef.current!.textContent = fps.toString();
        }

        interval.current = requestAnimationFrame(loop);
      });
    };

    fpsMeter();

    return () => clearInterval(interval.current);
  }, []);

  return (
    <div className="border shadow-lg rounded-lg p-6 w-fit bg-white/90">
      <ul className="text-sm">
        <li>
          <p>Browser: {deviceParams.browser}</p>
          <p>Device: {deviceParams.device}</p>
        </li>
      </ul>

      <div className="pt-4">
        <p className="text-sm font-bold pb-3">Animation Type</p>
        <RadioGroup
          value={settings.animationType}
          onValueChange={(value) =>
            setSettings((prev) => ({
              ...prev,
              animationType: value as Settings["animationType"],
            }))
          }
        >
          {animationTypes.map((type) => (
            <div className="flex items-center gap-3" key={type.value}>
              <RadioGroupItem value={type.value} id={type.value} />
              <Label htmlFor={type.value}>{type.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="pt-4">
        <p className="text-sm font-bold pb-3">Element Count</p>
        <RadioGroup
          value={settings.elementCount.toString()}
          onValueChange={(value) =>
            setSettings((prev) => ({
              ...prev,
              elementCount: parseInt(value, 10),
            }))
          }
        >
          {elementCountOptions.map((count) => (
            <div className="flex items-center gap-3" key={count.toString()}>
              <RadioGroupItem value={count.toString()} id={count.toString()} />
              <Label htmlFor={count.toString()}>{count}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="pt-4">
        <p className="text-sm font-bold pb-2">Memory used (MB)</p>
        <p className="font-extrabold">20 MB</p>
      </div>

      <div className="pt-4">
        <p className="text-sm font-bold pb-2">Render Time (ms)</p>
        <p className="font-extrabold">200</p>
      </div>

      <div className="pt-4">
        <p className="text-sm font-bold pb-2">Average FPS</p>
        <p ref={avgFPSRef} className="font-extrabold">
          60
        </p>
      </div>
    </div>
  );
}
