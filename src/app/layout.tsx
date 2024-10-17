import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/themeProvider';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChatBot',
  description: 'ChatBot',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' className={inter.className} suppressHydrationWarning>
        <body className={`antialiased`}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {/* poner header y footer por aca */}
            <main>
              <SignedOut>
                <p>
                  Welcome to ChatBot, please sign in to get the full experience
                </p>
                <SignInButton />
              </SignedOut>
              <SignedIn>{children}</SignedIn>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
