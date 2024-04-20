"use client";

import { isTokenExpired } from "@/app/utils/is-token-expired.util";
import { H1 } from "@/components/typography";
import { useUserStore } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Invoice } from "@/model/invoice";
import {
  FlashMessage,
  FlashMessageProps,
} from "@/components/flash-message/flash-message";
import { IconArrowLeft } from "@/components/icons/arrow-left.icon";
import { ClipLoader } from "react-spinners";

export default function InvoiceDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [invoice, setInvoice] = useState<Invoice>();
  const [loading, setLoading] = useState(false);
  const [showFlash, setShowFlash] = useState<FlashMessageProps>({
    show: false,
    variant: "error",
    text: "",
  });

  const { user } = useUserStore() ?? {};

  const { id } = params;

  useEffect(() => {
    if (isTokenExpired(user?.token)) {
      router.push("/login");
    }
    setLoading(true);
    axios
      .get<Invoice>(`http://localhost:3000/invoice/${id}`, {
        headers: { "x-oauth-token": user?.token },
      })
      .then((response) => setInvoice(response.data))
      .catch((error) =>
        setShowFlash({ show: true, variant: "error", text: error.message })
      )
      .finally(() => setLoading(false));
  }, [id, user, router]);
  return (
    <div className="flex h-screen flex-col mt-8 m-8">
      <FlashMessage
        {...showFlash}
        onClose={() => setShowFlash((prev) => ({ ...prev, show: false }))}
      />
      <button
        className=" p-2 text-orange-700 rounded-md w-fit mb-8 flex items-center gap-2 hover:underline"
        onClick={router.back}
      >
        <IconArrowLeft />
        Submeter outra invoice
      </button>
      <H1>Resumo da invoice</H1>

      <div className="h-4"></div>

      <ClipLoader
        color="black"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      {!!invoice && <p>{invoice.invoiceSummary}</p>}
    </div>
  );
}
