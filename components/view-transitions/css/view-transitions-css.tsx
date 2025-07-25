import React, { useState } from "react";
import { X } from "lucide-react";
import { flushSync } from "react-dom";
import "./view-transitions-css.css";

let nextId = 0;

export default function ViewTransitionsCSS() {
  const [notifications, setNotifications] = useState<number[]>([]);

  const add = () => {
    nextId += 1;

    document.startViewTransition(() => {
      flushSync(() => setNotifications((prev) => [...prev, nextId]));
    });
  };

  const remove = (id: number) => {
    const li = document.getElementById(`li-${id}`);
    li!.style["view-transition-name"] = "tn-out";

    document.startViewTransition(() =>
      flushSync(() =>
        setNotifications((prev) => prev.filter((item) => item !== id))
      )
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <ul>
        {notifications.map((id) => (
          <li
            key={id}
            id={`li-${id}`}
            style={{ "--transition-name": `tn-${id} ` } as React.CSSProperties}
            className="flex items-center justify-between mb-2 px-3 py-2 rounded-lg overflow-hidden shadow-md bg-gray-200"
          >
            <span>{`Notification ${id}`}</span>
            <button
              className="p-1 bg-red-200 rounded-full"
              onClick={() => remove(id)}
            >
              <X className="size-4 text-red-700" />
            </button>
          </li>
        ))}
      </ul>
      <button className="py-2 px-6 bg-gray-300 rounded-lg" onClick={add}>
        Add
      </button>
    </div>
  );
}
