import React, { useState, useEffect } from "react";
import { getExploreFeed, deletePost } from "../utils/apiClient.js";
import PostCard from "../components/PostCard.jsx";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const userId = localStorage.getItem("userId");

  const loadExplore = async (pageNum = 1) => {
    try {
      setLoading(true);
      const { data } = await getExploreFeed(pageNum, 10);
      if (pageNum === 1) {
        setPosts(data.posts);
      } else {
        setPosts([...posts, ...data.posts]);
      }
      setTotalPages(data.pagination.pages);
    } catch (error) {
      toast.error("Failed to load explore");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExplore(1);
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
      loadExplore(nextPage);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            🌟 Explore
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
              <p className="text-gray-400 text-lg">No posts available yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
