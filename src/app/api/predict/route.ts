import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const maxDuration = 60;

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error(
    'GEMINI_API_KEY is not defined in the environment variables.'
  );
}

const genAI = new GoogleGenerativeAI(apiKey);
const generationConfig = {
  maxOutputTokens: 80,
  responseMimeType: 'text/plain',
};

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig,
});

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { userPrompt } = await request.json();
    const prompt = `Act as a chatbot. UserPrompt: ${userPrompt}`;
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    await prisma.message.create({
      data: {
        userId,
        body: userPrompt,
      },
    });

    await prisma.message.create({
      data: {
        userId,
        body: response,
        ai: true,
      },
    });

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
