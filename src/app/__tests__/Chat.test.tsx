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
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    id: "user1",
    createdAt: new Date("2023-01-01T00:00:00Z"),
    clerkId: "clerk123",
    imageUrl: "https://example.com/avatar.jpg",
  };

  test("renders messages correctly", () => {
    render(<Chat messages={messages} user={user} />);

    // Check if messages are rendered
    const messageElements = screen.getAllByTestId("message");
    expect(messageElements).toHaveLength(messages.length);

    // Check content of the first message
    expect(messageElements[0]).toHaveTextContent("Hello!");
    expect(messageElements[0]).toContainHTML("John");
    expect(messageElements[0]).toHaveClass("right"); // User message should be on the right

    // Check content of the AI message
    expect(messageElements[1]).toHaveTextContent("How can I help you?");
    expect(messageElements[1]).toHaveTextContent("🤖"); // AI message should show robot emoji
    expect(messageElements[1]).toHaveClass("left"); // AI message should be on the left
  });

  test("shows typing indicator when waiting for response", () => {
    render(
      <Chat messages={messages} user={user} isWaitingForResponse={true} />,
    );

    // Check for the typing indicator
    expect(screen.getByText("🤖")).toBeInTheDocument(); // AI message present
    // search for a class name "typing-indicator" in the document
    const typingIndicator = screen.getB

    expect(typingIndicator).toBeInTheDocument(); // Check if typing indicator is rendered
  });

  test("does not show typing indicator when not waiting for response", () => {
    render(
      <Chat messages={messages} isWaitingForResponse={false} user={user} />,
    );

    // Ensure typing indicator is not present
    expect(screen.queryByText("typing-indicator")).not.toBeInTheDocument();
  });
});
