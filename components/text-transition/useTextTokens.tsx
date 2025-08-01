import { useMemo } from "react";
import { motion } from "motion/react";

export default function useTextTokens({ text }: { text: string }) {
  const tokens = useMemo(
    () =>
      text.split(" ").map((token, idx) => (
        <motion.span
          key={idx}
          layoutId={`token-${idx}`}
          transition={{
            layout: {
              duration: 0.6,
              ease: [0.25, 1, 0.5, 1],
            },
          }}
          // className="leading-[1.2]"
        >
          {token}
        </motion.span>
      )),
    [text]
  );

  return { tokens };
}
