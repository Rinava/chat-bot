"use client";

import { useState, useEffect } from "react";

import { Loader2, Search, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserData } from "@/components/userData";
import { toast } from "sonner";

import { User } from "@/types/user";

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })

      .catch(() => {
        toast.error("Error occurred during users fetch", {
          description:
            "Something went wrong while fetching users, please try again later.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    );
  }, [users, search]);

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Admin Dashboard</CardTitle>
          <CardDescription>Manage and view user information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-12 animate-spin text-stone-900 dark:text-stone-100" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <UserData key={user.id} user={user} />)
          ) : (
            <Card className="col-span-full p-4 text-center">
              <CardTitle className="mb-2 flex items-center justify-center gap-2 text-2xl text-muted-foreground">
                <Users />
                No users found
              </CardTitle>
              <CardDescription>
                Try adjusting your search or check back later.
              </CardDescription>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
