
//EVENT ID
/*
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { socket } from "../socket"; // 🔹 add this line



export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [expandedId, setExpandedId] = useState(null);


  const currentDate = new Date().toLocaleDateString();
  //const navigate = useNavigate();

  useEffect(() => {
    // 🔹 Socket listener
    socket.on("newEvent", (data) => {
      alert(`🔔 New Event: ${data.title}`); // tum chahe to toast use kar sakte ho
    });

    return () => {
      socket.off("newEvent");
    };
  }, []);


  useEffect(() => {
    socket.on("newEvent", (data) => {
      console.log("New Event Received:", data);

      // 🔥 Yahi important line hai
      setEvents((prev) => [data, ...prev]);
    });

    return () => socket.off("newEvent");
  }, []);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setMessage("❌ Token not found. Please login again.");
          return;
        }

        const res = await fetch("http://192.168.1.71:8000/event/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });


        const data = await res.json();

        if (!res.ok) {
          setMessage(`❌ ${data.message || "Failed to fetch events"}`);
          return;
        }

        setEvents(data.events);
      } catch (error) {
        console.error(error);
        setMessage("❌ Server error. Try again later.");
      }
    };

    fetchEvents();
  }, []);

  //Event delete real time
  useEffect(() => {
    socket.on("deleteEvent", (id) => {

      alert("Event Deleted")
      setEvents((prev) => prev.filter((event) => event._id !== id));
    });

    return () => socket.off("deleteEvent");
  }, []);


  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://192.168.1.71:8000/event/event/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Delete error:", text);
        alert("Delete failed! Check server.");
        return;
      }

      const data = await res.json();
      console.log("Delete success:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-gray-500">Browse upcoming events.</p>
          </div>

          <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">
            <a href="/upload">Upload Event</a>
          </button>
        </div>

        {message && (
          <p className="mb-4 text-red-600 text-sm font-medium">{message}</p>
        )}

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
                  {currentDate}
                </span>
              </div>


              <div className="p-4">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-500 text-sm">{event.location}</p>

                <p className="mt-2 text-gray-700">
                  {expandedId === event._id
                    ? event.description
                    : event.description.slice(0, 120) + "..."}
                </p>

                {event.description.length > 120 && (
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === event._id ? null : event._id)
                    }
                    className="text-blue-600 text-sm font-medium mt-1"
                  >
                    {expandedId === event._id ? "See Less" : "See More"}
                  </button>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => navigate(`/edit/${event._id}`)}
                    className="px-4 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>

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
      </main>
    </div>
  );
}


*/



import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { socket } from "../socket";
// import { useNavigate } from "react-router-dom"; // agar pehle se use kar rahe ho to uncomment

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ added

  const currentDate = new Date().toLocaleDateString();
  // const navigate = useNavigate();

  useEffect(() => {
    socket.on("newEvent", (data) => {
      alert(`🔔 New Event: ${data.title}`);
    });

    return () => {
      socket.off("newEvent");
    };
  }, []);

  useEffect(() => {
    socket.on("newEvent", (data) => {
      console.log("New Event Received:", data);
      setEvents((prev) => [data, ...prev]);
    });

    return () => socket.off("newEvent");
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true); // ✅ start loading

        const token = localStorage.getItem("token");

        if (!token) {
          setMessage("❌ Token not found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://192.168.1.67:8000/event/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage(`❌ ${data.message || "Failed to fetch events"}`);
          setLoading(false);
          return;
        }

        setEvents(data.events);
        setLoading(false); // ✅ stop loading
      } catch (error) {
        console.error(error);
        setMessage("❌ Server error. Try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    socket.on("deleteEvent", (id) => {
      alert("Event Deleted");
      setEvents((prev) => prev.filter((event) => event._id !== id));
    });

    return () => socket.off("deleteEvent");
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://192.168.1.67:8000/event/event/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Delete error:", text);
        alert("Delete failed! Check server.");
        return;
      }

      const data = await res.json();
      console.log("Delete success:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-gray-500">Browse upcoming events.</p>
          </div>

          <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">
            <a href="/upload">Upload Event</a>
          </button>
        </div>

        {message && (
          <p className="mb-4 text-red-600 text-sm font-medium">{message}</p>
        )}

        {/* ✅ Skeleton Loading */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
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

                  <div className="flex gap-3 mt-4">
                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                    {currentDate}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-gray-500 text-sm">{event.location}</p>

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

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => navigate(`/edit/${event._id}`)}
                      className="px-4 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>

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
        )}
      </main>
    </div>
  );
}



