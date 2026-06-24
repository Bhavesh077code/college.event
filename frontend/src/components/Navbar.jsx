import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Compass, Plus, User, LogOut, Menu, X } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navItems = [
    { icon: Home, label: "Feed", path: "/feed" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: Plus, label: "Create", path: "/create-post" },
    { icon: User, label: "Profile", path: `/profile/${userId}` },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/feed")}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          >
            <h1 className="text-2xl font-bold text-blue-500">🎬 G-Connect</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                >
                  <Icon size={20} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}

            <div className="flex items-center gap-4 pl-4 border-l border-gray-700">
              <span className="text-gray-300 text-sm">{username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                <LogOut size={16} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800">
            <div className="space-y-2 mb-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded transition"
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-gray-700 pt-4 px-4 space-y-2">
              <p className="text-gray-300 text-sm">{username}</p>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
