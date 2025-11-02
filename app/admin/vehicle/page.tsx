"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/providers/store";
import { fetchStocksEntries, addStockEntry } from "@/slices/stockEntrySlice";
import { Upload, Download, Plus } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { useVehical } from "@/hooks/useVehical";
import { addVehicleEntry, selectVehicles } from "@/slices/vehicleSlice";
import { useLocation } from "@/hooks/useLocation";

export default function Vehical() {
  const dispatch = useDispatch<AppDispatch>();
  const { vehicals, fetchStatus, refetchVehicals } = useVehical();
  const { location, fetchLocationStatus } = useLocation();

  const { addVehicleStatus, error } = useSelector(selectVehicles);

  const columns = useMemo(() => {
    if (!vehicals || vehicals.length === 0) return [];

    return Object.keys(vehicals[0]).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      editable: true,
      hidden: key === "id" || key === "__v", // 👈 mark hidden
    }));
  }, [vehicals]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleImport = () => console.log("Import clicked");
  const handleExport = () => console.log("Export clicked");

  const fields = [
    { name: "name", label: "Vehical Name", type: "name", required: true },
    { name: "ownerNo", label: "ownerNo", type: "text", required: true },
    { name: "ownerName", label: "ownerName", type: "text", required: true },
    {
      name: "registrationNumber",
      label: "Vehicle No",
      type: "text",
      required: true,
    },
    {
      name: "location",
      label: "Location",
      type: "select",
      required: true,
      options:
        location?.map((s: any) => ({
          label: s.villageName,
          value: s.villageName,
        })) || [],
    },
  ] as any;

  const handleAddVehicalEntry = async (
    payload: any,
    headers: Record<string, string>
  ) => {
    try {
      await dispatch(addVehicleEntry({ payload, headers })).unwrap();
      refetchVehicals();
      setIsFormOpen(false);
    } catch (err) {
      console.error("Failed to add stock:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3 border-b border-gray-200 pb-4">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900">Vehicles</h1>

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

      {fetchStatus === "loading" ? (
        <Loader size={24} />
      ) : (
        <Table
          data={vehicals}
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
        title="Add New Vehicle"
      >
        <Form
          fields={fields}
          onSubmit={(payload, headers) => {
            handleAddVehicalEntry(payload, headers!); // call async function without await
          }}
          loading={addVehicleStatus === "loading"}
          error={addVehicleStatus === "failed" ? error : null}
        />
      </Modal>
    </div>
  );
}
