import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {

  let token = localStorage.getItem('token')
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 tracking-wide">MyApp.IO</h1>

        <ul className="flex gap-6">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Home
            </Link>
          </li>
          {
            token ? (
              <>
              <li>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/allpost"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Feed
            </Link>
          </li>
          <li>
            <Link
              to="/addpost"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Create
            </Link>
          </li>
              </>
            ) : (
              <>
              <li>
            <Link
              to="/signup"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Signup
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Login
            </Link>
          </li>
              </>
            )
          }
          
          
        </ul>
      </nav>
    </header>
  );
}
