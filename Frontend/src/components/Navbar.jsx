import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const { user } = useAuthContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (elementRef) => {
    elementRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const goToHome = () => {
    navigate("/");
  };
  
  return (
    <header className="sticky top-0 w-full bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={goToHome}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-blue-400 mr-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-100">Cypress System</h1>
        </div>
        <nav className="flex items-center space-x-6">
          
          {!user ? (
            <div className="relative group">
              <button
                onMouseEnter={() => setShowDropdown(true)}
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
              >
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
                className={`
                  absolute right-0 mt-2 w-56 bg-gray-800 text-gray-200 shadow-xl rounded-lg z-50 
                  transition-all duration-300 ease-in-out overflow-hidden
                  ${
                    showDropdown
                      ? "opacity-100 visible scale-100"
                      : "opacity-0 invisible scale-95"
                  }`}
              >
                <Link
                  to="/signin"
                  className="block px-4 py-3 hover:bg-blue-50 hover:text-gray-800 transition-colors duration-200 border-b"
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">Citizen</span>
                  </div>
                </Link>
                <Link
                  to="/council-signin"
                  className="block px-4 py-3 hover:bg-blue-50 hover:text-gray-800 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span className="font-medium">Council</span>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/profile"
                className="flex items-center space-x-3"
              >
                <img
                  className="w-10 h-10 rounded-full border-2 border-blue-400"
                  src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
                  alt="Profile"
                />
                <span className="text-gray-200 font-semibold">
                  {user.user.email}
                </span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;