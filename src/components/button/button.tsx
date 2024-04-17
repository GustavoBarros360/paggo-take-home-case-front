"use client";

import React from "react";

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "alert" | "link" | "neutral";
};

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="bg-orange-700 rounded-lg text-white font-semibold p-4"
      {...props}
    >
      {children}
    </button>
  );
};
