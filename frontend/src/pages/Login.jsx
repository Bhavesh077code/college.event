
import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Register() {
  const [flash, setFlash] = useState({
    type: "",
    message: ""
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev =>
    ({
      ...prev,
      [name]: value
    }));
  };

  const handelSubmit = async () => {
    try {
      setIsLoading(true);
      console.log(formData)
      
      const res = await axios.post(
        "http://localhost:8000/user/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true // ✅ cookie allow
        }
      );
      // check console
      console.log("LOGIN RESPONSE:", res.data);
    console.log(localStorage.getItem("token"));
   


      let role = null;
      if (res.data.admin) role = res.data.admin.role;
      if (res.data.user) role = res.data.user.role;

      if (res.data.success && role) {
        // ✅ save auth info
        
        localStorage.setItem("role", role);
        localStorage.setItem('adminToken', res.data.token);

        setFlash({
          type: "success",
          message: "🎉 Login Successfully!"
        });

        setTimeout(() => {
          if (role === "admin") {
            navigate("/admindashboard", { replace: true });
          } else {
            navigate("/userdashboard", { replace: true });
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
    <div className="min-h-screen flex items-center justify-center   from-indigo-100 via-white to-purple-100">
      <div className="w-full max-w-md space-y-4 bg-white rounded-2xl shadow-2xl p-8">
        <a className="top-10 ml-1.5 bg-transparent rounded-lg " href="/register">🔙</a>

        <h1 className="text-3xl font-bold   text-center text-indigo-700 mb-2">
          Welcome to KIT College
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Register to continue
        </p>

        {flash.message && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium
            ${flash.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"}`}>
            {flash.message}
          </div>
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handelChange}
          placeholder="Email Address"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handelChange}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <button
          onClick={handelSubmit}
          className="w-full py-3 rounded-lg bg-green-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 transition"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-white" />
              <span>Creating account...</span>
            </>
          ) : (
            "Register"
          )}
        </button>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline font-medium">
            Register
          </a>
        </p>

        <p className="text-center text-gray-400 text-sm mt-6">
          © 2026 KIT College. All rights reserved.
        </p>
      </div>
    </div>
  );
}
