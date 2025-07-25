import { useState, useEffect } from "react";
import { AudioLines, Mic, Sparkle } from "lucide-react";
import { useAnimate, motion, delay } from "motion/react";
import { sleep } from "@/utils/utils";
import { UserInput } from "./user-input";

const SPINNER_GRADIENT_RIGHT =
  "linear-gradient(131.05deg, var(--muted-10) -13.19%, var(--accent) 76.2%)";

export function SpinnerToInput() {
  const [isAnimFinished, setIsAnimFinished] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isAnimFinished) return;

    (async () => {
      // Reveal the spinner
      await animate(
        "[data-spinner-container]",
        {
          opacity: 1,
          scale: 1,
        },
        {
          duration: 0.2,
          ease: "easeInOut",
        }
      );

      // Reveal the outline
      await animate(
        "[data-outline]",
        {
          opacity: 1,
          width: 50,
          height: 50,
        },
        { duration: 0.08 }
      );

      await sleep(0.05).promise;

      Promise.all([
        // Expand the outline
        animate(
          "[data-outline]",
          { borderRadius: 12, height: 58, width: "100%" },
          { duration: 0.6, ease: "easeOut" }
        ),
        // Morph spinner to button
        animate([
          // Move spinner to the right
          [
            "[data-spinner-container]",
            { left: "calc(100% - 52px)", top: "calc(50% + 1px)" },
            {
              ease: [0.65, 0, 0.35, 1],
              duration: 0.75,
            },
          ],
          // Rotate the sparkle
          [
            "[data-sparkle]",
            { rotate: 270 },
            {
              type: "spring",
              duration: 2.2,
              at: "<",
              delay: 0.1,
              bounce: 0.6,
            },
          ],
          // Morph spinner into button
          [
            "[data-submit-button]",
            { opacity: 1 },
            { duration: 0.1, at: "-1.4" },
          ],
          // Rotate audio icon
          [
            "[data-submit-button]",
            { rotate: [0, -7, 0] },
            { duration: 0.3, at: "<", type: "spring", bounce: 0.9 },
          ],
          // Change submit button background
          [
            "[data-submit-button-background]",
            { opacity: 1 },
            { duration: 0.2, at: "<" },
          ],
          // Reveal audio button
          ["[data-audio-button]", { opacity: 1 }, { at: "-0.5" }],
          // Reveal the placeholder
          ["[data-placeholder]", { opacity: 1 }, { at: "<" }],
        ]),
      ]);

      delay(() => setIsAnimFinished(true), 1100);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimFinished]);

  return (
    <div ref={scope} className="flex w-full">
      {isAnimFinished ? (
        <UserInput />
      ) : (
        <div className="relative h-[58px] w-full">
          {/* Input outline */}
          <motion.div
            key="outline"
            data-outline
            style={{ opacity: 0, borderRadius: 24, width: 50, height: 50 }}
            className="bg-background border-field-border absolute top-1/2 left-0 flex -translate-y-1/2 items-center border"
          >
            {/* Input placeholder */}
            <motion.p
              data-placeholder
              className="text-placeholder absolute left-5 h-full content-center"
              style={{ opacity: 0 }}
            >
              Enter your message
            </motion.p>
          </motion.div>

          {/* Spinner */}
          <motion.div
            data-spinner-container
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              left: "calc(0% - (-6px))",
              top: "calc(50% + 0px)",
              opacity: 0,
              scale: 0.6,
            }}
          >
            <Spinner />
          </motion.div>

          {/* Audio button */}
          <motion.div
            data-audio-button
            className="absolute top-1/2 left-[calc(100%-92px)] translate-y-[calc(-50%+1px)]"
            style={{ opacity: 0 }}
          >
            <Mic className="text-muted-75 size-6" />
          </motion.div>

          {/* Input submit button */}
          <motion.div
            data-submit-button
            style={{ opacity: 0, top: "calc(50% + 1px)" }}
            className="absolute left-[calc(100%-32px)] flex translate-x-[calc(-50%)] -translate-y-1/2 items-center justify-center gap-2.5"
          >
            <motion.div
              className="relative flex size-9.5 items-center justify-center overflow-clip rounded-full"
              style={{ rotate: 0, background: SPINNER_GRADIENT_RIGHT }}
            >
              <motion.div
                data-submit-button-background
                className="bg-accent absolute inset-0"
                style={{ opacity: 0 }}
              />
              <AudioLines className="text-background z-10 size-6" />
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <motion.div
      data-sparkle-container
      className="flex w-9.5 rounded-full p-1"
      initial={{ background: SPINNER_GRADIENT_RIGHT }}
    >
      <motion.div data-sparkle initial={{ rotate: 0 }}>
        <Sparkle
          fill="var(--background)"
          className="size-7.5 text-transparent"
        />
      </motion.div>
    </motion.div>
  );
}
