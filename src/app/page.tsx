"use client";

import React, { useState, useEffect } from "react";
import { Message as MessageType } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { Chat } from "@/components/chat";
import { SearchBar } from "@/components/searchBar";

import { useScrollToBottom } from "@/hooks/useScrollToBottom";

import { User } from "@/types/user";

export default function Home() {
  const { user } = useUser();
  const [messages, setMessages] = useState<MessageType[]>([]);

  const [input, setInput] = useState("");
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  const scrollToBottom = useScrollToBottom();

  const handleSend = async () => {
    if (input.trim() && !isWaitingForResponse) {
      const userMessage = {
        body: input,
        createdAt: new Date(),
        ai: false,
      } as MessageType;

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
      setIsWaitingForResponse(true);
      setTimeout(scrollToBottom, 100);

      try {
        const response = await fetch("/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userPrompt: input }),
        });

        const data = await response.json();

        const botMessage = {
          body: data,
          createdAt: new Date(),
          ai: true,
        } as MessageType;

        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setTimeout(scrollToBottom, 100);
      } catch {
        toast.error("Error sending message", {
          description: "Something went wrong while sending message",
        });
      } finally {
        setIsWaitingForResponse(false);
      }
    }
  };

  useEffect(() => {
    try {
      fetch("/api/history")
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.history);
          scrollToBottom("instant");
        });
    } catch {
      toast.error("Error fetching chat history", {
        description: "Something went wrong while fetching chat history",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Chat
        messages={messages}
        isWaitingForResponse={isWaitingForResponse}
        user={user as unknown as User}
        className="w-full flex-1"
      />
      <SearchBar
        value={input}
        onchange={setInput}
        handleSend={handleSend}
        isWaitingForResponse={isWaitingForResponse}
        className="sticky bottom-0 w-full"
      />
    </>
  );
}
