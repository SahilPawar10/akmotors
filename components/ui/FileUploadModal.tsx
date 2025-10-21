/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Button from "./Button";
import axios from "axios";
import axiosInstance from "@/lib/axiosInterceptor";

interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
  endpoint: string; // API URL
  acceptedTypes?: string; // e.g. ".csv,.xlsx,image/*"
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  open,
  onClose,
  endpoint,
  acceptedTypes = "*",
  onSuccess,
  onError,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axiosInstance.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess?.(res.data);
      onClose();
    } catch (err) {
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[400px] relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Upload File
        </h2>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-400 rounded-xl p-6 cursor-pointer hover:bg-purple-50 transition">
          <Upload className="h-8 w-8 text-purple-600 mb-2" />
          <span className="text-gray-600">
            {file ? file.name : "Click to choose a file"}
          </span>
          <input
            type="file"
            accept={acceptedTypes}
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-600"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleUpload}
            disabled={!file || loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
