import { Send, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onchange: (value: string) => void;
  handleSend: () => void;
  isWaitingForResponse: boolean;
  className?: string;
}

export const SearchBar = ({
  value,
  onchange,
  handleSend,
  isWaitingForResponse,
  className,
}: SearchBarProps) => (
  <div
    className={cn(
      "border-t border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900",
      className,
    )}
  >
    <div className="mx-auto flex max-w-4xl space-x-2">
      <Input
        value={value}
        onChange={(e) => onchange(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-grow"
      />
      <Button
        onClick={handleSend}
        disabled={isWaitingForResponse}
        aria-label="Send message"
        size="icon"
      >
        {isWaitingForResponse ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
      </Button>
    </div>
  </div>
);
