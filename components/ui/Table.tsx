/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { Search, Pencil, Save, X, Trash2, ArrowUpDown } from "lucide-react";
import TableSkeleton from "./TableSkeleton";

type Column<T> = {
  key: keyof T | string;
  label: string;
  editable?: boolean;
  hidden?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  loading?: boolean;
  error?: string | null;
  searchable?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export default function Table<T extends object>({
  data,
  columns,
  pageSize = 10,
  loading = false,
  error = null,
  searchable = true,
  onEdit,
  onDelete,
}: TableProps<T>) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editRow, setEditRow] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<T>>({});
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // ---- Filtering ----
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  // ---- Sorting ----
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = (a as any)[sortKey];
      const bValue = (b as any)[sortKey];

      if (aValue === bValue) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      return sortOrder === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });
  }, [filteredData, sortKey, sortOrder]);

  // ---- Pagination ----
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // ---- Handlers ----
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleEdit = (index: number, row: T) => {
    setEditRow(index);
    setEditData(row);
  };

  const handleSave = () => {
    if (onEdit && editRow !== null) {
      onEdit(editData as T);
    }
    setEditRow(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditRow(null);
    setEditData({});
  };

  // ---- States ----
  if (loading)
    return <TableSkeleton columns={columns.length} rows={pageSize} />;
  if (error)
    return <div className="w-full text-center py-6 text-red-500">{error}</div>;
  if (data.length === 0)
    return (
      <div className="w-full text-center py-6 text-gray-500">
        No data available.
      </div>
    );

  // ---- Visible Columns ----
  const visibleColumns = columns.filter((col) => !col.hidden);

  return (
    <div className="w-full">
      {/* Search */}
      {searchable && (
        <div className="flex items-center mb-3">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden sm:block border rounded-2xl shadow-md overflow-x-auto">
        <table className="min-w-full border-collapse text-center">
          <thead className="bg-white text-sm font-semibold text-gray-800 border-b">
            <tr>
              {visibleColumns.map((col) => (
                <th
                  key={col.key as string}
                  className="px-4 py-3 border-b cursor-pointer whitespace-nowrap hover:text-purple-600"
                  onClick={() => handleSort(col.key as string)}
                >
                  <div className="flex items-center justify-center gap-1">
                    {col.label}
                    <ArrowUpDown size={14} />
                  </div>
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-4 py-2 border-b whitespace-nowrap">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {paginatedData.map((row, i) => {
              const rowIndex = (page - 1) * pageSize + i;
              const isEditing = editRow === rowIndex;

              return (
                <tr
                  key={rowIndex}
                  className={`hover:bg-purple-50 transition-colors ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {visibleColumns.map((col) => {
                    const value = (row as any)[col.key];

                    if (isEditing && col.editable) {
                      return (
                        <td
                          key={col.key as string}
                          className="px-4 py-2 border-b"
                        >
                          <input
                            type="text"
                            defaultValue={value}
                            onChange={(e) =>
                              setEditData((prev) => ({
                                ...prev,
                                [col.key]: e.target.value,
                              }))
                            }
                            className="border border-gray-300 rounded px-2 py-1 text-sm w-full text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
                          />
                        </td>
                      );
                    }

                    return (
                      <td
                        key={col.key as string}
                        className="px-4 py-2 border-b"
                      >
                        {col.render ? col.render(value, row) : value ?? "-"}
                      </td>
                    );
                  })}

                  {(onEdit || onDelete) && (
                    <td className="px-4 py-2 border-b">
                      <div className="flex justify-center gap-3">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Save size={16} />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <>
                            {onEdit && (
                              <button
                                onClick={() => handleEdit(rowIndex, row)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Pencil size={16} />
                              </button>
                            )}
                            {onDelete && (
                              <button
                                onClick={() => onDelete(row)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden overflow-y-auto">
        <div className="flex flex-col gap-2 p-2">
          {paginatedData.map((row, i) => {
            const rowIndex = (page - 1) * pageSize + i;
            const isEditing = editRow === rowIndex;

            return (
              <div
                key={rowIndex}
                className="border rounded-lg p-3 shadow-sm bg-white flex flex-col"
              >
                {visibleColumns.map((col) => {
                  const value = (row as any)[col.key];

                  if (isEditing && col.editable) {
                    return (
                      <div
                        key={col.key as string}
                        className="flex justify-between items-center mb-2"
                      >
                        <span className="font-semibold">{col.label}:</span>
                        <input
                          type="text"
                          defaultValue={value}
                          onChange={(e) =>
                            setEditData((prev) => ({
                              ...prev,
                              [col.key]: e.target.value,
                            }))
                          }
                          className="border border-gray-300 rounded px-2 py-1 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                    );
                  }

                  return (
                    <div
                      key={col.key as string}
                      className="flex justify-between mb-1"
                    >
                      <span className="font-semibold">{col.label}:</span>
                      <span>
                        {col.render ? col.render(value, row) : value ?? "-"}
                      </span>
                    </div>
                  );
                })}

                {(onEdit || onDelete) && (
                  <div className="flex justify-end gap-3 mt-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        {onEdit && (
                          <button
                            onClick={() => handleEdit(rowIndex, row)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Pencil size={16} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
