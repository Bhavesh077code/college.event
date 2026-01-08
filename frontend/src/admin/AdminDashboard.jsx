
import { useEffect, useState } from "react";
import { api } from "../services/api";
import AdminEventCard from "./AdminEventCard";
import CreateEventModal from "./CreateEventModal";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  const loadEvents = async () => {
    const res = await api("/event");
    setEvents(res.data || []);
  };

  const deleteEvent = async (id) => {
    await api(`/event/${id}`, "DELETE");
    loadEvents();
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="min-h-screen  from-gray-100 to-gray-200 p-6">
      
      {/* ===== HEADER ===== */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all events in one place
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition"
        >
          + Create Event
        </button>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm">Total Events</h3>
          <p className="text-3xl font-bold mt-2">{events.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm">Active Admin</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">1</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500 text-sm">Status</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">Online</p>
        </div>
      </div>

      {/* ===== EVENTS GRID ===== */}
      {events.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No events found. Create your first event 🚀
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <AdminEventCard
              key={event._id}
              event={event}
              onDelete={deleteEvent}
            />
          ))}
        </div>
      )}

      {/* ===== MODAL ===== */}
      {showCreate && (
        <CreateEventModal
          onClose={() => setShowCreate(false)}
          refresh={loadEvents}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
