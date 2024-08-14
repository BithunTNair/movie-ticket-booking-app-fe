import React, { useState } from 'react'
import { Link } from 'react-router-dom';


function NavbarCom() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <>
        <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">MovieBooking</Link>
        </div>

        {/* Toggle button for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={!isOpen ? 'M4 6h16M4 12h16m-7 6h7' : 'M6 18L18 6M6 6l12 12'}
              ></path>
            </svg>
          </button>
        </div>

        {/* Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex items-center space-x-4`}
        >
          <Link
            to="/movies"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Movies
          </Link>
          <Link
            to="/theatres"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Theatres
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-blue-400 transition-colors"
          >
            About
          </Link>

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white hover:text-blue-400 transition-colors focus:outline-none"
            >
              Account
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
        </>
    )
}

export default NavbarCom