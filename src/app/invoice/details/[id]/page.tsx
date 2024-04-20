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
import { ExpenseField } from "@aws-sdk/client-textract";

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

  const handleCompleted = (result: Invoice) => {
    setInvoice(result);
  };

  useEffect(() => {
    if (isTokenExpired(user?.token)) {
      router.push("/login");
    }
    setLoading(true);
    axios
      .get<Invoice>(`http://localhost:3000/invoice/${id}`, {
        headers: { "x-oauth-token": user?.token },
      })
      .then((response) => handleCompleted(response.data))
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

      <div className="flex flex-wrap gap-4">
        {!!invoice &&
          invoice.invoiceSummary.ExpenseDocuments?.map((doc) => {
            return doc?.SummaryFields?.map((field, index) => {
              return (
                <div
                  className="flex flex-col gap-2 bg-white shadow rounded-lg px-4 py-2 justify-center"
                  key={`${doc.ExpenseIndex}-${field.LabelDetection?.Text}-${field.ValueDetection?.Text}-${index}`}
                >
                  {field.LabelDetection?.Text ? (
                    <strong>{field.LabelDetection?.Text}</strong>
                  ) : (
                    <strong>{field.Type?.Text}</strong>
                  )}
                  <div className="border rounded-lg border-gray-500 bg-gray-200 p-2">
                    <span>{field.ValueDetection?.Text}</span>
                  </div>
                </div>
              );
            });
          })}
      </div>
    </div>
  );
}
