"use client";

import { H1 } from "@/components/typography";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/firebase/firebase-auth.service";
import { useUserStore } from "@/lib/store";
import { UserCredential } from "firebase/auth";
import { GoogleIcon } from "@/components/google-icon";

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
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex flex-col gap-4 bg-white p-16 rounded-lg shadow shadow-md">
        <H1>Login</H1>
        <button
          onClick={() =>
            signInWithGoogle((result) => handleLoginCompleted(result))
          }
          className="flex gap-2 items-center bg-white rounded-lg text-black p-4 border border-gray-600"
        >
          <GoogleIcon />
          Entrar com Google
        </button>
      </div>
    </div>
  );
}
