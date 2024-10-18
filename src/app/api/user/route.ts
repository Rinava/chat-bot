import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  if (auth().orgRole !== "org:admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        clerkId: true,
      },
    });

    const clerkUsers = await Promise.all(
      users.map(async (user) => {
        if (!user.clerkId) return user;

        try {
          const clerkUser = await clerkClient.users.getUser(user.clerkId);
          return {
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            email: clerkUser.emailAddresses[0].emailAddress,
            imageUrl: clerkUser.imageUrl,
            clerkId: clerkUser.id,
          };
        } catch (error) {
          console.error(
            `Error fetching Clerk user for ${user.clerkId}:`,
            error,
          );
          return user;
        }
      }),
    );

    return NextResponse.json({ users: clerkUsers }, { status: 200 });
  } catch {
    return new NextResponse("Error occurred during users fetch", {
      status: 400,
    });
  }
}
