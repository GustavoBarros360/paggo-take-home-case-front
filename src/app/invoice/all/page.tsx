"use client";

import { isTokenExpired } from "@/app/utils/is-token-expired.util";
import {
  FlashMessage,
  FlashMessageProps,
} from "@/components/flash-message/flash-message";
import { IconArrowLeft } from "@/components/icons/arrow-left.icon";
import { H1 } from "@/components/typography";
import { useUserStore } from "@/lib/store";
import { Invoice } from "@/model/invoice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function AllInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showFlash, setShowFlash] = useState<FlashMessageProps>({
    show: false,
    variant: "error",
    text: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (isTokenExpired(user?.token)) {
      router.push("/login");
    }
    setLoading(true);
    axios
      .get<Invoice[]>("http://localhost:3000/invoices", {
        headers: { "x-oauth-token": user?.token },
      })
      .then((result) => {
        setInvoices(result?.data);
      })
      .catch((error) =>
        setShowFlash({ show: true, text: error.message, variant: "error" })
      )
      .finally(() => setLoading(false));
  }, [user, router]);
  return (
    <div className="container mx-auto h-screen">
      <FlashMessage
        {...showFlash}
        onClose={() => setShowFlash((prev) => ({ ...prev, show: false }))}
      />
      <button
        className="flex gap-2 text-orange-700 mt-8 mb-8 items-center"
        onClick={router.back}
      >
        <IconArrowLeft />
        Voltar
      </button>
      <div className="flex w-full justify-between">
        <H1 className="text-2xl font-bold my-4">Minhas invoices</H1>
        <button
          className="bg-orange-700 rounded-lg text-white p-2"
          onClick={() => router.push("/invoice/submission")}
        >
          Submeter outra invoice
        </button>
      </div>
      <ClipLoader
        color="black"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {!loading && (
        <ul className="divide-y divide-gray-200">
          {invoices.map((file, index) => (
            <li key={index} className="py-2 flex items-center justify-between">
              <button
                onClick={() =>
                  router.push(`/invoice/details/${file.id.toString()}`)
                }
              >
                <div className="flex flex-col">
                  <span className="text-md font-medium">{file.name}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
