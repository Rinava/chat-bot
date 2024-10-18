import { User as UserPrisma } from "@prisma/client";

export interface User extends UserPrisma {
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  email: string;
}
