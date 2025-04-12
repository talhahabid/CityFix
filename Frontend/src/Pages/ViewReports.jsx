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

  // Find flagged reports
  const flaggedReports = userReports.filter(report => report.reportStatus === "Flagged");
  const fineAmount = flaggedReports.length > 1 ? (flaggedReports.length - 1) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-blue-500">📜</span> My Reports
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/citizen")}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow transition-all duration-200 flex items-center gap-2"
            >
              <span>🏠</span> Back to Home
            </button>
            <button
              onClick={handleRefresh}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow transition-all duration-200 flex items-center gap-2"
            >
              <span>🔄</span> Refresh Reports
            </button>
          </div>
        </div>

        {/* Display warning for a single flagged report */}
        {flaggedReports.length === 1 && (
          <div className="mb-6 p-4 bg-red-700/20 text-red-400 rounded-lg text-center">
            ⚠️ Warning: Your report "{flaggedReports[0].problemType}" has been flagged by the council.
          </div>
        )}

        {/* Display fine for multiple flagged reports */}
        {flaggedReports.length > 1 && (
          <div className="mb-6 p-4 bg-red-700/20 text-red-400 rounded-lg text-center text-xl font-bold">
            ⚠️ You have {flaggedReports.length} flagged reports. Fine: ${fineAmount}
          </div>
        )}

        {/* Reports Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {userReports.length > 0 ? (
            userReports.map((report) => (
              <div
                key={report._id}
                className={`bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50 rounded-lg p-6 hover:border-blue-500/50 flex flex-col h-full
                ${report.reportStatus === "Flagged" ? "border-red-500/50" : ""}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-200">
                    📝 {report.problemType}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    report.reportStatus === "Resolved"
                      ? "bg-green-500/20 text-green-300"
                      : report.reportStatus === "Ongoing"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : report.reportStatus === "Flagged"
                      ? "bg-red-500/20 text-red-300"
                      : "bg-gray-500/20 text-gray-300"
                  }`}>
                    {report.reportStatus}
                  </span>
                </div>

                <div className="space-y-2 text-gray-400 flex-grow">
                  <p>📍 {report.location}</p>
                  <p>🕒 {dayjs(report.dateCreated).format("MMMM D, YYYY h:mm A")}</p>
                  {report.reportStatus === "Resolved" && (
                    <p>⏳ Expires: {calculateExpiryDate(report.dateCreated)}</p>
                  )}
                </div>

                {report.reportStatus === "Flagged" && (
                  <p className="mt-4 text-red-400 font-semibold">🚨 This report has been flagged by the council.</p>
                )}

                <button
                  onClick={() => setSelectedReport(report)}
                  className="mt-6 w-full px-4 py-2 bg-blue-600/90 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-2">
              🚫 No reports found.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl relative">
              {/* Header */}
              <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-200 mb-1">
                    📝 {selectedReport.problemType}
                  </h2>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    selectedReport.reportStatus === "Resolved"
                      ? "bg-green-500/20 text-green-300"
                      : selectedReport.reportStatus === "Ongoing"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : selectedReport.reportStatus === "Flagged"
                      ? "bg-red-500/20 text-red-300"
                      : "bg-gray-500/20 text-gray-300"
                  }`}>{selectedReport.reportStatus}</span>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-gray-200"
                >
                  ❌
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Basic Info */}
                  <div className="bg-gray-700/20 rounded-lg p-4 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400">
                        Location
                      </label>
                      <p className="mt-1 text-gray-200">
                        📍 {selectedReport.location}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">
                        Submitted On
                      </label>
                      <p className="mt-1 text-gray-200">
                        🕒 {dayjs(selectedReport.dateCreated).format("MMMM D, YYYY h:mm A")}
                      </p>
                    </div>
                    {selectedReport.reportStatus === "Resolved" && (
                      <div>
                        <label className="text-sm font-medium text-gray-400">
                          Expires On
                        </label>
                        <p className="mt-1 text-gray-200">
                          ⏳ {calculateExpiryDate(selectedReport.dateCreated)}
                        </p>
                      </div>
                    )}
                    {selectedReport.reportStatus === "Flagged" && (
                      <div>
                        <label className="text-sm font-medium text-red-400">
                          Warning
                        </label>
                        <p className="mt-1 text-red-300">
                          🚨 This report has been flagged by the council.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Details & Notes */}
                  <div className="bg-gray-700/20 rounded-lg p-4 space-y-4">
                    {selectedReport.details && (
                      <div>
                        <label className="text-sm font-medium text-gray-400">
                          Additional Details
                        </label>
                        <p className="mt-1 text-gray-200">
                          {selectedReport.details}
                        </p>
                      </div>
                    )}
                    {selectedReport.note && (
                      <div>
                        <label className="text-sm font-medium text-gray-400">
                          Your Note
                        </label>
                        <p className="mt-1 text-gray-200">
                          {selectedReport.note}
                        </p>
                      </div>
                    )}
                    {selectedReport.councilNote && selectedReport.councilNote.trim() && (
                      <div>
                        <label className="text-sm font-medium text-gray-400">
                          Council Feedback
                        </label>
                        <p className="mt-1 text-gray-200">
                          {selectedReport.councilNote}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Section if available */}
                {selectedReport.imageUrl && (
                  <div className="mt-6 bg-gray-700/20 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Uploaded Evidence
                    </label>
                    <img
                      src={selectedReport.imageUrl}
                      alt="Report Evidence"
                      className="w-full rounded-lg max-h-60 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-700">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewReports;