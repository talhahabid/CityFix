import React, { useState, useRef } from "react";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  // Create refs for each section
  const aboutRef = useRef(null);
  const howItWorksRef = useRef(null);

  // Smooth scroll function
  const scrollToSection = (elementRef) => {
    elementRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-600 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">Cypress System</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection(howItWorksRef)}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              How It Works
            </button>
            <div className="relative group">
              <button
                onMouseEnter={() => setShowDropdown(true)}
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
              >
                Sign Up / Login
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
                  absolute right-0 mt-2 w-56 bg-white text-gray-800 shadow-xl rounded-lg z-50 
                  transition-all duration-300 ease-in-out overflow-hidden
                  ${
                    showDropdown
                      ? "opacity-100 visible scale-100"
                      : "opacity-0 invisible scale-95"
                  }
                `}
              >
                <a
                  href="#"
                  className="block px-4 py-3 hover:bg-blue-50 transition-colors duration-200 border-b"
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
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 hover:bg-blue-50 transition-colors duration-200"
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
                    <span className="font-medium">Staff</span>
                  </div>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
