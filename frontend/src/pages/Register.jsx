import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import HomeNavbar from "../components/HomeNavbar";
import BASE_URL from "../api";

// Same mini logo
const GLogo = () => (
  <svg width="72" height="72" viewBox="0 0 400 310" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8A2BE2"/>
        <stop offset="50%" stopColor="#FF006E"/>
        <stop offset="100%" stopColor="#00D4FF"/>
      </linearGradient>
    </defs>
    <circle cx="200" cy="155" r="125" fill="url(#gGrad2)"/>
    <g transform="translate(12,0)">
      <path d="M 248 107 A 68 68 0 1 0 248 203 C 182 203 178 132 225 130" fill="none" stroke="white" strokeWidth="22" strokeLinecap="round"/>
      <circle cx="225" cy="130" r="14" fill="white"/>
    </g>
  </svg>
);

export default function Register() {
  const [flash, setFlash] = useState({ type: "", message: "" });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value }));
  };

  const handelSubmit = async () => {
    if (!formData.username ||!formData.email ||!formData.password) {
      setFlash({ type: "error", message: "All fields are required!" });
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/user/register`, formData, { headers: { "Content-Type": "application/json" } });
      if (res.data.success) {
        setFlash({ type: "success", message: "🎉 Registered Successfully!" });
        setTimeout(() => navigate("/login"), 1800);
      }
    } catch (error) {
      setFlash({ type: "error", message: error.response?.data?.message || "❌ Something went wrong!" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <HomeNavbar />

      {/* Glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-20 right-10 w-72 h-72 bg-pink-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

            <div className="flex flex-col items-center">
              <GLogo />
              <h1 className="text-3xl font-extrabold mt-4 tracking-tight">
                Join G<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">-Connect</span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">Create your account</p>
            </div>

            {flash.message && (
              <div className={`mt-6 px-4 py-2.5 rounded-xl text-sm text-center font-medium
                ${flash.type === "success"
                 ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                {flash.message}
              </div>
            )}

            <div className="mt-7 space-y-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handelChange}
                placeholder="Username"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handelChange}
                placeholder="Email"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
              />
              <div className="relative">
                <input
                  type={showPassword? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handelChange}
                  placeholder="Password"
                  className="w-full px-4 py-3.5 pr-11 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  {showPassword? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                onClick={handelSubmit}
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 transition hover:scale-[1.02] disabled:opacity-60"
              >
                {isLoading? <><Loader2 className="h-5 w-5 animate-spin" /> Creating...</> : "Sign up"}
              </button>
            </div>

            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-xs text-gray-500">OR</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium flex items-center justify-center gap-2 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/></svg>
              Sign up with Google
            </button>

            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">Log in</Link>
            </p>
          </div>

          <p className="text-center text-gray-600 text-xs mt-6">© 2026 G-Connect</p>
        </div>
      </div>
    </div>
  );
}