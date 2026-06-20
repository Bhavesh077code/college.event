
/*

import { Bell, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { socket, connectSocket } from "../socket"; // 🔹 add this line
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 New notifications state
  const [notifications, setNotifications] = useState([]);

  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchEvents = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("❌ Token not found. Please login again.");
          return;
        }

        const res = await fetch(`${BASE_URL}/event/events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Loading after fetch:", loading);

        const data = await res.json();
        console.log("Events from backend:", data);
        setEvents(data);

        if (!res.ok) {
          setMessage(data.message || "Failed to fetch events");
          //setLoading(false)
          return;
        }

        setEvents(data.events || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setMessage("Server error. Try again later.");
      }
    };

    fetchEvents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  // 🔹 Socket listen for newEvent
  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) connectSocket(token);

    socket.on("newEvent", (data) => {
      // Add to notifications array
      alert(`🔔 New Event: ${data.title}`);


      setNotifications((prev) => [...prev, data]);

    });

    return () => {
      socket.off("newEvent");
    };
  }, []);

  //Delete event Real time
  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) connectSocket(token);

    socket.on("deleteEvent", (id) => {

      // alert("Event Deleted")
      setEvents((prev) => prev.filter((event) => event._id !== id));
    });

    return () => socket.off("deleteEvent");
  }, []);

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) connectSocket(token);

    socket.on("newEvent", (data) => {
      console.log("New Event Received:", data);

      // 🔥 Yahi important line hai
      setEvents((prev) => [data, ...prev]);
    });

    return () => socket.off("newEvent");
  }, []);



  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow flex-wrap sm:flex-nowrap">
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
            K
          </div>
          <h1 className="font-semibold text-lg sm:text-xl truncate">KIT Events</h1>
        </div>

        
        <div className="flex items-center gap-2 sm:gap-3 text-sm flex-shrink-0">
          
          <button className="p-2 hover:bg-gray-100 rounded-full bg-amber-300 relative flex-shrink-0">
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

       
          <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full truncate max-w-[100px] sm:max-w-xs text-center">
            {user?.role ? `${user.role}: ` : ""}{user?.email || "Not available"}
          </span>

          
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-white rounded-full bg-red-600 hover:bg-red-700 flex-shrink-0">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-500 mb-4">Browse upcoming events.</p>

        {message && (
          <p className="mb-4 text-red-600 text-sm font-medium">{message}</p>
        )}

        <div className="space-y-6">

          {loading ? (
            // 🔥 Skeleton Animation
            [1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300"></div>

                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            ))
          ) : events.length === 0 ? (
            <p className="text-gray-500">No Events Available</p>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={event.image || ""}
                    alt={event.title || "Event"}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm shadow">
                    {currentDate}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-semibold">
                    {event.title || "Untitled Event"}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    📍 {event.location || "No location"}
                  </p>

                  <p className="mt-2 text-gray-700">
                    {expandedId === event._id
                      ? event.description
                      : event.description.slice(0, 120) + "..."}
                  </p>


                  {event.description.length > 120 && (
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === event._id ? null : event._id
                        )
                      }
                      className="text-blue-600 text-sm font-medium mt-1"
                    >
                      {expandedId === event._id ? "See Less" : "See More"}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}


*/



import { Bell, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { socket, connectSocket } from "../socket";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const currentDate = new Date().toLocaleDateString();

  // ✅ Load user + fetch events
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          setMessage("❌ Token not found. Please login again.");
          return;
        }

        const res = await fetch(`${BASE_URL}/event/events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage(data.message || "Failed to fetch events");
          setLoading(false);
          return;
        }

        // ✅ FIXED
        setEvents(data.events || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setMessage("Server error. Try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // ✅ SINGLE SOCKET CONNECTION (FIXED)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) connectSocket(token);

    socket.on("newEvent", (data) => {
      //alert(`🔔 New Event: ${data.title}`);

      setNotifications((prev) => [...prev, data]);

      // 🔥 real-time add event
      setEvents((prev) => [data, ...prev]);
    });

    socket.on("deleteEvent", (id) => {
      setEvents((prev) => prev.filter((event) => event._id !== id));
    });

    return () => {
      socket.off("newEvent");
      socket.off("deleteEvent");
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("user"); // ✅ FIXED
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
            K
          </div>
          <h1 className="font-semibold text-lg sm:text-xl truncate">
            KIT Events
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-sm flex-shrink-0">
          {/* 🔔 Bell
          <button className="p-2 hover:bg-gray-100 rounded-full bg-amber-300 relative flex-shrink-0">
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>
          */}

          {/* 🔔 Bell Icon with Mobile-Friendly Dropdown */}
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

            {/* 🔹 Mobile-Friendly Dropdown */}
            {/* 🔹 Notification Dropdown */}
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

          {/* User */}
          <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full truncate max-w-[100px] sm:max-w-xs text-center">
            {user?.role ? `${user.role}: ` : ""}
            {user?.email || "Not available"}
          </span>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-white rounded-full bg-red-600 hover:bg-red-700 flex-shrink-0"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-500 mb-4">Browse upcoming events.</p>

        {message && (
          <p className="mb-4 text-red-600 text-sm font-medium">{message}</p>
        )}

        <div className="space-y-6">
          {loading ? (
            [1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300"></div>

                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            ))
          ) : events.length === 0 ? (
            <p className="text-gray-500">No Events Available</p>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={
                      event.image ||
                      "https://via.placeholder.com/400x200"
                    }
                    alt={event.title || "Event"}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm shadow">
                    {currentDate}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-semibold">
                    {event.title || "Untitled Event"}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    📍 {event.location || "No location"}
                  </p>

                  <p className="mt-2 text-gray-700">
                    {expandedId === event._id
                      ? event.description
                      : (event.description || "").slice(0, 120) + "..."}
                  </p>

                  {event.description?.length > 120 && (
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === event._id ? null : event._id
                        )
                      }
                      className="text-blue-600 text-sm font-medium mt-1"
                    >
                      {expandedId === event._id ? "See Less" : "See More"}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}



