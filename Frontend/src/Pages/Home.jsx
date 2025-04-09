import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // Create refs for each section
  const aboutRef = useRef(null);
  const howItWorksRef = useRef(null);

  // Smooth scroll function
  const scrollToSection = (elementRef) => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Navigation handler for the "Submit a Report" button
  const handleAction = () => {
    if (user?.user?.userType === "council") {
      navigate("/council"); // Redirect to council's report section
    } else {
      navigate("/citizen"); // Redirect to citizen's report section
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">

      {/* Hero Section */}
      <div className="relative w-full min-h-[600px] flex items-center bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('../Photos/toronto.webp')" }}>
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-6xl font-bold mb-6 leading-tight">Effortless Street Reporting</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-200">
            Report and track street problems in Toronto with ease. Help improve urban infrastructure and keep the city safe.
          </p>
          <div className="flex justify-center space-x-4">
            {/* Conditionally render the button based on user type */}
            <button 
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 flex items-center"
              onClick={handleAction}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {user?.user?.userType === "council" ? "View All Reports" : "Submit a Report"}
            </button>
            <button 
              className="bg-white cursor-pointer text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-300 flex items-center"
              onClick={() => scrollToSection(howItWorksRef)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section ref={aboutRef} className="w-full py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What is the Cypress System?</h2>
            <p className="text-xl max-w-3xl mx-auto">
              A digital platform designed to help citizens and city staff report and manage street-related issues effectively.
              From potholes to broken streetlights, help us keep Toronto's streets safe and functional.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="w-full py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How it Works</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Reporting street issues is simple! Just follow these easy steps, and let the system handle the rest.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                {/* Step 1 */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Step 1: Report an Issue</h3>
              <p className="text-gray-300">
                Click the "Submit a Report" button and fill out the required details about the issue you're experiencing.
              </p>
            </div>
            <div className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                {/* Step 2 */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 11-2 0V4H5v13a1 1 0 11-2 0V4a1 1 0 011-1zm7-1a1 1 0 011 1v10a1 1 0 11-2 0V3a1 1 0 011-1zm4 5a1 1 0 011 1v9a1 1 0 11-2 0V8a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Step 2: Track Progress</h3>
              <p className="text-gray-300">
                Once your report is submitted, you'll be able to track its status and receive updates on any actions taken.
              </p>
            </div>
            <div className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                {/* Step 3 */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Step 3: Issue Resolved</h3>
              <p className="text-gray-300">
                Once the issue is resolved, you'll be notified, and the report will be marked as complete in your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
