"use client";

import { isTokenExpired } from "@/app/utils/is-token-expired.util";
import { DragAndDrop } from "@/components/drag-n-drop";
import {
  FlashMessage,
  FlashMessageProps,
} from "@/components/flash-message/flash-message";
import { IconArrowLeft } from "@/components/icons/arrow-left.icon";
import IconArrowRight from "@/components/icons/arrow-right.icon";
import { H1 } from "@/components/typography";
import { useUserStore } from "@/lib/store";
import { Invoice } from "@/model/invoice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InvoiceSubmission() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showFlash, setShowFlash] = useState<FlashMessageProps>({
    show: false,
    variant: "error",
    text: "",
  });

  const { user } = useUserStore() ?? {};

  const handleSubmitCompleted = (invoice: Invoice) => {
    router.push(`/invoice/details/${invoice.id.toString()}`);
  };

  function handleSubmitFile(file: File) {
    if (!file) {
      return;
    } else {
      setLoading(true);
      axios
        .post<Invoice>(
          "http://localhost:3000/upload-invoice",
          { file },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-oauth-token": user?.token,
            },
          }
        )
        .then((resp) => {
          handleSubmitCompleted(resp.data);
        })
        .catch((error) =>
          setShowFlash({ show: true, text: error.message, variant: "error" })
        )
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    if (isTokenExpired(user?.token ?? "")) {
      router.push("/login");
    }
  }, [user, router]);
  return (
    <div className="flex flex-1 h-screen justify-center items-center">
      <div className="flex flex-col gap-8  justify-center mx-auto">
        <FlashMessage
          {...showFlash}
          onClose={() => setShowFlash((prev) => ({ ...prev, show: false }))}
        />
        <button
          className="flex items-center text-orange-700 hover:underline gap-2"
          onClick={() => router.push("/invoice/all")}
        >
          Ver minhas invoices
          <IconArrowRight />
        </button>
        <H1>Submeter Invoice</H1>
        <DragAndDrop onSubmit={handleSubmitFile} loading={loading} />
      </div>
    </div>
  );
}
