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

  // Get current year for copyright
  const currentYear = new Date().getFullYear();

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

      {/* Footer Section */}
      <footer className="w-full bg-gray-900 text-white border-t border-gray-700">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-1">
              <h2 className="text-2xl font-bold mb-4">Cypress</h2>
              <p className="text-gray-400 mb-4">
                Empowering communities to improve their streets through efficient problem reporting and resolution.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="#" onClick={() => scrollToSection(aboutRef)} className="text-gray-400 hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#" onClick={() => scrollToSection(howItWorksRef)} className="text-gray-400 hover:text-white transition-colors duration-300">How It Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">City Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Report Types</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Community Guidelines</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-gray-400">100 Queen Street West, Toronto, ON M5H 2N2</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <a href="mailto:contact@cypress.ca" className="text-gray-400 hover:text-white transition-colors duration-300">contact@cypress.ca</a>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <a href="tel:+14165551234" className="text-gray-400 hover:text-white transition-colors duration-300">(416) 555-1234</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="w-full py-6 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} Cypress System. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;