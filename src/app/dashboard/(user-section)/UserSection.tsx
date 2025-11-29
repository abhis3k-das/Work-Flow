"use client";
import { useState } from "react";
import { UserType } from "../types";
import Users from "./Users";
import UsersInfo from "./UsersInfo";

export default function UserSection({ users }: { users: UserType[] }) {
  const [selectedUserId, setSelectedUserId] = useState<UserType["id"] | null>(() => {
    if (users.length == 0) return null;
    return users[0].id;
  });

  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[2fr_3fr]">
      <Users users={users} setSelectedUserId={setSelectedUserId} selectedUserId={selectedUserId} />
      <UsersInfo userId={selectedUserId} />
    </div>
  );
}
