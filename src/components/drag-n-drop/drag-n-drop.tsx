"use client";

import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  FlashMessage,
  FlashMessageProps,
} from "../flash-message/flash-message";

type DragAndDropProps = {
  onSubmit?: (file: File) => void;
  loading?: boolean;
};

export function DragAndDrop({ onSubmit, loading }: DragAndDropProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [file, setFile] = useState<File>();
  const [showFlashMessage, setShowFlashMessage] = useState<FlashMessageProps>({
    show: false,
    variant: "error",
    text: "",
  });

  function handleChange(e: any) {
    e.preventDefault();
    console.log("File has been added");
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  function handleSubmitFile(e: any) {
    if (!file) {
      setShowFlashMessage({
        show: true,
        text: "Por favor, escolha um arquivo para submeter",
        variant: "error",
      });
    } else {
      onSubmit?.(file);
    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile() {
    setFile(undefined);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="flex items-center justify-center w-full">
      <FlashMessage
        {...showFlashMessage}
        onClose={() =>
          setShowFlashMessage((prev) => ({ ...prev, show: false }))
        }
      />
      <form
        className={`p-4 w-1/3 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center bg-white shadow-md`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept="image/*"
        />

        <p>
          Arraste o arquivo aqui ou{" "}
          <span
            className="font-bold text-blue-600 cursor-pointer"
            onClick={openFileExplorer}
          >
            <u>Selecione</u>
          </span>{" "}
          para fazer o upload
        </p>

        {file && (
          <div className="flex flex-col items-center p-3">
            <div className="flex flex-row space-x-5">
              <span>{file?.name}</span>
              <span
                className="text-red-500 cursor-pointer"
                onClick={removeFile}
                role="button"
              >
                remover
              </span>
            </div>
          </div>
        )}

        <button
          className="bg-orange-700 rounded-lg p-2 mt-3 w-100 disabled:opacity-50 flex justify-center"
          onClick={handleSubmitFile}
          type="submit"
          disabled={!file}
        >
          {!loading && <span className="p-2 text-white">Submeter</span>}
          <ClipLoader
            color="white"
            loading={loading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </button>
      </form>
    </div>
  );
}
