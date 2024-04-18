"use client";

import { H1 } from "@/components/typography";
import { useParams } from "next/navigation";

export default function InvoiceDetails() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  return (
    <div>
      <H1>Resumo da invoice</H1>
    </div>
  );
}
