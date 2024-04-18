"use client";

import { isTokenExpired } from "@/app/utils/is-token-expired.util";
import { DragAndDrop } from "@/components/drag-n-drop";
import { H1 } from "@/components/typography";
import { useUserStore } from "@/lib/store";
import { Invoice } from "@/model/invoice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InvoiceSubmission() {
  const router = useRouter();

  const { user } = useUserStore() ?? {};
  if (isTokenExpired(user?.token)) {
    return router.push("/login");
  }

  const handleSubmitCompleted = (invoice: Invoice) => {
    router.push(`/invoice/details/${invoice.id.toString()}`);
  };

  function handleSubmitFile(file: File) {
    if (!file) {
      return;
    } else {
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
        .catch((error) => console.error(error));
    }
  }
  return (
    <div className="flex flex-1 h-screen justify-center items-center">
      <div className="flex flex-col gap-8 align-middle justify-center items-center w-full">
        <H1>Submeter Invoice</H1>
        <DragAndDrop onSubmit={handleSubmitFile} />
      </div>
    </div>
  );
}
