import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AiFillHome,
  AiOutlineUser,
  AiOutlineAppstore,
  AiOutlinePlusCircle,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineMenu,
  AiOutlineClose,
} from 'react-icons/ai';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  let token = localStorage.getItem('token');

  return (
    <header className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="https://teamhubly.cdn.bubble.io/f1682375787019x359464291079405500/temp%20lp%20image.svg"
            alt="Hubly Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-3xl font-extrabold text-black tracking-wide select-none cursor-pointer">
            Hubly.IO
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          <li className="flex items-center gap-1 hover:text-blue-600 transition duration-200 cursor-pointer">
            <AiFillHome className="text-xl" />
            <Link to="/">Home</Link>
          </li>

          {token ? (
            <>
              <li className="flex items-center gap-1 hover:text-blue-600 transition duration-200 cursor-pointer">
                <AiOutlineUser className="text-xl" />
                <Link to="/profile">Profile</Link>
              </li>
              <li className="flex items-center gap-1 hover:text-blue-600 transition duration-200 cursor-pointer">
                <AiOutlineAppstore className="text-xl" />
                <Link to="/allpost">Feed</Link>
              </li>
              <li className="flex items-center gap-1 hover:text-blue-600 transition duration-200 cursor-pointer">
                <AiOutlinePlusCircle className="text-xl" />
                <Link to="/addpost">Create</Link>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center gap-1 hover:text-blue-600 transition duration-200 cursor-pointer">
                <AiOutlineUserAdd className="text-xl" />
                <Link to="/api/signup">Signup</Link>
              </li>
              <li className="flex items-center gap-1 hover:text-blue-600 transition duration-200 cursor-pointer">
                <AiOutlineLogin className="text-xl" />
                <Link to="/api/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 py-4 text-gray-700 font-medium bg-blue-50 border-t border-blue-200">
          <li className="flex items-center gap-1 hover:text-blue-600 transition duration-200 cursor-pointer">
            <AiFillHome className="text-xl" />
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          {token ? (
            <>
              <li className="flex items-center gap-1 hover:text-blue-600 transition duration-200 cursor-pointer">
                <AiOutlineUser className="text-xl" />
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
              </li>
              <li className="flex items-center gap-1 hover:text-blue-600 transition duration-200 cursor-pointer">
                <AiOutlineAppstore className="text-xl" />
                <Link to="/allpost" onClick={() => setMenuOpen(false)}>
                  Feed
                </Link>
              </li>
              <li className="flex items-center gap-1 hover:text-blue-600 transition duration-200 cursor-pointer">
                <AiOutlinePlusCircle className="text-xl" />
                <Link to="/addpost" onClick={() => setMenuOpen(false)}>
                  Create
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center gap-1 hover:text-blue-600 transition duration-200 cursor-pointer">
                <AiOutlineUserAdd className="text-xl" />
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  Signup
                </Link>
              </li>
              <li className="flex items-center gap-1 hover:text-blue-600 transition duration-200 cursor-pointer">
                <AiOutlineLogin className="text-xl" />
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </header>
  );
}
