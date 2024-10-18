import { SignInButton } from "@clerk/nextjs";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SignIn = () => (
  <Card className="mx-auto w-[350px] shadow-lg">
    <CardHeader className="space-y-1">
      <CardTitle className="text-center text-2xl font-bold">
        Welcome to ChatBot
      </CardTitle>
      <CardDescription className="text-center">
        Sign in to get the full experience
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <SignInButton>
        <Button className="w-full" size="lg">
          Sign in
        </Button>
      </SignInButton>
    </CardContent>
  </Card>
);
