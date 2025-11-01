"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/admin/SideBar";
import Topbar from "@/components/admin/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // ✅ Check for access token in localStorage
    const token = localStorage.getItem("access_token");
    if (!token) {
      // Redirect unauthenticated users
      router.replace("/sign-in");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <div className="hidden sm:flex sm:flex-col w-64 h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative w-64 h-full bg-gradient-to-b from-[#7E57C2] via-[#6A5AE0] to-[#5C6BC0] text-white shadow-lg">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
