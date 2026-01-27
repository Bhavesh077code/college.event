
import { Bell, LogOut} from "lucide-react";
import React from "react";


export default function UserDashboard() {
  const events = [
    {
      id: 1,
      title: "Dance Program",
      location: "KIT College",
      description: "Sab jana dance garna aunu paryo",
      date: "Nov 28, 2025",
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    },
    {
      id: 2,
      title: "Tech Seminar",
      location: "KIT College",
      description: "Learn latest technology trends",
      date: "Dec 4, 2025",
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
    },
  ];

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
            Student
            {events.UserId}
          </span>
          <button className=" px-3 py-1 text-white rounded-full bg-red-600 "><LogOut /></button>
        </div>
      </header>

      {/* Dashboard */}
      <main className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-500 mb-4">
          Browse upcoming events.
        </p>

        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
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
                <h3 className="text-xl font-semibold">
                  {event.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  📍 {event.location}
                </p>
                <p className="mt-2 text-gray-700">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
