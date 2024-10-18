"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { Chat } from "@/components/chat";

import { User } from "@/types/user";
import { Loader2 } from "lucide-react";

const UserHistory = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<User>();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/user/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.messages);
        setUser(data);
        setIsLoading(false);
      })
      .catch(() => {
        notFound();
      });
  }, []);

  return isLoading ? (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="size-12 animate-spin text-stone-900 dark:text-stone-100" />
    </div>
  ) : messages.length === 0 ? (
    <div className="flex h-64 items-center justify-center">
      <p className="text-stone-900 dark:text-stone-100">No messages found</p>
    </div>
  ) : (
    <Chat messages={messages || []} user={user} className="w-full flex-1" />
  );
};

export default UserHistory;
