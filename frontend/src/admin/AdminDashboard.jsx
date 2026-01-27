import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";


export default function Dashboard() {
  // 🔹 Backend se aane wale events yaha store honge
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState(""); // Optional: error/success messages

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // ✅ Token localStorage se le rahe
        const token = localStorage.getItem("token");

        if (!token) {
          setMessage("❌ Token not found. Please login again.");
          return;
        }

        const res = await fetch("http://localhost:8000/event/events", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`


          },
        });

        const data = await res.json();

        if (!res.ok) {
          // 🔴 Agar backend error return kare
          setMessage(`❌ ${data.message || "Failed to fetch events"}`);
          return;
        }

        // ✅ Agar success hai to events state me set karo
        setEvents(data.events);
      } catch (error) {
        console.error(error);
        setMessage("❌ Server error. Try again later.");
      }
    };

    // 🔹 Page load hote hi events fetch karo

    fetchEvents();
  }, []);

  // 🔴 DELETE event function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ Token not found. Please login again.");
        return;
      }

      const res = await fetch(`http://localhost:8000/event/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("BACKEND RESPONSE 👉", data);


      if (!res.ok) {
        setMessage(`❌ ${data.message || "Delete failed"}`);
        return;
      }

      // ✅ UI se bhi deleted event remove karo
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error(error);
      setMessage("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
            K
          </div>
          <h1 className="font-semibold text-lg">KIT Events</h1>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <button className=" p-2 hoverl:bg-gray-100 rounded-full bg-amber-300 ">
            <Bell size={20} />
          </button>
          <span className="px-3 py-1 bg-gray-100 rounded-full">
            Admi
          </span>
          <button
            className="px-3 py-1 text-white rounded-full bg-red-600 "
            onClick={() => {
              localStorage.removeItem("token"); // ✅ Logout token remove
              navigate("/login"); // ✅ redirect to login
            }}
          >
            <LogOut />
          </button>

        </div>
      </header >

      {/* Dashboard */}
      < main className="p-4 max-w-3xl mx-auto" >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-gray-500">Browse upcoming events.</p>
          </div>

          {/* Upload event page */}
          <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">
            <a href="/upload">Upload Event</a>
          </button>
        </div>

        {/* Optional: message display */}
        {
          message && (
            <p className="mb-4 text-red-600 text-sm font-medium">{message}</p>
          )
        }

        {/* Events List */}
        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow overflow-hidden"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm shadow">
                  {event.date}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-500 text-sm">{event.location}</p>
                <p className="mt-2 text-gray-700">{event.description}</p>

                <div className="flex gap-3 mt-4">
                  {/* ✏️ EDIT */}
                  <button
                    onClick={() => navigate(`/edit/${event._id}`)}
                    className="px-4 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  {/* 🗑️ DELETE */}
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="px-4 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main >
    </div >
  );
}
