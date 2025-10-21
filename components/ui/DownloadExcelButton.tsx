/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import axios from "axios";
import { Download, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button"; // adjust this import to your project
import axiosInstance from "@/lib/axiosInterceptor";

interface DownloadExcelButtonProps {
  url: string; // API endpoint
  filename?: string; // default: export.xlsx
  params?: Record<string, any>; // query params (optional)
  label?: string; // button label
  headers?: Record<string, string>; // optional headers
}

const DownloadExcelButton: React.FC<DownloadExcelButtonProps> = ({
  url,
  filename = "export.xlsx",
  params = {},
  label = "Download Excel",
  headers = {},
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(url, {
        params,
        headers,
        responseType: "blob",
      });

      // Validate response type (optional but safe)
      const contentType = response.headers["content-type"];
      if (
        !contentType?.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
      ) {
        throw new Error("Invalid file type received from the server");
      }

      // Create a blob for the Excel file
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Free memory
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error: any) {
      console.error("Excel download failed:", error);
      alert(error?.message || "Failed to download Excel file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      className="bg-white text-purple-600 border border-purple-300 hover:bg-purple-50"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Downloading...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          {label}
        </>
      )}
    </Button>
  );
};

export default DownloadExcelButton;
