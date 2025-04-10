import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function SubmissionSuccessful() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // Automatically scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-6">
      <div className="bg-gray-800 border border-gray-700 shadow-lg rounded-lg p-8 w-full max-w-lg text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-600 rounded-full p-4 w-24 h-24 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        {/* Success Message */}
        <h1 className="text-3xl font-bold mb-4 text-green-400">Report Submitted Successfully!</h1>
        
        <p className="text-lg mb-6 text-gray-300">
          Thank you for helping improve our city. Your report has been submitted and will be reviewed by our team.
        </p>
        
        {/* Reference Number */}
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-400 mb-1">Reference Number</p>
          <p className="text-xl font-mono font-bold text-white">
            {/* Generate a random reference number */}
            {`REP-${Math.floor(100000 + Math.random() * 900000)}`}
          </p>
        </div>
        
        {/* What's Next Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">What happens next?</h3>
          <ul className="text-left text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>Our team will review your submission within 1-2 business days.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>If you opted for notifications, you'll receive updates as your report is processed.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <span>You can check the status of your report in your dashboard at any time.</span>
            </li>
          </ul>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Return to Home
          </button>
          
          <button 
            onClick={() => navigate('/citizen')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Submit Another Report
          </button>
        </div>
      </div>
      
      {/* Additional Help Section */}
      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-3">Need additional help?</h3>
        <p className="text-gray-300 mb-4">
          If you have any questions or need assistance with your report, feel free to contact our support team.
        </p>
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:support@cypress.ca" className="text-blue-400 hover:underline">support@cypress.ca</a>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href="tel:+14165551234" className="text-blue-400 hover:underline">(416) 555-1234</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmissionSuccessful;