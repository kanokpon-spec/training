"use client";

import { users } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <Link href="/react">
        <div className="flex justify-center">
          <h1>React</h1>
        </div>
      </Link>
      <div className="flex flex-col justify-center">
        <h1 className="text-white">สมาชิก</h1>
        {users.map((user) => (
          // <Link href={`/user/${user.id}`}>
          <div
            className="flex flex-col justify-center"
            key={user.id}
            onClick={() => router.push(`/user/${user.id}`)}
          >
            <div className="border">
              <p>{user.name}</p>
              <p>{user.status}</p>
              <Image src={user.images} alt="" width={100} height={100} />
              <p
                className={`${
                  user.available ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.available ? "Available" : "Not Available"}
              </p>
            </div>
          </div>
          // </Link>
        ))}
      </div>
    </>
  );
}
