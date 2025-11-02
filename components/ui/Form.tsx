/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import CreatableSelect from "react-select/creatable";
import type { MenuPosition } from "react-select";
import Button from "@/components/ui/Button";
import DateInput from "./DateInput";

// --- FIELD TYPES ---
type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "select"
  | "textarea"
  | "date"
  | "file"
  | "searchable";

interface FormFieldBase {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

interface TextField extends FormFieldBase {
  type: Exclude<FieldType, "select" | "file" | "searchable">;
}

interface SelectField extends FormFieldBase {
  type: "select";
  options: { label: string; value: string }[];
}

interface FileField extends FormFieldBase {
  type: "file";
}

interface SearchableConfig {
  api?: string; // optional remote API
  data?: any[]; // ✅ local array data
  labelKey: string;
  valueKey: string;
  fillFields?: Record<string, string>; // auto-fill mapping
}

interface SearchableField extends FormFieldBase {
  type: "searchable";
  searchable: SearchableConfig;
}

export type FormField = TextField | SelectField | FileField | SearchableField;

interface FormProps {
  fields: FormField[];
  onSubmit: (
    payload: FormData | Record<any, any>,
    headers?: Record<any, string>
  ) => void;
  loading?: boolean;
  error?: string | null;
}

// --- SEARCHABLE INPUT ---
const SearchableInput = ({
  field,
  onSelect,
}: {
  field: SearchableField;
  onSelect: (data: any | null) => void;
}) => {
  const { api, data, labelKey, valueKey } = field.searchable;

  const commonStyles = {
    control: (base: any) => ({
      ...base,
      borderColor: "#d1d5db",
      borderRadius: "0.375rem",
      padding: "2px",
      minHeight: "36px",
      boxShadow: "none",
      "&:hover": { borderColor: "#9ca3af" },
    }),
    menu: (base: any) => ({
      ...base,
      position: "absolute",
      zIndex: 30,
      backgroundColor: "white",
      overflowY: "auto",
      maxHeight: "180px",
    }),
    menuList: (base: any) => ({
      ...base,
      maxHeight: "180px",
      overflowY: "auto",
    }),
  };

  const commonProps = {
    placeholder: `Select or type ${field.label}...`,
    isClearable: true,
    menuPosition: "absolute" as MenuPosition,
    menuPortalTarget: undefined, // ✅ ensures menu stays INSIDE parent
    menuShouldScrollIntoView: false,
    styles: commonStyles,
  };

  // ✅ Static local data
  if (Array.isArray(data)) {
    const options = data.map((item: any) => ({
      label: item[labelKey],
      value: item[valueKey],
      record: item,
    }));

    // return (
    //   <CreatableSelect
    //     options={options}
    //     placeholder={`Select or type ${field.label}...`}
    //     onChange={(option: any) => {
    //       if (!option) return onSelect(null);

    //       // If user selected existing one
    //       if (option.record) {
    //         onSelect(option.record);
    //       } else {
    //         // User typed a new name manually
    //         onSelect({
    //           [labelKey]: option.label,
    //           [valueKey]: option.label, // fallback
    //         });
    //       }
    //     }}
    //     isClearable
    //     isValidNewOption={(inputValue) => !!inputValue.trim()} // allow custom input
    //     formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
    //     styles={{
    //       control: (base) => ({
    //         ...base,
    //         borderColor: "#d1d5db",
    //         borderRadius: "0.375rem",
    //         padding: "2px",
    //       }),
    //     }}
    //   />
    // );

    return (
      <CreatableSelect
        {...commonProps}
        options={options}
        onChange={(option: any) => {
          if (!option) return onSelect(null);
          if (option.record) {
            onSelect(option.record);
          } else {
            onSelect({
              [labelKey]: option.label,
              [valueKey]: option.label,
            });
          }
        }}
        isValidNewOption={(inputValue) => !!inputValue.trim()}
        formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
      />
    );
  }

  // ✅ Async search (optional API mode)
  const loadOptions = async (inputValue: string) => {
    if (!api) return [];
    const res = await fetch(`${api}?query=${inputValue}`);
    const result = await res.json();
    return result.map((item: any) => ({
      label: item[labelKey],
      value: item[valueKey],
      record: item,
    }));
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      placeholder={`Search ${field.label}...`}
      onChange={(option: any) => onSelect(option?.record || null)}
      isClearable
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#d1d5db",
          borderRadius: "0.375rem",
          padding: "2px",
        }),
      }}
    />
  );
};

// --- MAIN FORM ---
export default function Form({ fields, onSubmit, loading, error }: FormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" && files?.length ? files[0] : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasFile = Object.values(formData).some((v) => v instanceof File);
    const headers: Record<string, string> = {};
    let payload: any;

    if (hasFile) {
      payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) payload.append(key, value, value.name);
        else if (value !== undefined && value !== null)
          payload.append(key, value.toString());
      });
      headers["Content-Type"] = "multipart/form-data";
    } else {
      payload = { ...formData };
      headers["Content-Type"] = "application/json";
    }

    onSubmit(payload, headers);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
    >
      <div
        className={`grid gap-4 ${
          fields.length > 6 ? "sm:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>

            {/* ✅ All input rendering logic stays same */}
            {field.type === "searchable" ? (
              <SearchableInput
                field={field}
                onSelect={(record) => {
                  // if (record && field.searchable.fillFields) {
                  //   const fillFields = field.searchable.fillFields;
                  //   setFormData((prev) => {
                  //     const updated = { ...prev };
                  //     Object.entries(fillFields).forEach(
                  //       ([targetField, sourceKey]) => {
                  //         updated[targetField] = record[sourceKey];
                  //       }
                  //     );
                  //     updated[field.name] = record[field.searchable.valueKey];
                  //     return updated;
                  //   });
                  // }

                  setFormData((prev) => {
                    const updated = { ...prev };

                    // Always set the main field
                    updated[field.name] =
                      record?.[field.searchable.labelKey] || "";

                    // Fill mapped fields (only if they exist in record)
                    if (record && field.searchable.fillFields) {
                      Object.entries(field.searchable.fillFields).forEach(
                        ([targetField, sourceKey]) => {
                          if (record[sourceKey] !== undefined) {
                            updated[targetField] = record[sourceKey];
                          }
                        }
                      );
                    }

                    return updated;
                  });
                }}
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                required={field.required}
                onChange={handleChange}
                value={formData[field.name] || ""}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select {field.label}</option>
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
                value={formData[field.name] || ""}
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
                  setFormData((prev) => ({ ...prev, [field.name]: date }))
                }
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm font-medium mt-4">{error}</p>
      )}

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
