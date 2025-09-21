import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
          Welcome to <span className="text-black">MyApp.IO</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          A social media platform where you can connect, share, and grow with others. Create your account and explore a vibrant community.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
          >
            Create Account
          </Link>
          <Link
            to="/login"
            className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-full shadow-md hover:bg-blue-100 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
