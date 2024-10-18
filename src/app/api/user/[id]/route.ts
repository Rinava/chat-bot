import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (auth().orgRole !== "org:admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = params;

  if (!id) {
    return new NextResponse("User ID not provided", { status: 400 });
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: id,
      },
      include: {
        messages: true,
      },
    });

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    const clerkUser = await clerkClient.users.getUser(id);

    const user = {
      ...dbUser,
      clerkId: clerkUser.id || "",
      firstName: clerkUser.firstName || "",
      lastName: clerkUser.lastName || "",
      imageUrl: clerkUser.imageUrl || "",
      email: clerkUser.emailAddresses[0].emailAddress || "",
    };

    return NextResponse.json(user, { status: 200 });
  } catch {
    return new NextResponse("Error occurred during user fetch", {
      status: 400,
    });
  }
}
