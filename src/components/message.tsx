import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

interface MessageProps {
  date: Date;
  body: string;
  avatarImage?: string;
  avatarFallback?: string;
  side: "left" | "right";
}

export const Message = ({
  date,
  body,
  avatarImage,
  avatarFallback,
  side,
}: MessageProps) => (
  <div
    className={cn(
      "mb-4 flex",
      side === "left" ? "justify-start" : "justify-end",
    )}
    data-testid="message"
  >
    <div
      className={cn(
        "flex max-w-[75%] gap-2",
        side === "left" ? "flex-row" : "flex-row-reverse",
      )}
    >
      <Avatar>
        {avatarImage && <AvatarImage src={avatarImage} />}
        <AvatarFallback className="bg-stone-200 dark:bg-stone-700">
          {avatarFallback}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "flex flex-col gap-2 rounded-lg p-3 shadow-md",
          side === "left"
            ? "bg-white text-stone-900 dark:bg-stone-700 dark:text-stone-200"
            : "bg-stone-900 text-white dark:bg-stone-700 dark:text-stone-200",
        )}
      >
        {body}
        <div className="text-right text-xs opacity-75">
          {new Date(date).toLocaleTimeString()}
        </div>
      </div>
    </div>
  </div>
);
