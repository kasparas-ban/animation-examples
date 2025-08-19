"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import useTextTokens from "./useTextTokens";

const DEFAULT_TEXT =
  "Provide your first name to get started with the registration process. Let's get started! Could you please tell me your first name?";

export default function TextTransition() {
  const [state, setState] = useState<"first" | "second">("first");
  const { tokens } = useTextTokens({ text: DEFAULT_TEXT });

  return (
    <div className="flex flex-col h-screen py-10 px-4 items-center">
      <div className="relative max-w-[720px] h-full">
        <AnimatePresence>
          {state === "second" && (
            <p className="flex gap-[.25em] flex-wrap text-lg">{tokens}</p>
          )}

          {state === "first" && (
            <div className="relative items-center justify-center top-1/2 -translate-y-1/2 flex flex-col gap-10">
              <p className="flex gap-[.25em] flex-wrap text-4xl justify-center font-bold">
                {tokens}
              </p>

              <button
                className="px-4 py-2 bg-gray-300 rounded-md font-bold text-gray-700"
                onClick={() => setState("second")}
              >
                Animate
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
