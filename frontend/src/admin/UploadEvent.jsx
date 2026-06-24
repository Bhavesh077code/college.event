/*
import { Bell, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

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

      const res = await fetch("http://192.168.1.86:8000/event/event", {
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
      <Header />

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

*/

import { Bell, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import BASE_URL from "../api";

const UploadEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(""); // ✅ Date added
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation updated
    if (!title || !description || !location || !date) {
      setMessage("All fields are required!");
      return;
    }

    if (!imageFile && !videoFile) {
      setMessage("Please upload an image or video");
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
    formData.append("date", date); // ✅ Date append
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (videoFile) {
      formData.append("video", videoFile);
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/event/event`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message || "Upload failed"}`);
        return;
      }

      setMessage("✅ Event created successfully!");

      // ✅ Reset fields
      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
      setImageFile(null);
      setVideoFile(null);

      console.log(data);

      navigate("/admindashboard");
      console.log(data);
    } catch (error) {
      console.error(error);
      setMessage("❌ Server error. Try again later.");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
          <a
            className="rounded-lg text-sm text-gray-600 hover:text-black"
            href="/admindashboard"
          >
            🔙 Back
          </a>

          <h2 className="text-2xl font-bold text-center mb-6 text-yellow-800">
            Create Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            {/* 🔥 Professional Description 
            <textarea
              placeholder="Write detailed event description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />  hello evert o is am bhavesh   */}

            <textarea
              placeholder="Write detailed event description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            {/* 🔥 Display the description with paragraph-wise formatting */}
            <div className="mt-6 p-4 border rounded-lg bg-gray-50 whitespace-pre-line">
              {description ||
                "Your formatted description will appear here..."}{" "}
            </div>

            {/* Location */}
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            {/* 🔥 Date Picker */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            {/* Image Upload */}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full border rounded-lg p-2"
            />

            {/* Video Upload */}
            <label className="block text-sm font-medium">Event Video</label>

            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="w-full border rounded-lg p-2"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                  <span>Uploading event....</span>
                </>
              ) : (
                "Upload"
              )}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm font-medium text-red-600">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadEvent;
