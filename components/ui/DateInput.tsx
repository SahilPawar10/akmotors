"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export default function DateInput({ value, onChange }: DateInputProps) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      dateFormat="dd-MM-yyyy"
      placeholderText="Select a date"
      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
