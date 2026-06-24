import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Trash2 } from "lucide-react";
import { toggleLike, addComment, getComments } from "../utils/apiClient.js";
import toast from "react-hot-toast";

export default function PostCard({ post, currentUserId, onDelete }) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    try {
      await toggleLike(post._id);
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      setLoading(true);
      await addComment(post._id, commentText);
      setCommentText("");
      loadComments();
      toast.success("Comment added");
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const { data } = await getComments(post._id);
      setComments(data.data || []);
    } catch (error) {
      console.error("Failed to load comments");
    }
  };

  useEffect(() => {
    if (showComments) {
      loadComments();
    }
  }, [showComments]);

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden mb-6 shadow-lg hover:shadow-2xl transition-shadow max-w-2xl mx-auto">
      {/* User info */}
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center gap-3">
          <img
            src={post.user?.profilePicture || "https://via.placeholder.com/40"}
            alt={post.user?.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-white">{post.user?.username}</p>
            <p className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {currentUserId === post.user?._id && (
          <button
            onClick={() => onDelete && onDelete(post._id)}
            className="text-red-500 hover:text-red-700 transition"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Post content */}
      <div className="relative bg-black">
        {post.video ? (
          <video
            src={post.video}
            className="w-full max-h-96 object-cover"
            controls
          />
        ) : (
          <img
            src={post.image}
            alt={post.title}
            className="w-full max-h-96 object-cover"
          />
        )}
      </div>

      {/* Post info */}
      <div className="p-4 bg-gray-800">
        <h3 className="text-lg font-bold text-white mb-1">{post.title}</h3>
        <p className="text-gray-300 text-sm mb-2">{post.description}</p>
        {post.location && (
          <p className="text-gray-400 text-xs mb-3">📍 {post.location}</p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-t border-gray-700">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 transition ${
            isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          <span className="text-sm">{likesCount}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition"
        >
          <MessageCircle size={20} />
          <span className="text-sm">{comments.length}</span>
        </button>

        <button className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition">
          <Share2 size={20} />
          <span className="text-sm">Share</span>
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="border-t border-gray-700 bg-gray-900 p-4">
          <div className="mb-4 max-h-48 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment._id} className="mb-3 pb-3 border-b border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <img
                    src={
                      comment.user?.profilePicture ||
                      "https://via.placeholder.com/30"
                    }
                    alt={comment.user?.username}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-white">
                    {comment.user?.username}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{comment.comment}</p>
              </div>
            ))}
          </div>

          {/* Add comment */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
              className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddComment}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
