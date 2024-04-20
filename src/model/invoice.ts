import { AnalyzeExpenseCommandOutput } from "@aws-sdk/client-textract";

export type Invoice = {
  id: number;
  userId: string;
  invoiceSummary: AnalyzeExpenseCommandOutput;
  invoiceBucket?: string;
};
