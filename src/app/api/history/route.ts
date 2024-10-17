import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  // TODO si quiere fetchear historial de un user ajeno tiene que ser admin

  try {
    const history = await prisma.message.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({ history }, { status: 200 });
  } catch  {
    return new NextResponse('Error occurred during history fetch', { status: 400 });
  }

}
