import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import { SignIn } from "@/components/signIn";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Chatbot",
  description:
    "An intelligent chatbot powered by AI to assist and interact with users",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <ClerkProvider>
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex flex-1 flex-col items-center justify-center">
            <SignedOut>
              <SignIn />
            </SignedOut>
            <SignedIn>{children}</SignedIn>
            <Toaster />
          </main>
        </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
