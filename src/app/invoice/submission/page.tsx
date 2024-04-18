"use client";

import { DragAndDrop } from "@/components/drag-n-drop";
import { H1 } from "@/components/typography";
import axios from "axios";
import { useState } from "react";

export default function InvoiceSubmission() {
  const [extractedText, setExtractedText] = useState("");
  function handleSubmitFile(file: File) {
    if (!file) {
      return;
    } else {
      axios
        .post(
          "http://localhost:3000/upload-invoice",
          { file },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((resp) => setExtractedText(resp.data.text))
        .catch((error) => console.error(error));
    }
  }
  return (
    <div className="flex flex-1 h-screen justify-center items-center">
      <div className="flex flex-col gap-8 align-middle justify-center items-center w-full">
        <H1>Submeter Invoice</H1>
        <DragAndDrop onSubmit={handleSubmitFile} />

        {!!extractedText && <p>{extractedText}</p>}
      </div>
    </div>
  );
}
