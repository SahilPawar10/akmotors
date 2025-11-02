"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/providers/store";
import { useStocks } from "@/hooks/useStocks";
import {
  selectStocksEntry,
  fetchStocksEntries,
  addStockEntry,
} from "@/slices/stockEntrySlice";
import { Upload, Download, Plus } from "lucide-react";
import Loader from "@/components/ui/Loader";

export default function StockEntry() {
  const dispatch = useDispatch<AppDispatch>();
  const { stocks } = useStocks();

  const {
    addStockEntryStatus,
    fetchEntryStatus,
    data: stockEntries,
    error,
  } = useSelector(selectStocksEntry);

  // Fetch on mount (always fetch for hard refresh)
  useEffect(() => {
    if (
      fetchEntryStatus === "idle" &&
      (!stockEntries || stockEntries.length === 0)
    ) {
      dispatch(fetchStocksEntries());
    }
  }, [dispatch, fetchEntryStatus, stockEntries]);

  const columns = useMemo(() => {
    if (!stockEntries || stockEntries.length === 0) return [];

    return Object.keys(stockEntries[0]).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      editable: true,
      hidden: key === "id" || key === "__v", // 👈 mark hidden
    }));
  }, [stockEntries]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleImport = () => console.log("Import clicked");
  const handleExport = () => console.log("Export clicked");

  const fields = [
    { name: "date", label: "Date", type: "date", required: true },
    {
      name: "stock",
      label: "Stock",
      type: "select",
      required: true,
      options:
        stocks?.map((s: any) => ({ label: s.partName, value: s.id })) || [],
    },
    { name: "overAllPaid", label: "paidAmount", type: "text", required: true },
    { name: "quantity", label: "Quantity", type: "text", required: true },
    {
      name: "buyingpriceperQty",
      label: "PricePerQty",
      type: "text",
      required: true,
    },
    {
      name: "sellingpriceperQty",
      label: "Selling Price",
      type: "text",
      required: true,
    },

    // {
    //   name: "role",
    //   label: "Role",
    //   type: "select",
    //   options: [
    //     { label: "Admin", value: "admin" },
    //     { label: "User", value: "user" },
    //   ],
    // },
    // { name: "partImage", label: "partImage", type: "file" },
  ] as any;

  const handleAddStockEntry = async (
    payload: any,
    headers: Record<string, string>
  ) => {
    try {
      await dispatch(addStockEntry({ payload, headers })).unwrap();
      dispatch(fetchStocksEntries());
      setIsFormOpen(false);
      console.log("Stock added successfully");
    } catch (err) {
      console.error("Failed to add stock:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3 border-b border-gray-200 pb-4">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900">Stock Entry</h1>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Import button - themed with light purple border */}
          <Button
            icon={<Upload className="h-4 w-4" />}
            onClick={handleImport}
            className="bg-white text-purple-600 border border-purple-300 hover:bg-purple-50"
          >
            Import
          </Button>

          {/* Export button - same theme */}
          <Button
            icon={<Download className="h-4 w-4" />}
            onClick={handleExport}
            className="bg-white text-purple-600 border border-purple-300 hover:bg-purple-50"
          >
            Export
          </Button>

          {/* Add Single button - primary purple */}
          <Button
            icon={<Plus className="h-4 w-4" />}
            onClick={() => setIsFormOpen(true)}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            Add Single
          </Button>
        </div>
      </div>

      {fetchEntryStatus === "loading" ? (
        <Loader size={24} />
      ) : (
        <Table
          data={stockEntries}
          columns={columns}
          pageSize={10}
          loading={false}
          onEdit={(updatedRow) => console.log("Edited:", updatedRow)}
          onDelete={(id) => console.log("Deleted ID:", id)}
        />
      )}

      {/* Modal with Form */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Add New Stock"
      >
        <Form
          fields={fields}
          onSubmit={(payload, headers) => {
            handleAddStockEntry(payload, headers!); // call async function without await
          }}
          loading={addStockEntryStatus === "loading"}
          error={addStockEntryStatus === "failed" ? error : null}
        />
      </Modal>
    </div>
  );
}
