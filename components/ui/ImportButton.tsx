import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Upload } from "lucide-react";
import FileUploadModal from "@/components/ui/FileUploadModal";

interface ImportButtonProps {
  endpoint: string; // API endpoint for file upload
  acceptedTypes?: string; // Optional accepted file types
  onUploadSuccess?: () => void; // Callback to run after successful upload
  buttonLabel?: string; // Optional custom button label
}

const ImportButton: React.FC<ImportButtonProps> = ({
  endpoint,
  acceptedTypes = "*",
  onUploadSuccess,
  buttonLabel = "Import",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        icon={<Upload className="h-4 w-4" />}
        onClick={() => setOpen(true)}
        className="bg-white text-purple-600 border border-purple-300 hover:bg-purple-50"
      >
        {buttonLabel}
      </Button>

      <FileUploadModal
        open={open}
        onClose={() => setOpen(false)}
        endpoint={endpoint}
        acceptedTypes={acceptedTypes}
        onSuccess={onUploadSuccess} // Dynamic callback
      />
    </>
  );
};

export default ImportButton;
