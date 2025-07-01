"use client";

import { getBrowser, getDevice } from "@/utils/utils";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface PerformanceResult {
  id: string;
  animationType: "css" | "waapi" | "motion";
  spinnerCount: number;
  fps: number;
  memoryUsed: number;
  renderTime: number;
  browser: string;
  device: string;
  timestamp: Date;
  notes?: string;
}

const animationTypes = [
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

export default function PerformanceTracker() {
  const [results, setResults] = useState<PerformanceResult[]>([]);
  const [currentResult, setCurrentResult] = useState<
    Partial<PerformanceResult>
  >({
    browser: getBrowser(),
    device: getDevice(),
  });

  const addResult = () => {
    if (
      !currentResult.animationType ||
      !currentResult.spinnerCount ||
      !currentResult.fps ||
      !currentResult.memoryUsed ||
      !currentResult.renderTime
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newResult: PerformanceResult = {
      ...(currentResult as PerformanceResult),
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setResults((prev) => [...prev, newResult]);

    // Reset form but keep browser/device info
    setCurrentResult({
      browser: currentResult.browser,
      device: currentResult.device,
    });
  };

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `animation-performance-results-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const getAverageByType = (type: "css" | "waapi" | "motion") => {
    const typeResults = results.filter((r) => r.animationType === type);
    if (typeResults.length === 0) return null;

    return {
      avgFps: Math.round(
        typeResults.reduce((sum, r) => sum + r.fps, 0) / typeResults.length
      ),
      avgMemory: Math.round(
        typeResults.reduce((sum, r) => sum + r.memoryUsed, 0) /
          typeResults.length
      ),
      avgRenderTime: Math.round(
        typeResults.reduce((sum, r) => sum + r.renderTime, 0) /
          typeResults.length
      ),
      count: typeResults.length,
    };
  };

  return (
    <div className="border shadow-lg rounded-lg p-6 w-fit">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold">Performance</p>
        <ul className="text-sm">
          <li>
            <p>Browser: {currentResult.browser}</p>
            <p>Device: {currentResult.device}</p>
          </li>
        </ul>
      </div>

      <div className="pt-4">
        <p className="text-sm font-bold pb-3">Animation Type</p>
        <RadioGroup defaultValue={animationTypes[0].value}>
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
        <RadioGroup defaultValue={elementCountOptions[0].toString()}>
          {elementCountOptions.map((count) => (
            <div className="flex items-center gap-3" key={count.toString()}>
              <RadioGroupItem value={count.toString()} id={count.toString()} />
              <Label htmlFor={count.toString()}>{count}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Record Performance Result</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Animation Type *
            </label>
            <select
              value={currentResult.animationType || ""}
              onChange={(e) =>
                setCurrentResult((prev) => ({
                  ...prev,
                  animationType: e.target.value as "css" | "waapi" | "motion",
                }))
              }
              className="w-full p-2 border rounded"
            >
              <option value="">Select type</option>
              <option value="css">CSS</option>
              <option value="waapi">WAAPI</option>
              <option value="motion">Motion</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Spinner Count *
            </label>
            <input
              type="number"
              value={currentResult.spinnerCount || ""}
              onChange={(e) =>
                setCurrentResult((prev) => ({
                  ...prev,
                  spinnerCount: parseInt(e.target.value),
                }))
              }
              className="w-full p-2 border rounded"
              placeholder="e.g., 1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">FPS *</label>
            <input
              type="number"
              value={currentResult.fps || ""}
              onChange={(e) =>
                setCurrentResult((prev) => ({
                  ...prev,
                  fps: parseInt(e.target.value),
                }))
              }
              className="w-full p-2 border rounded"
              placeholder="e.g., 60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Memory Used (MB) *
            </label>
            <input
              type="number"
              value={currentResult.memoryUsed || ""}
              onChange={(e) =>
                setCurrentResult((prev) => ({
                  ...prev,
                  memoryUsed: parseInt(e.target.value),
                }))
              }
              className="w-full p-2 border rounded"
              placeholder="e.g., 45"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Render Time (ms) *
            </label>
            <input
              type="number"
              value={currentResult.renderTime || ""}
              onChange={(e) =>
                setCurrentResult((prev) => ({
                  ...prev,
                  renderTime: parseInt(e.target.value),
                }))
              }
              className="w-full p-2 border rounded"
              placeholder="e.g., 120"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Device</label>
            <input
              type="text"
              value={currentResult.device || ""}
              onChange={(e) =>
                setCurrentResult((prev) => ({
                  ...prev,
                  device: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
              placeholder="e.g., Desktop, iPhone 12"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Browser</label>
          <input
            type="text"
            value={currentResult.browser || ""}
            onChange={(e) =>
              setCurrentResult((prev) => ({ ...prev, browser: e.target.value }))
            }
            className="w-full p-2 border rounded"
            placeholder="e.g., Chrome 118, Firefox 119"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Notes</label>
          <textarea
            value={currentResult.notes || ""}
            onChange={(e) =>
              setCurrentResult((prev) => ({ ...prev, notes: e.target.value }))
            }
            className="w-full p-2 border rounded h-20"
            placeholder="Additional observations, test conditions, etc."
          />
        </div>

        <button
          onClick={addResult}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Result
        </button>
      </div>

      {results.length > 0 && (
        <>
          <div className="border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Performance Summary</h2>
              <button
                onClick={exportResults}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Export Results
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["css", "waapi", "motion"] as const).map((type) => {
                const avg = getAverageByType(type);
                if (!avg) return null;

                return (
                  <div key={type} className="bg-gray-50 p-4 rounded">
                    <h3 className="font-bold text-lg mb-2">
                      {type.toUpperCase()}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div>
                        Avg FPS: <span className="font-mono">{avg.avgFps}</span>
                      </div>
                      <div>
                        Avg Memory:{" "}
                        <span className="font-mono">{avg.avgMemory}MB</span>
                      </div>
                      <div>
                        Avg Render:{" "}
                        <span className="font-mono">{avg.avgRenderTime}ms</span>
                      </div>
                      <div className="text-gray-600">
                        {avg.count} test{avg.count > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">All Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Count</th>
                    <th className="text-left p-2">FPS</th>
                    <th className="text-left p-2">Memory</th>
                    <th className="text-left p-2">Render</th>
                    <th className="text-left p-2">Browser</th>
                    <th className="text-left p-2">Device</th>
                    <th className="text-left p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.id} className="border-b">
                      <td className="p-2 font-medium">
                        {result.animationType.toUpperCase()}
                      </td>
                      <td className="p-2">{result.spinnerCount}</td>
                      <td
                        className={`p-2 font-mono ${
                          result.fps < 30
                            ? "text-red-500"
                            : result.fps < 60
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {result.fps}
                      </td>
                      <td className="p-2 font-mono">{result.memoryUsed}MB</td>
                      <td className="p-2 font-mono">{result.renderTime}ms</td>
                      <td className="p-2">{result.browser}</td>
                      <td className="p-2">{result.device}</td>
                      <td className="p-2">
                        {result.timestamp.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
