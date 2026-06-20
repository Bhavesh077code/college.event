/*
import React, { useEffect, useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedAdmin = localStorage.getItem("admin");

    if (!token) {
      navigate("/login");
      return;
    }

    if (storedAdmin) {
      try {
        const adminData = JSON.parse(storedAdmin);
        setAdmin(adminData);
      } catch (err) {
        console.error("Invalid admin data", err);
        setAdmin(null);
        localStorage.removeItem("admin");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <header className="flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-6 md:px-8 py-3 bg-white shadow">

      <div className="flex items-center gap-2 flex-shrink-0 mb-2 sm:mb-0">
        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold">
          K
        </div>
        <h1 className="font-semibold text-lg sm:text-xl truncate">
          KIT Events
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 min-w-0">
        <div className="flex items-center gap-2 sm:gap-3 text-sm flex-shrink-0">
    
          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="p-2 hover:bg-gray-100 rounded-full bg-amber-300 relative flex-shrink-0"
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

      
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 max-w-[90vw] bg-white shadow-lg rounded-lg overflow-hidden z-50">
                {notifications.length === 0 ? (
                  <p className="p-3 text-sm text-gray-500">No notifications</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 border-b last:border-b-0"
                    >
                      {notif.title}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>


          <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full font-medium truncate max-w-[100px] sm:max-w-xs text-center">
            Admin: {admin?.email || "Loading..."}
          </span>


          <button
            onClick={handleLogout}
            className="px-3 py-2 text-white rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center flex-shrink-0"
          >
            <LogOut size={18} />
          </button>
        </div>
    </header>
  );
};

*/

import React, { useEffect, useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]); // Example notifications

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedAdmin = localStorage.getItem("admin");

    if (!token) {
      navigate("/login");
      return;
    }

    if (storedAdmin) {
      try {
        const adminData = JSON.parse(storedAdmin);
        setAdmin(adminData);
      } catch (err) {
        console.error("Invalid admin data", err);
        setAdmin(null);
        localStorage.removeItem("admin");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <header className="flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-6 md:px-8 py-3 bg-white shadow">
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0 mb-2 sm:mb-0">
        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold">
          E
        </div>
        <h1 className="font-semibold text-lg sm:text-xl truncate">
          Event Management
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3 text-sm flex-shrink-0">
        {/* Bell Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="p-2 hover:bg-gray-100 rounded-full bg-amber-300 relative flex-shrink-0"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 max-w-[90vw] bg-white shadow-lg rounded-lg overflow-y-auto max-h-64 z-50 transition-all">
              {notifications.length === 0 ? (
                <p className="p-3 text-sm text-gray-500">No notifications</p>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 border-b last:border-b-0"
                  >
                    {notif.title}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Admin Info */}
        <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full font-medium truncate max-w-[100px] sm:max-w-xs text-center">
          Admin: {admin?.email || "Loading..."}
        </span>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-3 py-2 text-white rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center flex-shrink-0"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

