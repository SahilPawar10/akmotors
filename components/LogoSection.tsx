import React from "react";

const LogoSection: React.FC = () => {
  return (
    <div className="flex flex-col justify-center h-full">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to MyApp
      </h2>
      <p className="text-lg text-gray-600">
        MyApp is a modern platform for managing content, analytics, and more.
        Simple. Fast. Powerful.
      </p>
    </div>
  );
};

export default LogoSection;
