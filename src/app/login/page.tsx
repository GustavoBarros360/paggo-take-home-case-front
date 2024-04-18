"use client";

import { Button } from "@/components/button";
import { H1 } from "@/components/typography";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/firebase/firebase-auth.service";
import { useUserStore } from "@/lib/store";
import { UserCredential } from "firebase/auth";

export default function Login() {
  const router = useRouter();

  const { updateUser } = useUserStore();

  const handleLoginCompleted = async (result: UserCredential) => {
    const { email, displayName: name, uid: id } = result.user;
    const token = await result.user.getIdToken(true);
    updateUser({ email: email ?? "", name: name ?? "", id, token });
    router.push("/invoice/submission");
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-4">
      <H1>Login</H1>
      <Button
        onClick={() =>
          signInWithGoogle((result) => handleLoginCompleted(result))
        }
        className="bg-white rounded-lg text-black font-semibold p-4"
      >
        Login com Google
      </Button>
    </div>
  );
}
