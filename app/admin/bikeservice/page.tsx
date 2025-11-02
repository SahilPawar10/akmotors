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
import Loader from "@/components/ui/Loader";
import DownloadExcelButton from "@/components/ui/DownloadExcelButton";
import { IMPORT_STOCK_EXCEL, IMPORT_STOCK_SAMPLE_FILE } from "@/lib/constant";
import ImportButton from "@/components/ui/ImportButton";
import {
  addServiceEntry,
  fetchServiceEntries,
  selectedServices,
} from "@/slices/serviceSlice";
import { useVehical } from "@/hooks/useVehical";
import { useLocation } from "@/hooks/useLocation";

export default function BikeService() {
  const dispatch = useDispatch<AppDispatch>();

  const { vehicals, fetchStatus, refetchVehicals } = useVehical();
  const { location, fetchLocationStatus } = useLocation();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    fetchServiceStatus,
    addServiceStatus,
    error,
    data: serviceData,
  } = useSelector(selectedServices);

  // Fetch on mount (always fetch for hard refresh)
  useEffect(() => {
    // Fetch only if data not available or not already fetched
    if (
      fetchServiceStatus === "idle" &&
      (!serviceData || serviceData.length === 0)
    ) {
      dispatch(fetchServiceEntries());
    }
  }, [dispatch, fetchServiceStatus, serviceData]);

  const columns = useMemo(() => {
    if (!serviceData || serviceData.length === 0) return [];

    return Object.keys(serviceData[0]).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      editable: false,
      hidden: key === "id" || key === "__v", // 👈 mark hidden
    }));
  }, [serviceData]);

  const fields: any = [
    { name: "serviceDate", label: "serviceDate", type: "date", required: true },
    {
      name: "ownerName",
      label: "Customer Name",
      type: "searchable", // must match the literal union
      searchable: {
        data: vehicals,
        labelKey: "ownerName",
        valueKey: "id",
        fillFields: {
          bikeName: "vehicalName",
          ownerNo: "ownerNo",
          vehicleNo: "vehicleNo",
          location: "location",
        },
      },
    },
    { name: "bikeName", label: "Bike Name", type: "text", required: true },
    { name: "ownerNo", label: "Owner No", type: "text", required: true },
    { name: "vehicleNo", label: "Vehicle No", type: "text", required: true },
    {
      name: "location",
      label: "Location",
      type: "searchable", // must match the literal union
      searchable: {
        data: location,
        labelKey: "villageName",
        valueKey: "id",
        fillFields: {
          location: "villageName",
        },
      },
    },
    // {
    //   name: "location",
    //   label: "location",
    //   type: "select",
    //   required: true,
    //   options:
    //     location?.map((l: any) => ({
    //       label: l.villageName,
    //       value: l.villageName,
    //     })) || [],
    // },
    { name: "partUsed", label: "partUsed", type: "text", required: true },
    { name: "partPrice", label: "partPrice", type: "text", required: true },
    {
      name: "labourCharge",
      label: "labourCharge",
      type: "text",
      required: true,
    },
    { name: "serviceType", label: "serviceType", type: "text", required: true },
  ] as const;

  const handleServiceEntry = async (
    payload: any,
    headers: Record<string, string>
  ) => {
    try {
      await dispatch(addServiceEntry({ payload, headers })).unwrap();
      dispatch(fetchServiceEntries());
      setIsFormOpen(false);
      console.log("Stock added successfully");
    } catch (err) {
      console.error("Failed to add stock:", err);
    }
  };

  const handleExport = () => console.log("Export clicked");

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3 border-b border-gray-200 pb-4">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900">Bike Services</h1>

        {/* Action buttons */}
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
            // onUploadSuccess={async () => {
            //   refetchStocks();
            // }}
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

      {fetchServiceStatus === "loading" ? (
        <Loader size={24} />
      ) : (
        <Table
          data={serviceData}
          columns={columns}
          pageSize={10}
          loading={false}
          // onEdit={(updatedRow) => console.log("Edited:", updatedRow)}
          // onDelete={(id) => console.log("Deleted ID:", id)}
        />
      )}

      {/* Modal with Form */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="New Service"
      >
        <Form
          fields={fields}
          onSubmit={(payload, headers) => {
            handleServiceEntry(payload, headers!); // call async function without await
          }}
          loading={addServiceStatus === "loading"}
          error={addServiceStatus === "failed" ? error : null}
        />
      </Modal>
    </div>
  );
}
