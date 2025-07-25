import React from "react";
import { cn } from "@/utils/utils";
import "./text-area.css";

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>((props, ref) => {
  return (
    <div className="ta" data-replicated-value={props.value}>
      <textarea
        rows={1}
        data-slot="textarea"
        className={cn(
          "resize-none rounded-md border-0",
          "placeholder:text-placeholder text-base",
          "dark:bg-input/30 bg-transparent",
          "border-input focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-0",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-[color] outline-none"
        )}
        {...props}
        ref={ref}
      />
    </div>
  );
});

TextArea.displayName = "TextArea";

export { TextArea };
