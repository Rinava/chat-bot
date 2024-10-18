import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { User } from "@/types/user";

export const UserData = ({ user }: { user: User }) => {
  return (
    <Card
      key={user.id}
      className="flex flex-col justify-between overflow-hidden"
    >
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar className="size-8">
          <AvatarImage
            src={user.imageUrl}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <AvatarFallback>
            {user.firstName?.[0] || ""}
            {user.lastName?.[0] || ""}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>
            {user.firstName} {user.lastName}
          </CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button className="w-full" variant="outline" asChild>
          <Link href={`/admin/${user.clerkId}`}>View Chat History</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
