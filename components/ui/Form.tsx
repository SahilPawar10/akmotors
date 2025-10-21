/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import DateInput from "./DateInput";

// ✅ --- FIXED TYPES HERE ---
type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "select"
  | "textarea"
  | "date"
  | "file";

interface FormFieldBase {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

interface TextField extends FormFieldBase {
  type: Exclude<FieldType, "select" | "file">;
}

interface SelectField extends FormFieldBase {
  type: "select";
  options: { label: string; value: string }[];
}

interface FileField extends FormFieldBase {
  type: "file";
}

export type FormField = TextField | SelectField | FileField;

interface FormProps {
  fields: FormField[];
  onSubmit: (
    payload: FormData | Record<any, any>,
    headers?: Record<any, string>
  ) => void;
  loading?: boolean;
  error?: string | null;
}

// ✅ --- COMPONENT ---
export default function Form({ fields, onSubmit, loading, error }: FormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target; // assign first

    if (target instanceof HTMLInputElement) {
      const { name, type, value, files } = target; // safe now

      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" && files?.length ? files[0] : value,
      }));
    } else if (
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement
    ) {
      const { name, value } = target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any field is a File
    const hasFile = Object.values(formData).some((v) => v instanceof File);

    let payload: any;
    const headers: Record<string, string> = {};

    if (hasFile) {
      // Send as FormData
      payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          payload.append(key, value, value.name);
        } else if (value !== undefined && value !== null) {
          payload.append(key, value.toString());
        }
      });
      headers["Content-Type"] = "multipart/form-data";
    } else {
      // Send as JSON
      payload = { ...formData };
      headers["Content-Type"] = "application/json";
    }

    // Debug
    // Call parent onSubmit
    onSubmit(payload, headers);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white rounded-2xl p-6 shadow-md border border-gray-100"
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>

          {field.type === "select" ? (
            <select
              name={field.name}
              required={field.required}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select {field.label}
              </option>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              rows={3}
            />
          ) : field.type === "date" ? (
            <DateInput
              value={
                formData[field.name] ? new Date(formData[field.name]) : null
              }
              onChange={(date) =>
                setFormData({ ...formData, [field.name]: date })
              }
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          )}
        </div>
      ))}

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
