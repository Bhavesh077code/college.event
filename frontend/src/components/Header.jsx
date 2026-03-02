
/*
import React, { useEffect, useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);

  // 🔹 Load admin from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedAdmin = localStorage.getItem("admin");

    if (!token) {
      // ❌ Agar token nahi hai to login pe bhejo
      navigate("/login");
      return;
    }

    if (storedAdmin) {
      try {
       const adminData = JSON.parse(storedAdmin);
        //setAdmin(JSON.parse(storedAdmin));
        setAdmin(adminData);
      } catch (err) {
        console.error("Invalid admin data", err);
        setAdmin(null);
        localStorage.removeItem("admin");
      }
    }
  }, [navigate]);

  // 🔴 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow">
      
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold">
          K
        </div>
        <h1 className="font-semibold text-lg">KIT Events</h1>
      </div>

    
      <div className="flex items-center gap-4 text-sm">
        
        <button className="p-2 hover:bg-gray-100 rounded-full bg-amber-300">
          <Bell size={20} />
        </button>

        
        <span className="px-4 py-1 bg-gray-100 rounded-full font-medium">
          Admin: {admin?.email || "Loading..."}
        </span>

       
        <button
          onClick={handleLogout}
          className="px-3 py-2 text-white rounded-full bg-red-600 hover:bg-red-700"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

*/

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
    <header className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 bg-white shadow flex-nowrap">
      //Logo 
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold">
          K
        </div>
        <h1 className="font-semibold text-lg sm:text-xl truncate">
          KIT Events
        </h1>
      </div>

      // Right Section 
      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        //Notification 
        <button className="p-2 hover:bg-gray-100 rounded-full bg-amber-300 flex-shrink-0">
          <Bell size={20} />
        </button>

        // Admin Info 
        <span className="px-3 py-1 bg-gray-100 rounded-full font-medium truncate max-w-[120px] sm:max-w-xs text-center">
          Admin: {admin?.email || "Loading..."}
        </span>

        // Logout 
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
          K
        </div>
        <h1 className="font-semibold text-lg sm:text-xl truncate">
          KIT Events
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 min-w-0">
        {/* Notification */}
        <button className="p-2 hover:bg-gray-100 rounded-full bg-amber-300 flex-shrink-0 relative">
          <Bell size={20} />
          {/* Optional: badge */}
        </button>

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

