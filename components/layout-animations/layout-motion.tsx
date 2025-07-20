import { motion } from "motion/react";
import { useState } from "react";

type State = "first" | "second";

export default function LayoutMotion() {
  const [state, setState] = useState<State>("first");

  const toggleState = () => {
    setState((prev) => (prev === "first" ? "second" : "first"));
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      {state === "first" && (
        <motion.div
          layoutId="input"
          className="w-[500px]"
          onClick={toggleState}
          transition={{ layout: { duration: 2 } }}
        >
          <Input />
        </motion.div>
      )}

      {state === "second" && (
        <motion.div
          layoutId="input"
          className="absolute bottom-10 w-[700px]"
          onClick={toggleState}
          transition={{ layout: { duration: 2 } }}
        >
          <Input />
        </motion.div>
      )}
    </div>
  );
}

function Input() {
  return (
    <motion.div className="bg-blue-100 p-3 w-full rounded-lg border border-blue-300">
      <motion.div className="rounded-full size-8 bg-red-500" />
    </motion.div>
  );
}
