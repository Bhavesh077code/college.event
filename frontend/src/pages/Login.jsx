

import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom'; // <-- Use Link
import axios from "axios";
import HomeNavbar from "../components/HomeNavbar";
import BASE_URL from "../api";

export default function Login() {
  const [flash, setFlash] = useState({ type: "", message: "" });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post(
        `${BASE_URL}/user/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      let role = null;
      if (res.data.admin) role = res.data.admin.role;
      if (res.data.user) role = res.data.user.role;

      if (res.data.success && role) {
        localStorage.setItem("role", role);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("admin", JSON.stringify(res.data.admin));

        setFlash({ type: "success", message: "🎉 Login Successfully!" });

        setTimeout(() => {
          if (role === "admin") {
            navigate("/admindashboard", { replace: true });
          } else {
            navigate("/userdashboard", { replace: true });
            localStorage.setItem("user", JSON.stringify(res.data.user));
          }
        }, 1500);
      }

    } catch (error) {
      setFlash({
        type: "error",
        message: error.response?.data?.message || "Login failed"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      {/* NAVBAR */}
      <HomeNavbar />

      {/* Center Container */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all">

          {/* Fixed back link */}
          <Link className="text-sm text-gray-500 hover:text-indigo-600" to="/register">
            🔙 Back
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mt-4">
            Welcome Back!
          </h1>

          <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
            Login to continue
          </p>

          {flash.message && (
            <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium
              ${flash.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"}`}>
              {flash.message}
            </div>
          )}

          {/* Email */}
          <label className="block mb-1 font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handelChange}
            placeholder="event@college.com"
            className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />

          {/* Password */}
          <label className="block mb-1 font-semibold text-gray-700">
            Password
          </label>

          <div className="relative w-full mb-6">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handelChange}
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handelSubmit}
            className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-white" />
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline font-medium">
              Register
            </Link>
          </p>

          <p className="text-center text-gray-400 text-xs mt-6">
            © 2026 KIT College. All rights reserved.
          </p>

        </div>
      </div>
    </div>
  );
}