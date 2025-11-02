/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Menu, User, LogOut, Settings } from "lucide-react";

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [user, setUser] = useState<any>(null);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [openMenu, setOpenMenu] = useState(false);
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    // ✅ Load user from localStorage
    const storedUser = localStorage.getItem("swarajya-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }

    // ✅ Set greeting & time
    const updateTimeAndGreeting = () => {
      const now = new Date();
      const hours = now.getHours();

      // Greeting with emoji
      if (hours >= 5 && hours < 12) {
        setGreeting("Good Morning 🌅 ");
      } else if (hours >= 12 && hours < 17) {
        setGreeting("Good Afternoon 🌞 ");
      } else if (hours >= 17 && hours < 21) {
        setGreeting("Good Evening 🌇 ");
      } else {
        setGreeting("Good Night 🌙 ");
      }

      // Formatted time
      setCurrentDateTime(
        now.toLocaleString("en-IN", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTimeAndGreeting();
    const timer = setInterval(updateTimeAndGreeting, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("swarajya-user");
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md relative">
      {/* Mobile menu button */}
      <button
        className="sm:hidden p-2 rounded hover:bg-gray-100"
        onClick={onMenuClick}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Left title */}
      <h1 className="text-xl font-semibold">Admin Panel</h1>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Greeting & time */}
        <div className="hidden sm:flex flex-col items-end text-sm">
          {user && (
            <span className="font-medium text-gray-800">
              {greeting}. {user.firstName} {user.lastName}!
            </span>
          )}
          <span className="text-gray-500">{currentDateTime}</span>
        </div>

        {/* Profile dropdown */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-800">
                {user.firstName}
              </span>
            </button>

            {/* Dropdown menu */}
            {openMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-1 z-10">
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => alert("Profile clicked")}
                >
                  <User className="w-4 h-4 mr-2" /> Profile
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => alert("Settings clicked")}
                >
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <span className="text-gray-500 text-sm">No user logged in</span>
        )}
      </div>
    </div>
  );
}
