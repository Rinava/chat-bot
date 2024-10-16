'use client'
import React from 'react';
import { useAuth } from '@clerk/nextjs'
import Chat from '@/components/chat';

export default function Home() {
  const { isLoaded, userId, sessionId } = useAuth();
  if (!isLoaded || !userId) {
    return (
      <div>
        Welcome to ChatBot, please sign in to get the full experience
      </div>
    )
      
  }
  return (
    <div className=''>
      Hello, {userId} your current active session is {sessionId}
      <Chat />
    </div>
  );
}
