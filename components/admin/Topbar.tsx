import { Bell, Moon, Search, ShoppingCart, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3 sticky top-0 z-10">
      {/* Search bar */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2 w-72">
        <Search className="text-gray-400" size={18} />
        <input
          placeholder="Search for results..."
          className="bg-transparent outline-none flex-1 text-sm"
        />
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <User className="text-gray-700" size={18} />
        </div>
      </div>
    </header>
  );
}
