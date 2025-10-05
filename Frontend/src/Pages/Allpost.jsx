import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Allpost() {
  const [allPosts, setAllPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/post/allpost`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllPosts(res.data.posts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Your Feed
      </h1>

      {allPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-lg flex flex-col gap-4"
            >
              {/* Post Header */}
              <div className="flex items-center gap-4 p-4">
                <img
                  src={post.user?.photo}
                  alt="User"
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    {post.user?.name}
                  </h2>
                  <p className="text-sm text-gray-500">{post.user?.email}</p>
                </div>
              </div>

              {/* Post Image */}
              <div>
                <img
                  src={post.poster}
                  alt="Post"
                  className="w-full max-h-60 object-cover rounded-lg"
                />
              </div>

              {/* Post Title */}
              <div className="px-4">
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  {post.title}
                </h3>
              </div>

              {/* Like, Comment, Share Icons */}
              <div className="flex items-center gap-6 px-4 pb-4 text-gray-600">
                <button className="flex items-center gap-1 hover:text-red-500">
                  <FaHeart /> Like
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500">
                  <FaComment /> Comment
                </button>
                <button className="flex items-center gap-1 hover:text-green-500">
                  <FaShare /> Share
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No posts available
        </p>
      )}
    </div>
  );
}
