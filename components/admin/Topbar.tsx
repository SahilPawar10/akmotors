"use client";
import { Menu } from "lucide-react";

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Mobile menu button */}
      <button
        className="sm:hidden p-2 rounded hover:bg-gray-100"
        onClick={onMenuClick}
      >
        <Menu className="w-6 h-6" />
      </button>

      <h1 className="text-xl font-semibold">Admin Panel</h1>
      {/* Right-side items */}
      <div></div>
    </div>
  );
}
