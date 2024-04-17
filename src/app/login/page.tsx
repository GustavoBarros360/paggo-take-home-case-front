"use client";

import { Button } from "@/components/button";
import { H1 } from "@/components/typography";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-4">
      <H1>Login</H1>
      <Button
        onClick={() => router.push("/invoice/submission")}
        className="bg-white rounded-lg text-black font-semibold p-4"
      >
        Login com Google
      </Button>
    </div>
  );
}
