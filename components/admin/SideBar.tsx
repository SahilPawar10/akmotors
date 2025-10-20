"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  Bike,
  VectorSquare,
  Wrench,
  MapPinned,
  Wallet,
  WalletCards,
  ChevronDown,
} from "lucide-react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="w-64 h-screen flex flex-col py-8 bg-gradient-to-b from-[#7E57C2] via-[#6A5AE0] to-[#5C6BC0] text-white shadow-lg">
      {/* Logo */}
      <div className="text-2xl font-bold text-center mb-8">AK MOTORS</div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 px-4">
        {/* <SidebarLink
          href="/admin"
          icon={<LayoutDashboard className="w-5 h-5" />}
          label="Dashboard"
          active={pathname === "/admin"}
        /> */}

        <SidebarDropdown
          icon={<LayoutDashboard className="w-5 h-5" />}
          label="Dashboard"
          isOpen={openMenu === "dashboard"}
          onClick={() => toggleMenu("dashboard")}
          items={[
            { label: "AK Motors", href: "/admin" },
            { label: "Anuj Automobiles", href: "/admin/automobiles" },
          ]}
          pathname={pathname!}
        />
        <SidebarDropdown
          icon={<VectorSquare className="w-5 h-5" />}
          label="Stocks"
          isOpen={openMenu === "stocks"}
          onClick={() => toggleMenu("stocks")}
          items={[
            { label: "Stocks", href: "/admin/stocks" },
            { label: "Stock Entries", href: "/admin/stocks/stockentry" },
          ]}
          pathname={pathname!}
        />

        <SidebarLink
          href="/admin/bikeservice"
          icon={<Wrench className="w-5 h-5" />}
          label="Bike-Service"
          active={pathname === "/admin/bikeservice"}
        />

        <SidebarLink
          href="/admin/vehicle"
          icon={<Bike className="w-5 h-5" />}
          label="Vehicles"
          active={pathname === "/admin/vehicle"}
        />

        <SidebarLink
          href="/admin/location"
          icon={<MapPinned className="w-5 h-5" />}
          label="Locations"
          active={pathname === "/admin/location"}
        />

        <SidebarDropdown
          icon={<Wallet className="w-5 h-5" />}
          label="Credits"
          isOpen={openMenu === "credits"}
          onClick={() => toggleMenu("credits")}
          items={[
            { label: "Anuj Automobiles", href: "/admin/credits/anuj" },
            { label: "Ak Motors", href: "/admin/credits/akmotors" },
          ]}
          pathname={pathname!}
        />

        <SidebarDropdown
          icon={<WalletCards className="w-5 h-5" />}
          label="Debits"
          isOpen={openMenu === "debits"}
          onClick={() => toggleMenu("debits")}
          items={[
            { label: "Anuj Automobiles", href: "/admin/debits/anuj" },
            { label: "Ak Motors", href: "/admin/debits/akmotors" },
          ]}
          pathname={pathname!}
        />

        <SidebarLink
          href="/admin/users"
          icon={<Users className="w-5 h-5" />}
          label="Users"
          active={pathname === "/admin/users"}
        />

        <SidebarLink
          href="/admin/settings"
          icon={<Settings className="w-5 h-5" />}
          label="Settings"
          active={pathname === "/admin/settings"}
        />
      </nav>

      {/* Footer */}
      <div className="mt-auto text-xs text-white/60 text-center mb-4">
        © 2025 AK Motors
      </div>
    </aside>
  );
}

/* 🔹 Sidebar Link */
function SidebarLink({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
        active
          ? "bg-white text-purple-700 shadow-md"
          : "text-white/90 hover:text-white hover:bg-white/10"
      }`}
    >
      <div
        className={`w-5 h-5 ${
          active ? "text-purple-700" : "text-white/90"
        } transition-colors`}
      >
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

/* 🔹 Dropdown Component */
function SidebarDropdown({
  icon,
  label,
  items,
  isOpen,
  onClick,
  pathname,
}: {
  icon: React.ReactNode;
  label: string;
  items: { label: string; href: string }[];
  isOpen: boolean;
  onClick: () => void;
  pathname: string;
}) {
  // 🔹 Check if any submenu item matches current path
  const isActive = items.some((item) => pathname.startsWith(item.href));

  return (
    <div>
      <button
        onClick={onClick}
        className={`flex items-center justify-between w-full p-3 rounded-lg transition-all ${
          isActive
            ? "bg-white text-purple-700 shadow-md"
            : "text-white/90 hover:text-white hover:bg-white/10"
        }`}
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          } ${isActive ? "text-purple-700" : "text-white/90"}`}
        />
      </button>

      {isOpen && (
        <div className="ml-9 mt-1 flex flex-col space-y-1">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm rounded-md py-2 px-3 transition-all ${
                  active
                    ? "bg-white text-purple-700 shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
