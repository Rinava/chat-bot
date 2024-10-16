import type { Metadata } from 'next';
import './globals.css';
import 'material-symbols/outlined.css';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
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
    <html lang='en'>
      <body className={`antialiased`}>
        <header className=''>
          <h1 className='text-4xl font-extrabold'>Chat Bot </h1>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <main className=''>{children}</main>
        <footer className=''>&copy; {new Date().getFullYear()} Chat Bot</footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
