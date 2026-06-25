import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Compass,
  Plus,
  User,
  LogOut,
  Moon,
  Sun,
  Bell,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import connect from "../assets/connect.png";

export default function Navbar() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const [profileOpen, setProfileOpen] = useState(false);

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


  return (
    <>
      <nav
        className={`sticky top-0 z-50 border-b ${
          isDark
            ? "bg-gray-950 border-gray-800"
            : "bg-white border-gray-200"
        }`}
      >

        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">

          <div className="h-16 flex items-center justify-between">


            {/* Logo */}

            <div
              onClick={() => navigate("/feed")}
              className="flex items-center gap-2 cursor-pointer"
            >

              <img
                src={connect}
                alt="logo"
                className="w-9 h-9 rounded-xl object-cover"
              />

              <h1
                className={`font-bold text-base sm:text-lg ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                G-Connect
              </h1>

            </div>



            {/* Desktop Menu */}

            <div
              className="
              hidden md:flex
              absolute left-1/2
              -translate-x-1/2
              items-center gap-5
              "
            >

              <button
                onClick={() => navigate("/feed")}
                className="flex items-center gap-1 text-sm"
              >
                <Home size={18}/>
                Feed
              </button>


              <button
                onClick={() => navigate("/explore")}
                className="flex items-center gap-1 text-sm"
              >
                <Compass size={18}/>
                Explore
              </button>


              <button
                onClick={() => navigate("/create-post")}
                className="flex items-center gap-1 text-sm"
              >
                <Plus size={18}/>
                Create
              </button>


              <button
                onClick={() => navigate("/notifications")}
                className="relative flex items-center gap-1 text-sm"
              >

                <Bell size={18}/>

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] rounded-full px-1"> 
                </span>
      
                Notifications
              </button>


              <button
                onClick={() => navigate(`/profile/${userId}`)}
                className="flex items-center gap-1 text-sm"
              >
                <User size={18}/>
                Profile
              </button>


            </div>




            {/* Desktop Right */}

            <div className="hidden md:flex items-center gap-2">


              {/* Theme */}

              <button
                onClick={toggleTheme}
                className={`p-1.5 rounded-md ${
                  isDark
                  ? "bg-gray-800 text-yellow-400"
                  : "bg-gray-200 text-gray-700"
                }`}
              >

                {
                  isDark
                  ?
                  <Sun size={15}/>
                  :
                  <Moon size={15}/>
                }

              </button>




              {/* Profile Dropdown */}

              <div className="relative">

                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${
                    isDark
                    ?
                    "text-gray-300 hover:bg-gray-800"
                    :
                    "text-gray-600 hover:bg-gray-100"
                  }`}
                >

                  <User size={17}/>

                  <span className="max-w-[100px] truncate">
                    {username}
                  </span>

                </button>



                {
                  profileOpen && (

                    <div
                      className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg border p-2 ${
                        isDark
                        ?
                        "bg-gray-900 border-gray-700"
                        :
                        "bg-white border-gray-200"
                      }`}
                    >


                      <button
                        onClick={handleLogout}
                        className="
                        flex items-center gap-2 
                        w-full px-3 py-2 
                        text-sm text-red-600 
                        hover:bg-red-50 rounded-md
                        "
                      >

                        <LogOut size={16}/>

                        Logout

                      </button>


                    </div>

                  )
                }


              </div>


            </div>





            {/* Mobile Right */}

            <div className="md:hidden flex items-center gap-2">


              {/* Theme */}

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-md ${
                  isDark
                  ?
                  "bg-gray-800 text-yellow-400"
                  :
                  "bg-gray-200"
                }`}
              >

                {
                  isDark
                  ?
                  <Sun size={16}/>
                  :
                  <Moon size={16}/>
                }

              </button>



              {/* Mobile Logout */}

              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-red-600 hover:bg-red-100"
              >

                <LogOut size={20}/>

              </button>


            </div>


          </div>





          {/* Mobile Navigation */}

          <div
            className={`md:hidden border-t py-2 ${
              isDark
              ?
              "border-gray-800"
              :
              "border-gray-200"
            }`}
          >

            <div className="flex justify-around">


              <button
                onClick={() => navigate("/feed")}
                className="flex flex-col items-center text-xs"
              >
                <Home size={20}/>
                Feed
              </button>



              <button
                onClick={() => navigate("/explore")}
                className="flex flex-col items-center text-xs"
              >
                <Compass size={20}/>
                Explore
              </button>



              <button
                onClick={() => navigate("/notifications")}
                className="relative flex flex-col items-center text-xs"
              >

                <Bell size={20}/>

                <span className="absolute -top-1 right-1 bg-red-500 text-white text-[9px] px-1 rounded-full">
                </span>

                Alerts

              </button>




              <button
                onClick={() => navigate(`/profile/${userId}`)}
                className="flex flex-col items-center text-xs"
              >

                <User size={20}/>

                Profile

              </button>



            </div>

          </div>


        </div>

      </nav>





      {/* Floating Create */}

      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">

        <button
          onClick={() => navigate("/create-post")}
          className="
          w-14 h-14 rounded-full 
          bg-blue-600 hover:bg-blue-700
          text-white flex items-center justify-center 
          shadow-xl
          "
        >

          <Plus size={28}/>

        </button>


      </div>


    </>
  );
}