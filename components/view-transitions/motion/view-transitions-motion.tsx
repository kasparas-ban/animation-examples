import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

let nextId = 0;

export default function ViewTransitionsMotion() {
  const [notifications, setNotifications] = useState<number[]>([]);

  const add = () => {
    nextId += 1;
    setNotifications((prev) => [...prev, nextId]);
  };

  const remove = (id: number) => {
    setNotifications((prev) => prev.filter((item) => item !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <ul>
        <AnimatePresence initial={false} mode="popLayout">
          {notifications.map((id) => (
            <motion.li
              key={id}
              className="flex items-center justify-between mb-2 px-3 py-2 rounded-lg overflow-hidden shadow-md bg-gray-200"
              layout
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <span>{`Notification ${id}`}</span>
              <motion.button
                className="p-1 bg-red-200 rounded-full"
                onClick={() => remove(id)}
                whileTap={{ scale: 0.9 }}
              >
                <X className="size-4 text-red-700" />
              </motion.button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <motion.button
        layout
        className="py-2 px-6 bg-gray-300 rounded-lg"
        onClick={add}
        whileTap={{ scale: 0.95 }}
      >
        Add
      </motion.button>
    </div>
  );
}
