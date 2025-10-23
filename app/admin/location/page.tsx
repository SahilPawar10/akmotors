"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/providers/store";
import { Download, Plus } from "lucide-react";
import DownloadExcelButton from "@/components/ui/DownloadExcelButton";
import { IMPORT_STOCK_EXCEL, IMPORT_STOCK_SAMPLE_FILE } from "@/lib/constant";
import ImportButton from "@/components/ui/ImportButton";
import {
  addLocation,
  fetchLocation,
  selectLocation,
} from "@/slices/locationSlice";

export default function Location() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    fetchLocationStatus,
    addLocationStatus,
    error,
    data: location,
  } = useSelector(selectLocation);

  // Fetch on mount (always fetch for hard refresh)
  useEffect(() => {
    if (
      fetchLocationStatus === "idle" &&
      (!location || location.length === 0)
    ) {
      dispatch(fetchLocation());
    }
  }, [dispatch, fetchLocationStatus, location]);

  const columns = useMemo(() => {
    if (!location || location.length === 0) return [];

    return Object.keys(location[0]).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      editable: true,
      hidden: key === "id" || key === "__v", // 👈 mark hidden
    }));
  }, [location]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleExport = () => console.log("Export clicked");

  const fields = [
    { name: "villageName", label: "villageName", type: "text", required: true },
    { name: "region", label: "Region", type: "text", required: true },
    { name: "taluka", label: "Taluka", type: "text", required: true },
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

  const handleAddVehicle = async (
    payload: any,
    headers: Record<string, string>
  ) => {
    try {
      await dispatch(addLocation({ payload, headers })).unwrap();
      dispatch(fetchLocation());
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
        <h1 className="text-3xl font-extrabold text-gray-900">Locations</h1>

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
        data={location}
        columns={columns}
        pageSize={10}
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
            handleAddVehicle(payload, headers!); // call async function without await
          }}
          loading={addLocationStatus === "loading"}
          error={addLocationStatus === "failed" ? error : null}
        />
      </Modal>
    </div>
  );
}
