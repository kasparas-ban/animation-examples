import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { TextArea } from "../ui/text-area/text-area";
import { AudioLines, Mic } from "lucide-react";

export const UserInput: React.FC = () => {
  return (
    <div className="relative box-border w-full">
      <div className="focus-within:border-accent bg-background rounded-theme-radius border-field-border relative box-border flex w-full overflow-hidden border transition-all">
        <div className="relative flex w-full overflow-hidden">
          <TextArea
            data-hook="user-input"
            autoComplete="off"
            placeholder="Enter your message"
          />

          <div className="flex items-end gap-2.5 px-3 py-2">
            <div className="relative z-10 size-9.5">
              <Button
                className={cn(
                  "text-muted-75 hover:bg-fill-tertiary-hover size-9.5 gap-1.5 rounded-full border-none bg-transparent shadow-none duration-300 hover:scale-110"
                )}
                size="sm"
                type="button"
                variant="none"
              >
                <Mic className="size-6" />
              </Button>
            </div>
            <Button
              data-hook="submit-or-toggle-voice"
              className="text-background hover:bg-accent z-10 size-9.5 gap-1.5 rounded-full duration-300 hover:scale-110"
              type="button"
              size="sm"
            >
              <AudioLines className="size-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
