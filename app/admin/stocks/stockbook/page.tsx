"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/providers/store";
import { Upload, Download, Plus } from "lucide-react";
import { fetchStockBook, selectStocks } from "@/slices/stockSlice";

// const users = [
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
// ];

export default function StockEntryBook() {
  const dispatch = useDispatch<AppDispatch>();

  const { fetchBookStatus, bookData } = useSelector(selectStocks);

  // Fetch on mount (always fetch for hard refresh)
  useEffect(() => {
    // Fetch only if data not available or not already fetched
    if (fetchBookStatus === "idle" && (!bookData || bookData.length === 0)) {
      dispatch(fetchStockBook());
    }
  }, [dispatch, fetchBookStatus, bookData]);

  const columns = useMemo(() => {
    if (!bookData || bookData.length === 0) return [];

    return Object.keys(bookData[0]).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      editable: false,
      hidden: key === "id" || key === "__v", // 👈 mark hidden
    }));
  }, [bookData]);

  const handleExport = () => console.log("Export clicked");

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3 border-b border-gray-200 pb-4">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900">Stock Book</h1>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Export button - same theme */}
          <Button
            icon={<Download className="h-4 w-4" />}
            onClick={handleExport}
            className="bg-white text-purple-600 border border-purple-300 hover:bg-purple-50"
          >
            Export
          </Button>
        </div>
      </div>

      <Table
        data={bookData}
        columns={columns}
        pageSize={10}
        loading={false}
        // onEdit={(updatedRow) => console.log("Edited:", updatedRow)}
        // onDelete={(id) => console.log("Deleted ID:", id)}
      />
    </div>
  );
}
