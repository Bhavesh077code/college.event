import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  getUserPosts,
  getUserLikedPosts,
  followUser,
  unfollowUser,
  deletePost,
  updateUserProfile,
} from "../utils/apiClient.js";
import PostCard from "../components/PostCard.jsx";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";
import {
  UserPlus,
  UserMinus,
  Loader,
  Edit2,
  Save,
  X,
  Camera,
  Grid,
  Heart,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const AVATAR_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E2",
  "#F8B88B",
  "#52C4A5",
];

const DEFAULT_AVATAR = (name, size = "large") => {
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  const textSize = size === "large" ? "text-3xl" : "text-sm";
  return (
    <div
      style={{ backgroundColor: color }}
      className={`w-full h-full flex items-center justify-center text-white ${textSize} font-bold`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

// ─── Followers / Following Modal ───────────────────────────────────────────────
function UserListModal({ title, users, onClose, isDark }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`relative w-full md:max-w-sm rounded-t-2xl md:rounded-2xl max-h-[70vh] flex flex-col ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div
            className={`w-10 h-1 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
          />
        </div>

        {/* Header */}
        <div
          className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}
        >
          <h3 className="font-bold text-base">{title}</h3>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          >
            <X size={18} />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 py-2">
          {users.length === 0 ? (
            <p
              className={`text-center py-10 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Koi nahi hai abhi
            </p>
          ) : (
            users.map((u) => (
              <div
                key={u._id}
                onClick={() => {
                  onClose();
                  navigate(`/profile/${u._id}`);
                }}
                className={`flex items-center gap-3 px-5 py-3 ${
                  isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"
                } cursor-pointer`}
              >
                {/* Mini Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  {u.profilePicture ? (
                    <img
                      src={u.profilePicture}
                      alt={u.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    DEFAULT_AVATAR(u.username || "?", "small")
                  )}
                </div>
                <span className="font-medium text-sm">{u.username}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 3-Column Post Grid Tile ──────────────────────────────────────────────────
function PostTile({ post, onPress, isDark }) {
  const videoRef = useRef(null);
  const thumbnail = post.image || post.images?.[0] || null;
  const video = post.video || post.videos?.[0] || null;

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onClick={() => onPress(post)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-square cursor-pointer overflow-hidden"
      style={{ background: isDark ? "#0b0b0b" : "#f3f4f6" }}
    >
      {thumbnail && (
        <img
          src={thumbnail}
          alt="Post thumbnail"
          className="w-full h-full object-cover"
        />
      )}
      {video && (
        <video
          ref={videoRef}
          src={video}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}
      {/* Content overlay */}
      {post.content && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
          <p className="text-xs line-clamp-3 text-center">{post.content}</p>
        </div>
      )}
      {/* Likes overlay */}
      {post.likes?.length > 0 && (
        <div className="absolute bottom-1 left-1 flex items-center gap-0.5 bg-black/50 rounded px-1.5 py-0.5">
          <Heart size={10} className="text-white fill-white" />
          <span className="text-white text-xs">{post.likes.length}</span>
        </div>
      )}
    </div>
  );
}

// ─── Post Detail Overlay ──────────────────────────────────────────────────────
function PostDetailOverlay({ post, onClose, isDark, currentUserId, onDelete }) {
  if (!post) return null;
  const isOwner =
    post.author?._id === currentUserId || post.author === currentUserId;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div
        className={`relative w-full md:max-w-md rounded-t-2xl md:rounded-2xl overflow-hidden ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
        style={{ maxHeight: "80vh" }}
      >
        {/* Close */}
        <div
          className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}
        >
          <button onClick={onClose} className="p-1">
            <ArrowLeft size={20} />
          </button>
          {isOwner && (
            <button
              onClick={() => {
                onDelete(post._id);
                onClose();
              }}
              className="p-1 text-red-500"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
          <PostCard
            post={post}
            currentUserId={currentUserId}
            onDelete={(id) => {
              onDelete(id);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UserProfile() {
  const { userId } = useParams();
  const { isDark } = useTheme();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [tab, setTab] = useState("posts");
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  // Modal states
  const [modal, setModal] = useState(null); // "followers" | "following" | null
  const [selectedPost, setSelectedPost] = useState(null);

  const currentUserId = localStorage.getItem("userId");
  const isOwnProfile = currentUserId === userId;

  const loadUserData = async () => {
    try {
      setLoading(true);
      const [profileRes, postsRes, likedRes] = await Promise.all([
        getUserProfile(userId),
        getUserPosts(userId),
        getUserLikedPosts(userId),
      ]);

      setUser(profileRes.data.user);
      setPosts(postsRes.data.posts || []);
      const validLikedPosts = (likedRes.data.posts || []).filter(
        (p) => p !== null,
      );
      setLikedPosts(validLikedPosts);
      setEditBio(profileRes.data.user.bio || "");

      const isAlreadyFollowing = profileRes.data.user.followers.some(
        (f) => f._id === currentUserId,
      );
      setIsFollowing(isAlreadyFollowing);
    } catch {
      toast.error("Profile load nahi hua");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
        setIsFollowing(false);
        setUser({
          ...user,
          followers: user.followers.filter((f) => f._id !== currentUserId),
        });
      } else {
        await followUser(userId);
        setIsFollowing(true);
        setUser({
          ...user,
          followers: [...user.followers, { _id: currentUserId }],
        });
      }
    } catch {
      toast.error("Follow update nahi hua");
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("bio", editBio);
      if (profilePicture) formData.append("image", profilePicture);

      const response = await updateUserProfile(userId, formData);
      if (response.data?.user) {
        setUser(response.data.user);
        setEditBio(response.data.user.bio || "");
      }
      setProfilePicture(null);
      setIsEditing(false);
      toast.success("Profile update ho gaya!");
      loadUserData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update nahi hua");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
      setLikedPosts((prev) => prev.filter((p) => p._id !== postId));
      toast.success("Post delete ho gaya");
    } catch {
      toast.error("Post delete nahi hua");
    }
  };

  if (loading && !user) {
    return (
      <div className={`${isDark ? "bg-gray-950" : "bg-gray-50"} min-h-screen`}>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <Loader className="animate-spin" size={36} />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const activePosts = tab === "posts" ? posts : likedPosts;

  return (
    <div
      className={`${isDark ? "bg-gray-950 text-white" : "bg-white text-black"} min-h-screen`}
    >
      <Navbar />

      {/* ── Profile Top Section ── */}
      <div className="max-w-xl mx-auto px-4 pt-5 pb-2">
        {/* Avatar + Stats row (TikTok layout) */}
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-offset-2 ring-blue-500">
              {profilePicture ? (
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                DEFAULT_AVATAR(user.username)
              )}
            </div>
            {isOwnProfile && isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full cursor-pointer hover:bg-blue-600 transition shadow">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] && setProfilePicture(e.target.files[0])
                  }
                  className="hidden"
                />
                <Camera size={13} className="text-white" />
              </label>
            )}
          </div>

          {/* Stats (clickable) */}
          <div className="flex flex-1 justify-around">
            {/* Posts */}
            <div className="text-center">
              <p className="font-bold text-lg leading-tight">{posts.length}</p>
              <p
                className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Posts
              </p>
            </div>

            {/* Followers — clickable */}
            <button
              onClick={() => setModal("followers")}
              className="text-center active:opacity-60 transition"
            >
              <p className="font-bold text-lg leading-tight">
                {user.followers?.length || 0}
              </p>
              <p
                className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Followers
              </p>
            </button>

            {/* Following — clickable */}
            <button
              onClick={() => setModal("following")}
              className="text-center active:opacity-60 transition"
            >
              <p className="font-bold text-lg leading-tight">
                {user.following?.length || 0}
              </p>
              <p
                className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Following
              </p>
            </button>
          </div>
        </div>

        {/* Username */}
        <p className="font-bold text-base mb-1">{user.username}</p>

        {/* Bio */}
        {isEditing && isOwnProfile ? (
          <div className="mb-3">
            <textarea
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder="Apna bio likho..."
              maxLength={150}
              className={`w-full p-2.5 rounded-xl border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-gray-50 border-gray-200 text-black placeholder-gray-400"
              }`}
              rows={2}
            />
            <p
              className={`text-xs mt-0.5 text-right ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              {editBio.length}/150
            </p>
          </div>
        ) : (
          <p
            className={`text-sm mb-3 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {user.bio || (isOwnProfile ? "Bio add karo..." : "Koi bio nahi")}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mb-1">
          {isOwnProfile ? (
            <>
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white py-2 rounded-xl text-sm font-semibold transition"
                  >
                    {loading ? (
                      <Loader size={14} className="animate-spin" />
                    ) : (
                      <Save size={14} />
                    )}
                    Save karo
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setProfilePicture(null);
                      setEditBio(user.bio || "");
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold transition border active:scale-95 ${
                      isDark
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <X size={14} />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold transition border active:scale-95 ${
                    isDark
                      ? "border-gray-700 text-gray-200 hover:bg-gray-800"
                      : "border-gray-200 text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <Edit2 size={14} />
                  Profile Edit karo
                </button>
              )}
            </>
          ) : (
            <button
              onClick={handleFollowToggle}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold transition active:scale-95 ${
                isFollowing
                  ? isDark
                    ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
                    : "bg-gray-100 text-black border border-gray-200 hover:bg-gray-200"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isFollowing ? (
                <>
                  <UserMinus size={14} />
                  Following
                </>
              ) : (
                <>
                  <UserPlus size={14} />
                  Follow karo
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div
        className={`border-b ${isDark ? "border-gray-800" : "border-gray-100"} sticky top-0 z-10 ${isDark ? "bg-gray-950" : "bg-white"}`}
      >
        <div className="max-w-xl mx-auto flex">
          <button
            onClick={() => setTab("posts")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 border-b-2 transition text-sm font-semibold ${
              tab === "posts"
                ? "border-black text-black dark:border-white dark:text-white"
                : `border-transparent ${isDark ? "text-black hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`
            }`}
          >
            <Grid size={16} />
            Posts
          </button>
          <button
            onClick={() => setTab("liked")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 border-b-2 transition text-sm font-semibold ${
              tab === "liked"
                ? "border-black text-black dark:border-white dark:text-white"
                : `border-transparent ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`
            }`}
          >
            <Heart size={16} />
            Liked
          </button>
        </div>
      </div>

      {/* ── 3-Column Post Grid ── */}
      <div className="max-w-xl mx-auto">
        {activePosts.length > 0 ? (
          <div
            className="grid gap-0.5"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {activePosts.map(
              (post) =>
                post?._id && (
                  <PostTile
                    key={post._id}
                    post={post}
                    isDark={isDark}
                    onPress={setSelectedPost}
                  />
                ),
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            {tab === "posts" ? (
              <Grid
                size={40}
                className={isDark ? "text-gray-700" : "text-gray-300"}
              />
            ) : (
              <Heart
                size={40}
                className={isDark ? "text-gray-700" : "text-gray-300"}
              />
            )}
            <p
              className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              {tab === "posts"
                ? "Abhi tak koi post nahi"
                : "Koi liked post nahi"}
            </p>
          </div>
        )}
      </div>

      {/* ── Followers Modal ── */}
      {modal === "followers" && (
        <UserListModal
          title={`Followers (${user.followers?.length || 0})`}
          users={user.followers || []}
          onClose={() => setModal(null)}
          isDark={isDark}
        />
      )}

      {/* ── Following Modal ── */}
      {modal === "following" && (
        <UserListModal
          title={`Following (${user.following?.length || 0})`}
          users={user.following || []}
          onClose={() => setModal(null)}
          isDark={isDark}
        />
      )}

      {/* ── Post Detail Overlay ── */}
      {selectedPost && (
        <PostDetailOverlay
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          isDark={isDark}
          currentUserId={currentUserId}
          onDelete={handleDeletePost}
        />
      )}
    </div>
  );
}
