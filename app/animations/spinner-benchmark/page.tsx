"use client";

import { useState } from "react";
import SpinnerCSSUnoptimised from "@/components/spinner/css/unoptimised/spinner-css";
import SpinnerCSSOptimised from "@/components/spinner/css/optimised/spinner-css";
import SpinnerMotion from "@/components/spinner/motion/spinner-motion-optimised";
import SpinnerWAAPI from "@/components/spinner/waapi/spinner-waapi-optimised";
import { getBrowser, getDevice } from "@/utils/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type AnimationType = "css-unoptimised" | "css-optimised" | "waapi" | "motion";

type Settings = {
  elementCount: number;
  animationType: "css-unoptimised" | "css-optimised" | "waapi" | "motion";
};

const animationTypes: { value: Settings["animationType"]; label: string }[] = [
  {
    value: "css-unoptimised",
    label: "CSS (Unoptimised)",
  },
  {
    value: "css-optimised",
    label: "CSS (Optimised)",
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

export default function Page() {
  const [deviceParams] = useState({
    browser: getBrowser(),
    device: getDevice(),
  });

  const [settings, setSettings] = useState<Settings>({
    elementCount: elementCountOptions[0],
    animationType: animationTypes[0].value,
  });

  const getSpinnerComponent = (animationType: AnimationType, key: number) => {
    switch (animationType) {
      case "css-unoptimised":
        return <SpinnerCSSUnoptimised key={key} />;
      case "css-optimised":
        return <SpinnerCSSOptimised key={key} />;
      case "waapi":
        return <SpinnerWAAPI key={key} />;
      case "motion":
        return <SpinnerMotion key={key} />;
    }
  };

  const spinners = Array.from({ length: settings.elementCount }, (_, i) =>
    getSpinnerComponent(settings.animationType, i)
  );

  return (
    <div>
      <div className="border shadow-lg rounded-lg p-6 w-fit bg-white/90 absolute top-4 right-4 z-10">
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
                <RadioGroupItem
                  value={count.toString()}
                  id={count.toString()}
                />
                <Label htmlFor={count.toString()}>{count}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Spinner Grid */}
      <div className="p-4">
        <div
          key={`${settings.animationType}_${settings.elementCount}`}
          className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-2 place-items-center"
        >
          {spinners}
        </div>
      </div>
    </div>
  );
}
