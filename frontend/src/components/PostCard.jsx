import React, { useState, useEffect, useRef } from "react";
import { Eye, Heart, MessageCircle, Share2, Trash2, Bookmark, Copy, Hash } from "lucide-react";
import { Link } from "react-router-dom";
import { toggleLike, addComment, getComments } from "../utils/apiClient";
import toast from "react-hot-toast";
import BASE_URL from "../api";
import axios from "axios";

export default function PostCard({ post, currentUserId, onDelete }) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [views, setViews] = useState(post.views || 0);
  const [isSaved, setIsSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const videoRef = useRef(null);

  // Word count for description
  const wordCount = post.description?.trim().split(/\s+/).filter(Boolean).length || 0;
  const charCount = post.description?.length || 0;
  const isLongDesc = charCount > 150;
  const hashtags = post.description?.match(/#[\w]+/g) || [];

  const handleLike = async () => {
    try {
      await toggleLike(post._id);
      setIsLiked((prev) =>!prev);
      setLikesCount((prev) => (isLiked? prev - 1 : prev + 1));
    } catch {
      toast.error("Failed to like post");
    }
  };

  const loadComments = async () => {
    try {
      const { data } = await getComments(post._id);
      setComments(data?.data || []);
    } catch {
      console.log("Failed to load comments");
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      setLoading(true);
      await addComment(post._id, commentText);
      setCommentText("");
      await loadComments();
      toast.success("Comment added");
    } catch {
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/post/${post._id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, text: post.description, url: shareUrl });
      } else {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied");
      }
    } catch (err) {
      console.log(err);
    }
  }; 

  const handleViews = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/user/views/${post._id}`);
      setViews(res.data.viewsCount);
    } catch (err) {
      console.log("View error:", err.response?.data || err.message);
    }
  };

  // UNIQUE FEATURE 1: Quick Save (localStorage)
  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem('gconnect_saved') || '[]');
    if (isSaved) {
      const filtered = saved.filter(id => id!== post._id);
      localStorage.setItem('gconnect_saved', JSON.stringify(filtered));
      setIsSaved(false);
      toast.success("Removed from saved");
    } else {
      saved.push(post._id);
      localStorage.setItem('gconnect_saved', JSON.stringify(saved));
      setIsSaved(true);
      toast.success("Saved! 📌");
    }
  };

  // UNIQUE FEATURE 2: Copy caption
  const copyCaption = () => {
    navigator.clipboard.writeText(`${post.title}\n\n${post.description}`);
    toast.success("Caption copied!");
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('gconnect_saved') || '[]');
    setIsSaved(saved.includes(post._id));
  }, [post._id]);

  // Auto play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video ||!post.video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.querySelectorAll('video').forEach(v => { if (v!== video) v.pause(); });
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [post.video]);

  useEffect(() => { handleViews(); }, []);
  useEffect(() => { if (showComments) loadComments(); }, [showComments]);

  const firstLetter = post.user?.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0f0f0f] rounded-2xl overflow-hidden border border-gray-800 shadow-lg mb-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link to={`/profile/${post.user?._id}`} className="flex items-center gap-3">
          {post.user?.profilePicture? (
            <img src={post.user.profilePicture} alt={post.user.username} className="w-11 h-11 rounded-full object-cover" />
          ) : (
            <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg">
              {firstLetter}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-white text-sm sm:text-base">{post.user?.username}</h3>
            <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </Link>

        {currentUserId === post.user?._id && (
          <button onClick={() => onDelete && onDelete(post._id)} className="text-gray-400 hover:text-red-500 transition">
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Media */}
      <div className="bg-black flex items-center justify-center">
        {post.video? (
          <video ref={videoRef} src={post.video} controls playsInline preload="metadata" className="w-full h-auto max-h-[80vh] object-contain" />
        ) : (
          <img src={post.image} alt={post.title} className="w-full h-auto max-h-[80vh] object-contain" />
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-6">
          <button onClick={handleLike} className="flex items-center gap-2">
            <Heart size={24} className={`transition ${isLiked? "fill-red-500 text-red-500" : "text-white"}`} />
            <span className="text-white text-sm">{likesCount}</span>
          </button>

          <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-2 text-white">
            <MessageCircle size={24} />
            <span className="text-sm">{comments.length}</span>
          </button>

          <button onClick={handleShare} className="text-white">
            <Share2 size={24} />
          </button>

          {/* UNIQUE: Save button */}
          <button onClick={handleSave} className="text-white">
            <Bookmark size={24} className={isSaved? "fill-white text-white" : ""} />
          </button>

          <div className="flex items-center gap-2 text-white ml-auto">
            <Eye size={20} />
            <span className="text-sm">{views}</span>
          </div>
        </div>

        {/* Title + Description with WORD COUNT */}
        <div className="mt-3">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-white font-bold text-lg flex-1">{post.title}</h2>
            {/* UNIQUE: Copy button */}
            <button onClick={copyCaption} className="p-1.5 hover:bg-white/10 rounded-lg transition mt-0.5" title="Copy caption">
              <Copy size={16} className="text-gray-400" />
            </button>
          </div>

          <div className="relative">
            <p className={`text-gray-300 text-sm mt-1 ${!expanded && isLongDesc? 'line-clamp-3' : ''}`}>
              {post.description}
            </p>
            {isLongDesc && (
              <button onClick={() => setExpanded(!expanded)} className="text-blue-400 text-xs mt-1 hover:underline">
                {expanded? 'Show less' : '...more'}
              </button>
            )}
          </div>

          {/* WORD COUNT - wapas add kiya */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[11px] text-gray-500">{wordCount} words • {charCount} chars</span>
            {hashtags.length > 0 && (
              <div className="flex gap-1.5 flex-wrap">
                {hashtags.slice(0,3).map((tag, i) => (
                  <Link key={i} to={`/explore?tag=${tag.slice(1)}`} className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5">
                    <Hash size={10} />{tag.slice(1)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {post.location && <p className="text-gray-500 text-xs mt-2">📍 {post.location}</p>}
        </div>
      </div>

      {/* Comments with CHARACTER COUNT */}
      {showComments && (
        <div className="border-t border-gray-800 p-4">
          <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
            {comments.length > 0? (
              comments.map((comment) => (
                <div key={comment._id} className="bg-[#1c1c1c] rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    {comment.user?.profilePicture? (
                      <img src={comment.user.profilePicture} alt={comment.user.username} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        {comment.user?.username?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm text-white font-medium">{comment.user?.username}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{comment.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No comments yet</p>
            )}
          </div>

          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                maxLength={200}
                className="w-full bg-[#1c1c1c] text-white px-4 py-2 rounded-xl outline-none border border-gray-700 focus:border-blue-500"
              />
              {/* CHARACTER COUNT - wapas */}
              <div className="text-right text-[10px] text-gray-500 mt-1">{commentText.length}/200</div>
            </div>
            <button onClick={handleAddComment} disabled={loading ||!commentText.trim()} className="px-4 py-2 mb-5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium disabled:bg-gray-700 disabled:opacity-50">
              {loading? "..." : "Post"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}