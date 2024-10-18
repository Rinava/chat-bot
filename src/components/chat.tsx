import { Message as MessageType } from "@prisma/client";

import { Message } from "@/components/message";
import { cn } from "@/lib/utils";

import { User } from "@/types/user";

interface PrivateChatProps {
  messages: MessageType[];
  isWaitingForResponse?: boolean;
  user?: User;
  className?: string;
}

export const Chat = ({
  messages,
  isWaitingForResponse,
  user,
  className,
}: PrivateChatProps) => (
  <div className={cn("w-full max-w-4xl p-4", className)}>
    {messages.map((message, index) => (
      <Message
        key={index}
        date={message.createdAt}
        body={message.body}
        avatarImage={(!message.ai && user?.imageUrl) || undefined}
        avatarFallback={message.ai ? "🤖" : user?.firstName?.[0] || undefined}
        side={message.ai ? "left" : "right"}
      />
    ))}

    {isWaitingForResponse && (
      <div className="mb-4 flex justify-start">
        <div className="flex items-center rounded-lg bg-white p-3 shadow-md dark:bg-stone-800">
          <div className="typing-indicator">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    )}
  </div>
);
