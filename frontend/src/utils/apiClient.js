import axios from "axios";
import BASE_URL from "../api.js";

const getToken = () => localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Posts/Events
export const createPost = (formData) =>
  apiClient.post("/event/create", formData, {   // <-- /event nahi, /post
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });


export const getFeed = (page = 1, limit = 10) =>
  apiClient.get(`/event/feed?page=${page}&limit=${limit}`);

export const getExploreFeed = (page = 1, limit = 10) =>
  apiClient.get(`/event/explore?page=${page}&limit=${limit}`);

export const getAllEvents = () => apiClient.get("/event/all");

export const deletePost = (id) => apiClient.delete(`/event/delete/${id}`);

// Likes
export const toggleLike = (eventId) =>
  apiClient.post(`/event/like/${eventId}`);

export const getLikesCount = (eventId) =>
  apiClient.get(`/event/likes/${eventId}`);

// Comments
export const addComment = (eventId, comment) =>
  apiClient.post(`/event/comment/${eventId}`, { comment });

export const getComments = (eventId) =>
  apiClient.get(`/event/comments/${eventId}`);

export const deleteComment = (commentId) =>
  apiClient.delete(`/event/comment/${commentId}`);

// User Profile
export const getUserProfile = (userId) =>
  apiClient.get(`/user/profile/${userId}`);

export const getUserPosts = (userId) =>
  apiClient.get(`/user/posts/${userId}`);

export const getUserLikedPosts = (userId) =>
  apiClient.get(`/user/liked/${userId}`);

//  FIXED: Added multipart/form-data header for image upload
export const updateUserProfile = (userId, data) =>
  apiClient.put(`/user/profile/${userId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Follow
export const followUser = (userId) =>
  apiClient.post(`/user/follow/${userId}`);

export const unfollowUser = (userId) =>
  apiClient.post(`/user/unfollow/${userId}`);

export const getFollowers = (userId) =>
  apiClient.get(`/user/followers/${userId}`);

export const getFollowing = (userId) =>
  apiClient.get(`/user/following/${userId}`);

// Auth
export const registerUser = (data) => apiClient.post("/user/register", data);

export const loginUser = (data) => apiClient.post("/user/login", data);

export const logoutUser = (id) => apiClient.get(`/user/logout/${id}`);



export default apiClient;