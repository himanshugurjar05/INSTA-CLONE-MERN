import React, { useState } from "react";
import axios from "axios";

export default function Addpost() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState(null);

  const token = localStorage.getItem("token");

  const handleform = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("poster", poster);

    try {
      const res = await axios.post(
        "http://localhost:5000/post/createpost",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setPoster(null);
      setPreview(null);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleform}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Create New Post
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mb-4"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
