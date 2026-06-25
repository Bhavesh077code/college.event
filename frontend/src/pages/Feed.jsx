import React, { useState, useEffect } from "react";
import { getFeed, deletePost } from "../utils/apiClient.js";
import PostCard from "../components/PostCard.jsx";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const userId = localStorage.getItem("userId");

  const loadFeed = async (pageNum = 1) => {
    try {
      setLoading(true);
      const { data } = await getFeed(pageNum, 10);
      if (pageNum === 1) {
        setPosts(data.posts);
      } else {
        setPosts([...posts, ...data.posts]);
      }
      setTotalPages(data.pagination.pages);
    } catch (error) {
      toast.error("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed(1);
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter((p) => p._id !== postId));
      toast.success("Post deleted");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadFeed(nextPage);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-1xl font-bold text-white mb-3 text-center">
            <i>Your Feed</i>
          </h1>

          {loading && posts.length === 0 ? (
            <div className="flex justify-center items-center min-h-96">
              <Loader className="animate-spin text-white" size={40} />
            </div>
          ) : posts.length > 0 ? (
            <>
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    currentUserId={userId}
                    onDelete={handleDeletePost}
                  />
                ))}
              </div>

              {page < totalPages && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-96 text-center">
              <p className="text-gray-400 text-lg mb-4">
                No posts yet. Start following creators!
              </p>
              <a
                href="/explore"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Explore Now
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
