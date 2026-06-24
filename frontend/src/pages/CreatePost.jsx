import React, { useState } from "react";
import { createPost } from "../utils/apiClient.js";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";
import { Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
      setVideo(null); // Clear video if image selected
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
      setImage(null); // Clear image if video selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      return toast.error("Title and description are required");
    }

    if (!image && !video) {
      return toast.error("Please upload an image or video");
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("location", formData.location);

      if (image) data.append("image", image);
      if (video) data.append("video", video);

      await createPost(data);
      toast.success("Post created successfully!");
      navigate("/feed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setImage(null);
    setVideo(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            📹 Create New Post
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 rounded-xl p-8 space-y-6"
          >
            {/* Preview */}
            {preview ? (
              <div className="relative rounded-lg overflow-hidden bg-black h-96">
                {video ? (
                  <video
                    src={preview}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  type="button"
                  onClick={clearPreview}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-blue-500 transition">
                <Upload size={40} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-300 mb-4">
                  Upload an image or video for your post
                </p>
                <div className="flex gap-4 justify-center">
                  <label className="cursor-pointer">
                    <span className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-block transition">
                      Choose Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <label className="cursor-pointer">
                    <span className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg inline-block transition">
                      Choose Video
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter post title"
                maxLength="100"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                {formData.title.length}/100
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your post"
                maxLength="500"
                rows="4"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                {formData.description.length}/500
              </p>
            </div>

            {/* Location */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Location (Optional)
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Where is this from?"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
