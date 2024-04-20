"use client";

export type FlashMessageProps = {
  text: string;
  variant: "success" | "error" | "warning";
  show: boolean;
  onClose?: () => void;
};

export const FlashMessage = ({
  text,
  variant,
  show,
  onClose,
}: FlashMessageProps) => {
  const style = {
    error: "bg-red-100 border border-red-400 text-red-700",
    success: "bg-green-100 border border-green-400 text-green-700",
    warning: "bg-yellow-100 border border-yellow-400 text-yellow-700",
  };
  const textColor = {
    error: "text-red-500",
    success: "text-green-500",
    warning: "text-yellow-500",
  };
  return (
    <div
      className={`${!show && "hidden"} ${
        style[variant]
      } px-4 py-3 rounded fixed m-auto top-8 flex justify-between items-center`}
      role="alert"
    >
      <span>{text}</span>
      <span>
        <svg
          className={`fill-current h-6 w-6 ${textColor[variant]}`}
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={onClose}
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
};
