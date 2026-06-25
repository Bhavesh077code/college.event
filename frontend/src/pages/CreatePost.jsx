import React, { useState, useRef } from "react";
import { createPost } from "../utils/apiClient.js";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";
import { Upload, X, MapPin, Loader2, Smartphone, Square, Film, RectangleHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SIZES = [
  { id: "9:16", label: "Reel", icon: Smartphone, ratio: "9/16" },
  { id: "4:5", label: "Portrait", icon: RectangleHorizontal, ratio: "4/5" },
  { id: "1:1", label: "Square", icon: Square, ratio: "1/1" },
  { id: "16:9", label: "Wide", icon: Film, ratio: "16/9" },
];

const TRENDING_TAGS = ["#gconnect","#viral","#college","#meme","#dance","#kit","#nepali"];

export default function CreatePost() {
  const [formData, setFormData] = useState({ title: "", description: "", location: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(SIZES[0]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleInput = (e) => setFormData({...formData, [e.target.name]: e.target.value });

  const handleFile = (f) => {
    if (!f) return;
    // 500MB tak allow
    if (f.size > 50 * 1024 * 1024) {
      return toast.error("Video 500MB se chota rakho");
    }
    setFile(f);
    const video = f.type.startsWith("video");
    setIsVideo(video);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
    toast.success(`${video? "Video" : "Photo"} ready (${(f.size/1024/1024).toFixed(1)}MB)`);
  };

  const clearAll = () => {
    if(preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return toast.error("Title likho");
    if (!file) return toast.error("File chuno");

    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append(isVideo? "video" : "image", file);

      await createPost(data);
      toast.success("Post live! 🚀");
      navigate("/feed");
    } catch (err) {
      console.log("UPLOAD ERROR:", err.response?.data);
      toast.error(err.response?.data?.message || "Upload fail");
    } finally {
      setLoading(false);
    }
  };

  // Word count
  const titleWords = formData.title.trim().split(/\s+/).filter(Boolean).length;
  const descWords = formData.description.trim().split(/\s+/).filter(Boolean).length;
  const hashtags = formData.description.match(/#\w+/g) || [];

  const addHashtag = (tag) => {
    if (!formData.description.includes(tag)) {
      setFormData({...formData, description: `${formData.description} ${tag}`.trim() });
    }
  };

  return (
    <>
      <div className="lg:block hidden"><Navbar /></div>
      <div className="min-h-screen bg-black text-white pb-24 lg:pb-0">
        <div className="lg:hidden sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2"><X size={22} /></button>
          <h1 className="font-semibold">New Post</h1>
          <button onClick={handleSubmit} disabled={loading ||!file} className="text-purple-400 font-semibold disabled:opacity-40 text-sm">Share</button>
        </div>

        <div className="max-w-6xl mx-auto lg:px-4 lg:py-8">
          <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-3">
              <div className="px-4 lg:px-0 pt-4">
                <div onClick={() =>!preview && fileInputRef.current?.click()} style={{ aspectRatio: size.ratio }} className={`relative w-full max-w-[400px] mx-auto bg-zinc-950 rounded-3xl overflow-hidden border-2 cursor-pointer ${!preview? "h-[55vh] lg:h-[65vh]" : ""} border-zinc-800`}>
                  {preview? (
                    <>
                      {isVideo? (
                        <video src={preview} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                      ) : (
                        <img src={preview} alt="" className="w-full h-full object-cover" />
                      )}
                      <button type="button" onClick={(e) => { e.stopPropagation(); clearAll(); }} className="absolute top-3 right-3 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center"><X size={16} /></button>
                      <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 rounded-full text-[10px]">{size.id}</div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center">
                      <Upload className="w-12 h-12 text-zinc-600 mb-3" />
                      <p className="font-medium">Choose video or photo</p>
                      <p className="text-xs text-zinc-500 mt-1">Max 500MB</p>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={(e) => handleFile(e.target.files[0])} className="hidden" />

                <div className="mt-3 max-w-[400px] mx-auto grid grid-cols-4 gap-2">
                  {SIZES.map(s => { const Icon = s.icon; return (
                    <button key={s.id} type="button" onClick={() => setSize(s)} className={`py-2.5 rounded-xl border text-center transition ${size.id===s.id? "bg-white text-black border-white" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800"}`}>
                      <Icon className="w-4 h-4 mx-auto mb-0.5" />
                      <div className="text-[10px] leading-tight">{s.label}</div>
                    </button>
                  )})}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 px-4 lg:px-0 mt-6 lg:mt-0">
              <div className="lg:bg-zinc-900/50 lg:border lg:border-zinc-800 lg:rounded-3xl lg:p-5 space-y-4">
                <div>
                  <input name="title" value={formData.title} onChange={handleInput} placeholder="Add title..." maxLength={100} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                  <div className="flex justify-between text-[11px] text-zinc-500 mt-1 px-1">
                    <span>{titleWords} words</span>
                    <span>{formData.title.length}/100</span>
                  </div>
                </div>

                <div>
                  <textarea name="description" value={formData.description} onChange={handleInput} placeholder="Write caption... #viral" rows={3} maxLength={500} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none" />
                  <div className="flex justify-between text-[11px] text-zinc-500 mt-1 px-1">
                    <span>{descWords} words • {hashtags.length} tags</span>
                    <span>{formData.description.length}/500</span>
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {TRENDING_TAGS.map(tag => (
                      <button key={tag} type="button" onClick={() => addHashtag(tag)} className="text-[11px] px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-300">{tag}</button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input name="location" value={formData.location} onChange={handleInput} placeholder="Location" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-3" />
                </div>

                <div className="hidden lg:block pt-2">
                  <button type="submit" disabled={loading ||!file} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading? <><Loader2 className="w-4 h-4 animate-spin" /> Posting</> : "Share Post"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent">
          <button onClick={handleSubmit} disabled={loading ||!file} className="w-full py-4 rounded-2xl bg-white text-black font-bold disabled:opacity-40">
            {loading? "Uploading..." : "Share Post"}
          </button>
        </div>
      </div>
    </>
  );
}