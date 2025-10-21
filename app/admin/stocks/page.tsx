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
import { addStock, fetchStocks, selectStocks } from "@/slices/stockSlice";
import { Upload, Download, Plus } from "lucide-react";
import DownloadExcelButton from "@/components/ui/DownloadExcelButton";
import { IMPORT_STOCK_EXCEL, IMPORT_STOCK_SAMPLE_FILE } from "@/lib/constant";
import ImportButton from "@/components/ui/ImportButton";

export default function Stocks() {
  const dispatch = useDispatch<AppDispatch>();
  const { stocks, fetchStatus, error, refetchStocks } = useStocks();

  const { addStatus } = useSelector(selectStocks);

  const columns = useMemo(() => {
    if (!stocks || stocks.length === 0) return [];

    return Object.keys(stocks[0]).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      editable: true,
      hidden: key === "id" || key === "__v", // 👈 mark hidden
    }));
  }, [stocks]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = (row: any) => console.log("Edited:", row);
  const handleImport = () => console.log("Import clicked");
  const handleExport = () => console.log("Export clicked");

  const fields = [
    { name: "partName", label: "partName", type: "text", required: true },
    { name: "position", label: "position", type: "text", required: true },
    { name: "partCode", label: "partCode", type: "text", required: true },
    {
      name: "partCategoty",
      label: "partCategoty",
      type: "text",
      required: true,
    },
    { name: "partDesc", label: "partDesc", type: "text", required: true },

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

  const handleAddStock = async (
    payload: any,
    headers: Record<string, string>
  ) => {
    try {
      await dispatch(addStock({ payload, headers })).unwrap();
      refetchStocks();
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
        <h1 className="text-3xl font-extrabold text-gray-900">Stocks</h1>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <DownloadExcelButton
            url={`${IMPORT_STOCK_SAMPLE_FILE}`}
            filename="stock-sample.xlsx"
            label="Sample Excel"
          />
          {/* Import button - themed with light purple border */}
          <ImportButton
            endpoint={`${IMPORT_STOCK_EXCEL}`}
            acceptedTypes=".xlsx"
            onUploadSuccess={async () => {
              refetchStocks();
            }}
          />

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

      <Table
        data={stocks}
        columns={columns}
        pageSize={5}
        loading={false}
        onEdit={(updatedRow) => console.log("Edited:", updatedRow)}
        onDelete={(id) => console.log("Deleted ID:", id)}
      />

      {/* Modal with Form */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Add New Stock"
      >
        <Form
          fields={fields}
          onSubmit={(payload, headers) => {
            handleAddStock(payload, headers!); // call async function without await
          }}
          loading={addStatus === "loading"}
          error={addStatus === "failed" ? error : null}
        />
      </Modal>
    </div>
  );
}
