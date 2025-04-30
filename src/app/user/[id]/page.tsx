"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { users } from "@/types";
import Image from "next/image";
const UserInfo = () => {
  const router = useRouter();
  const { id } = useParams();
  const user = users.find((user) => user.id.toString() === id);
  if (!user) {
    router.push("/404");
  }
  return (
    <div>
      <div className="flex flex-col justify-start">
        <button onClick={() => router.back()}>Back</button>
        <div className="border">
          <p>{user?.name}</p>
          <p>{user?.status}</p>
          <Image src={user?.images || ""} alt="" width={100} height={100} />
          <p
            className={`${user?.available ? "text-green-500" : "text-red-500"}`}
          >
            {user?.available ? "Available" : "Not Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
