// components/ui/Loader.tsx
import React from "react";

const Loader = ({ size = 24 }: { size?: number }) => {
  return (
    <div
      className="inline-block animate-spin rounded-full border-4 border-t-transparent border-purple-600"
      style={{ width: size, height: size }}
    />
  );
};

export default Loader;
