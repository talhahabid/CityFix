import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetForm } from "../hooks/useGetForms";
import { useAuthContext } from "../hooks/useAuthContext";
import dayjs from "dayjs";

function ViewReports() {
  const { getForms, loading, error } = useGetForm();
  const { user } = useAuthContext();
  const [userReports, setUserReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null); // For modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const forms = await getForms();
        const filteredForms = forms.filter((form) => form.userId === user.user._id);
        setUserReports(filteredForms);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReports();
  }, []);

  const handleRefresh = async () => {
    try {
      const forms = await getForms();
      const filteredForms = forms.filter((form) => form.userId === user.user._id);
      setUserReports(filteredForms);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateExpiryDate = (dateSubmitted) => {
    return dayjs(dateSubmitted).add(30, "day").format("MMMM D, YYYY");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-semibold mb-6">📜 My Reports</h1>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg mb-6 transition"
      >
        🔄 Refresh Reports
      </button>

      {/* Reports List */}
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        {loading && <p className="text-xl text-gray-400">Loading...</p>}
        {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}
        {userReports.length === 0 && !loading && !error && (
          <p className="text-xl text-gray-400">No reports found for you.</p>
        )}
        <ul className="space-y-4">
          {userReports.map((report) => (
            <li key={report._id} className="bg-gray-700 p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{report.problemType}</h2>
              <p className="text-sm text-gray-300">📍 Location: {report.location}</p>
              <p className="text-sm text-gray-300">📊 Status: {report.reportStatus}</p>
              <button
                onClick={() => setSelectedReport(report)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/citizen")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mt-6 transition"
      >
        🔙 Back
      </button>

      {/* Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              📝 {selectedReport.problemType}
            </h2>
            <p className="text-sm text-gray-400 mb-2">
              📍 Location: {selectedReport.location}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              🕒 Submitted on:{" "}
              {dayjs(selectedReport.dateSubmitted).format("MMMM D, YYYY h:mm A")}
            </p>
            {selectedReport.reportStatus === "Resolved" && (
              <p className="text-sm text-gray-400 mb-2">
                ⏳ Expires on: {calculateExpiryDate(selectedReport.dateSubmitted)}
              </p>
            )}
            <p className="text-sm text-gray-400 mb-4">
              📊 Status:{" "}
              <span
                className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                  selectedReport.reportStatus === "Resolved"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {selectedReport.reportStatus}
              </span>
            </p>
            {selectedReport.additionalDetails && (
              <p className="text-sm text-gray-400 mb-4">
                🗒️ Additional Details: {selectedReport.additionalDetails}
              </p>
            )}
            {selectedReport.imageUrl && (
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">📷 Uploaded Image:</p>
                <img
                  src={selectedReport.imageUrl}
                  alt="Uploaded evidence"
                  className="w-full rounded-lg max-h-64 object-cover"
                />
              </div>
            )}
            {selectedReport.receiveNotification && (
              <p className="text-sm text-gray-400 mb-4">
                📩 Notifications Enabled: Yes
              </p>
            )}
            {selectedReport.note && (
              <p className="text-sm text-gray-400 mb-4">
                📝 Council Feedback: {selectedReport.note}
              </p>
            )}
            <button
              onClick={() => setSelectedReport(null)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewReports;
