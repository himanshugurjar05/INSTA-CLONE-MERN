import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Profile() {
  const [userdata, setUserData] = useState(null);
  const [myPost, setMyPost] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  let navigate = useNavigate();

  const Getdata = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (err) {
      console.error("Profile Fetch Error:", err);
      setError("Failed to fetch user data. Please login again.");
      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login");
      }, 2000);
    }
  };

  const Fetchmypost = async () => {
    try {
      const response = await axios.get(`${apiUrl}/post/mypost`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyPost(response.data.posts);
      console.log(response.data.posts);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login");
      }, 2000);
    }
  };

  useEffect(() => {
    if (token) {
      Getdata();
      Fetchmypost();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!token ? (
        <p className="text-center">Please Login Or Signup</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : userdata ? (
        <>
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
            <img
              src={userdata.photo}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-pink-500 object-cover"
            />
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <h2 className="text-2xl font-semibold">{userdata.name}</h2>
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Edit Profile
                </button>
              </div>
              <div className="flex gap-6 mt-4 text-gray-700 justify-center md:justify-start">
                <p>
                  <span className="font-semibold">{myPost.length}</span> posts
                </p>
                <p>
                  <span className="font-semibold">500</span> followers
                </p>
                <p>
                  <span className="font-semibold">300</span> following
                </p>
              </div>
              <p className="mt-4 font-medium">{userdata.email}</p>
              <button
                className="mt-4 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Posts Section */}
          <div className="mt-8">
            {myPost.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {myPost.map((post) => (
                  <div
                    key={post._id}
                    className="rounded-lg overflow-hidden shadow"
                  >
                    <img
                      src={post.poster}
                      alt="Post"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-lg mt-10">
                No Posts Yet – Start sharing your moments!
              </p>
            )}
          </div>
        </>
      ) : (
        <p className="text-center">Loading profile...</p>
      )}
    </div>
  );
}
