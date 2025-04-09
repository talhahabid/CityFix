


import { Link } from "react-router-dom"; // Import Link for navigation

function CitizenHome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-6">
      {/* Navigation Divs */}
      <div className="flex gap-8">
        {/* File/Submit Report Box */}
        <Link
          to="/submit-report" // Link to Submit Report page
          className="bg-gray-800 hover:bg-gray-700 text-white p-16 rounded-lg shadow-lg w-96 text-center transition-all"
        >
          <h2 className="text-3xl font-semibold">📝 Submit Report</h2>
          <p className="mt-2 text-xl">Click here to submit a new report</p>
        </Link>

        {/* View My Reports Box */}
        <Link
          to="/view-report" // Link to View My Reports page
          className="bg-gray-800 hover:bg-gray-700 text-white p-16 rounded-lg shadow-lg w-96 text-center transition-all"
        >
          <h2 className="text-3xl font-semibold">📜 View My Reports</h2>
          <p className="mt-2 text-xl">Click here to view your submitted reports</p>
        </Link>
      </div>
    </div>
  );
}

export default CitizenHome;
