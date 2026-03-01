

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditEvent() {
  const { id } = useParams(); // event id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    image: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://192.168.1.71:8000/event/edit/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) setFormData(data.event);
        else alert(data.message || "Event not found");
      } catch (err) {
        console.error(err);
        alert("Server error");
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://192.168.1.71:8000/event/edit/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) alert(data.message || "Update failed");
      else {
        alert("Event updated successfully");
        navigate("/admindashboard"); // go back to admin dashboard
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Edit Event</h1>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full mb-3 px-3 py-2 border rounded"
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-3 px-3 py-2 border rounded"
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full mb-3 px-3 py-2 border rounded"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full mb-3 px-3 py-2 border rounded"
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Update Event
      </button>
    </div>
  );
}
