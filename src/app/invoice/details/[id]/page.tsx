"use client";

import { isTokenExpired } from "@/app/utils/is-token-expired.util";
import { H1 } from "@/components/typography";
import { useUserStore } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Invoice } from "@/model/invoice";

export default function InvoiceDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [invoice, setInvoice] = useState<Invoice>();

  const { user } = useUserStore() ?? {};

  const { id } = params;

  useEffect(() => {
    if (isTokenExpired(user?.token)) {
      router.push("/login");
    }
    axios
      .get<Invoice>(`http://localhost:3000/invoice/${id}`, {
        headers: { "x-oauth-token": user?.token },
      })
      .then((response) => setInvoice(response.data))
      .catch((error) => alert(error.message));
  }, [id, user, router]);
  return (
    <div className="flex h-screen flex-col mt-8 m-8">
      <button
        className="bg-orange-700 p-2 text-white rounded-md w-fit mb-8"
        onClick={router.back}
      >
        Submeter outra invoice
      </button>
      <H1>Resumo da invoice</H1>

      <div className="h-4"></div>

      {!!invoice && <p>{invoice.invoiceSummary}</p>}
    </div>
  );
}
