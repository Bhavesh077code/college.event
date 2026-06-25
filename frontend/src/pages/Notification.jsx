import React, { useEffect, useState } from "react";

import { Heart, UserPlus, MessageCircle, Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

import BASE_URL from "../api";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getNotifications = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(res.data.notifications || []);
    } catch (error) {
      console.log(error);
    }
  };

  const markRead = async (id) => {
    try {
      await axios.put(
        `${BASE_URL}/user/notifications/read/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id
            ? {
                ...n,
                isRead: true,
              }
            : n,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/user/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications((prev) => prev.filter((n) => n._id !== id));

      toast.success("Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "follow":
        return <UserPlus className="text-blue-500" />;

      case "like":
        return <Heart className="text-red-500 fill-red-500" />;

      case "comment":
        return <MessageCircle className="text-green-500" />;

      default:
        return null;
    }
  };

  const handleFollowBack = async (userId) => {
    try {
      await axios.post(
        `${BASE_URL}/user/follow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Following");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const timeAgo = (date) => {
    const sec = Math.floor((new Date() - new Date(date)) / 1000);

    if (sec < 60) return "now";

    if (sec < 3600) return `${Math.floor(sec / 60)} min ago`;

    if (sec < 86400) return `${Math.floor(sec / 3600)} hr ago`;

    return `${Math.floor(sec / 86400)} day ago`;
  };

  return (
    <div
      className="
min-h-screen
bg-black
text-white
p-4
"
    >
      <h1
        className="
text-2xl
font-bold
mb-6
"
      >
        Notifications
      </h1>

      <div
        className="
max-w-xl
mx-auto
space-y-3
"
      >
        {notifications.length === 0 ? (
          <p
            className="
text-center
text-gray-500
mt-20
"
          >
            No notifications
          </p>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className={`
flex
items-center
gap-4
p-4
rounded-2xl
cursor-pointer

${item.isRead ? "bg-[#151515]" : "bg-[#222]"}

`}
            >
              {/* Profile */}

              <div
                onClick={(e) => {
                  e.stopPropagation();

                  navigate(`/profile/${item.sender?._id}`);
                }}
              >
                {item.sender?.profilePicture ? (
                  <img
                    src={item.sender.profilePicture}
                    className="
w-12
h-12
rounded-full
object-cover
"
                  />
                ) : (
                  <div
                    className="
w-12
h-12
rounded-full
bg-red-600
flex
items-center
justify-center
font-bold
"
                  >
                    {item.sender?.username?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </div>

              <div
                className="
flex-1
"
                onClick={() => {
                  markRead(item._id);

                  if (item.type === "follow") {
                    navigate(`/profile/${item.sender._id}`);
                  }

                  if (
                    (item.type === "like" || item.type === "comment") &&
                    item.post
                  ) {
                    navigate(`/post/${item.post._id}`);
                  }
                }}
              >
                <div
                  className="
flex
gap-2
items-center
"
                >
                  {getIcon(item.type)}

                  <p
                    className="
text-sm
"
                  >
                    {item.message}
                  </p>
                </div>

                <p
                  className="
text-xs
text-gray-500
mt-1
"
                >
                  {timeAgo(item.createdAt)}
                </p>
              </div>

              {!item.isRead && (
                <span
                  className="
w-3
h-3
bg-red-500
rounded-full
"
                ></span>
              )}

              {item.type === "follow" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    handleFollowBack(item.sender._id);
                  }}
                  className="
bg-blue-600
px-3
py-1
rounded-lg
text-xs
"
                >
                  Follow Back
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(item._id);
                }}
                className="text-gray-400hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
