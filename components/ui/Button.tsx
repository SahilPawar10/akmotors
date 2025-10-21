"use client";
import React from "react";
import { cn } from "@/lib/utils"; // optional helper, see fallback below

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  children,
  icon,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200";

  const variants = {
    primary:
      "bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg active:scale-95",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-sm active:scale-95",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95",
  };

  return (
    <button {...props} className={cn(baseStyles, variants[variant], className)}>
      {icon && <span className="h-4 w-4">{icon}</span>}
      {children}
    </button>
  );
}
