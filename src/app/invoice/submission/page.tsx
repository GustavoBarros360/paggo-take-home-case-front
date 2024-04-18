import { DragAndDrop } from "@/components/drag-n-drop";
import { H1 } from "@/components/typography";

export default function InvoiceSubmission() {
  return (
    <div className="flex flex-1 h-screen justify-center items-center">
      <div className="flex flex-col gap-8 align-middle justify-center items-center w-full">
        <H1>Submeter Invoice</H1>
        <DragAndDrop />
      </div>
    </div>
  );
}
