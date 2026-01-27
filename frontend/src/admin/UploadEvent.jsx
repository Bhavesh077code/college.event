
import { Bell, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !location || !imageFile) {
      setMessage("All fields are required!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ Token not found. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("image", imageFile);

    try {

      const res = await fetch("http://localhost:8000/event/event", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // ⚠️ Note: Do NOT set 'Content-Type' here when using FormData
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message || "Upload failed"}`);
        return;
      }

      setMessage("✅ Event created successfully!");

      setTitle("");
      setDescription("");
      setLocation("");
      setImageFile(null);

      navigate("/admindashboard");
    } catch (error) {
      console.error(error);
      setMessage("❌ Server error. Try again later.");
    }
  };

  return (
    <div>
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
          <span className="px-3 py-1 bg-gray-100 rounded-full">Admin</span>
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <a className="rounded-lg" href="/admindashboard">🔙</a>

        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-800">
          Create Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            className="bg-green-500 w-50 rounded-lg"
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-lg"
          >
            Upload Event
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium">{message}</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default UploadEvent;
