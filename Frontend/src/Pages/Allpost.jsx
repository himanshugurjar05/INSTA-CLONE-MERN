import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Allpost() {
  const [allPosts, setAllPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/post/allpost", {
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
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
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

              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  {post.title}
                </h3>
                <img
                  src={post.poster}
                  alt="Post"
                  className="w-full max-h-60 object-cover rounded-lg"
                />
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
