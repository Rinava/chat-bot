import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/themeToggle";

export const Navbar = () => (
  <header className="sticky top-0 z-navbar flex w-full items-center justify-between bg-white p-4 shadow-sm dark:bg-stone-900">
    <h1 className="text-xl font-semibold">
      <Link href="/">🤖 AI Chatbot</Link>
    </h1>
    <div className="flex items-center space-x-2">
      {auth().orgRole === "org:admin" && (
        <Button asChild>
          <Link href="/admin">Admin Dashboard</Link>
        </Button>
      )}
      <ThemeToggle />
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </header>
);
