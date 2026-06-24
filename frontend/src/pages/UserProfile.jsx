import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  getUserPosts,
  getUserLikedPosts,
  followUser,
  unfollowUser,
  deletePost,
} from "../utils/apiClient.js";
import PostCard from "../components/PostCard.jsx";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";
import { UserPlus, UserMinus, Loader } from "lucide-react";

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [tab, setTab] = useState("posts"); // posts, liked, followers, following
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const currentUserId = localStorage.getItem("userId");

  const loadUserData = async () => {
    try {
      setLoading(true);
      const [profileRes, postsRes, likedRes] = await Promise.all([
        getUserProfile(userId),
        getUserPosts(userId),
        getUserLikedPosts(userId),
      ]);

      setUser(profileRes.data.user);
      setPosts(postsRes.data.posts);
      setLikedPosts(likedRes.data.posts);

      // Check if current user is following this user
      const isAlreadyFollowing = profileRes.data.user.followers.some(
        (follower) => follower._id === currentUserId
      );
      setIsFollowing(isAlreadyFollowing);
    } catch (error) {
      toast.error("Failed to load user profile");
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
    } catch (error) {
      toast.error("Failed to update follow status");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter((p) => p._id !== postId));
      toast.success("Post deleted");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  if (loading || !user) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen bg-gray-950">
          <Loader className="animate-spin text-white" size={40} />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gray-900 rounded-xl p-8 mb-8">
            <div className="flex items-center gap-6 mb-6">
              <img
                src={user.profilePicture || "https://via.placeholder.com/100"}
                alt={user.username}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {user.username}
                </h1>
                <p className="text-gray-300 mb-4">{user.bio || "No bio yet"}</p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-white font-semibold">{user.postsCount}</p>
                    <p className="text-gray-400">Posts</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {user.followersCount}
                    </p>
                    <p className="text-gray-400">Followers</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {user.followingCount}
                    </p>
                    <p className="text-gray-400">Following</p>
                  </div>
                </div>
              </div>

              {currentUserId !== userId && (
                <button
                  onClick={handleFollowToggle}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
                    isFollowing
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserMinus size={20} /> Following
                    </>
                  ) : (
                    <>
                      <UserPlus size={20} /> Follow
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-700">
            <button
              onClick={() => setTab("posts")}
              className={`px-4 py-2 font-semibold transition ${
                tab === "posts"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Posts ({posts.length})
            </button>
            <button
              onClick={() => setTab("liked")}
              className={`px-4 py-2 font-semibold transition ${
                tab === "liked"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Liked ({likedPosts.length})
            </button>
            <button
              onClick={() => setTab("followers")}
              className={`px-4 py-2 font-semibold transition ${
                tab === "followers"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Followers
            </button>
            <button
              onClick={() => setTab("following")}
              className={`px-4 py-2 font-semibold transition ${
                tab === "following"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Following
            </button>
          </div>

          {/* Content */}
          <div>
            {tab === "posts" && (
              <>
                {posts.length > 0 ? (
                  <div className="space-y-6">
                    {posts.map((post) => (
                      <PostCard
                        key={post._id}
                        post={post}
                        currentUserId={currentUserId}
                        onDelete={handleDeletePost}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400 py-8">
                    No posts yet
                  </p>
                )}
              </>
            )}

            {tab === "liked" && (
              <>
                {likedPosts.length > 0 ? (
                  <div className="space-y-6">
                    {likedPosts.map((post) => (
                      <PostCard
                        key={post._id}
                        post={post}
                        currentUserId={currentUserId}
                        onDelete={handleDeletePost}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400 py-8">
                    No liked posts yet
                  </p>
                )}
              </>
            )}

            {tab === "followers" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {user.followers && user.followers.length > 0 ? (
                  user.followers.map((follower) => (
                    <div
                      key={follower._id}
                      className="bg-gray-900 p-4 rounded-lg text-center hover:bg-gray-800 transition cursor-pointer"
                      onClick={() =>
                        (window.location.href = `/profile/${follower._id}`)
                      }
                    >
                      <img
                        src={
                          follower.profilePicture ||
                          "https://via.placeholder.com/50"
                        }
                        alt={follower.username}
                        className="w-12 h-12 rounded-full object-cover mx-auto mb-2"
                      />
                      <p className="text-white font-semibold">
                        {follower.username}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-400 py-8">
                    No followers yet
                  </p>
                )}
              </div>
            )}

            {tab === "following" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {user.following && user.following.length > 0 ? (
                  user.following.map((follow) => (
                    <div
                      key={follow._id}
                      className="bg-gray-900 p-4 rounded-lg text-center hover:bg-gray-800 transition cursor-pointer"
                      onClick={() =>
                        (window.location.href = `/profile/${follow._id}`)
                      }
                    >
                      <img
                        src={
                          follow.profilePicture ||
                          "https://via.placeholder.com/50"
                        }
                        alt={follow.username}
                        className="w-12 h-12 rounded-full object-cover mx-auto mb-2"
                      />
                      <p className="text-white font-semibold">
                        {follow.username}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-400 py-8">
                    Not following anyone yet
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
