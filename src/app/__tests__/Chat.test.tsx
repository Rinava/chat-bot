import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Message as MessageType } from "@prisma/client";

import { Chat } from "@/components/chat";

describe("Chat Component", () => {
  const messages: MessageType[] = [
    {
      id: "1",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      body: "Hello!",
      userId: "user1",
      ai: false,
    },
    {
      id: "2",
      createdAt: new Date("2024-01-01T00:01:00Z"),
      body: "How can I help you?",
      userId: "ai",
      ai: true,
    },
  ];

  const user = {
    firstName: "Mary",
    lastName: "Doe",
    email: "mary.doe@example.com",
    id: "user1",
    createdAt: new Date("2023-01-01T00:00:00Z"),
    clerkId: "clerk123",
    imageUrl: "https://example.com/avatar.jpg",
  };

  it("renders the chat component", () => {
    render(<Chat messages={messages} user={user} />);
    expect(screen.getByTestId("chat")).toBeInTheDocument();
  });

  it("displays all messages", () => {
    render(<Chat messages={messages} user={user} />);
    messages.forEach((message) => {
      expect(screen.getByText(message.body)).toBeInTheDocument();
    });
  });

  it("renders messages in chronological order", () => {
    render(<Chat messages={messages} user={user} />);
    const renderedMessages = screen.getAllByTestId("message");
    expect(renderedMessages[0]).toHaveTextContent("Hello!");
    expect(renderedMessages[1]).toHaveTextContent("How can I help you?");
  });
});
