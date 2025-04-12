import React, { useEffect, useState } from "react";
import { useGetForm } from "../hooks/useGetForms";
import { useEditForm } from "../hooks/useEditForm";
import { useDeleteForm } from "../hooks/useDeleteForm";
import dayjs from "dayjs";

function CouncilHome() {
  const { getForms, loading, error } = useGetForm();
  const { editForm } = useEditForm();
  const { deleteForm } = useDeleteForm();
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [councilNotes, setcouncilNotes] = useState({});
  const [flaggedReports, setFlaggedReports] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFlagConfirm, setShowFlagConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showFlagSuccess, setShowFlagSuccess] = useState(false);
  const [deletedReportId, setDeletedReportId] = useState(null);

  // New helper function to initialize flagged reports
  const initializeFlaggedReports = (reports) => {
    const flagged = {};
    reports.forEach((report) => {
      if (report.reportStatus === "Flagged") {
        flagged[report._id] = true;
      }
    });
    return flagged;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getForms();
        if (Array.isArray(fetchedData)) {
          const filteredData = fetchedData.filter((report) => {
            const daysPassed = dayjs().diff(dayjs(report.dateCreated), "day");
            return report.reportStatus !== "Resolved" || daysPassed < 30;
          });
          setData(filteredData);
          // Initialize flagged reports on load and refresh
          setFlaggedReports(initializeFlaggedReports(filteredData));
        } else {
          console.error("Fetched data is not an array:", fetchedData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleStatusUpdate = async (_id) => {
    // Prevent status update if report is flagged
    if (flaggedReports[_id] || data.find(report => report._id === _id)?.reportStatus === "Flagged") {
      return;
    }
    const newStatus = selectedStatus[_id];
    const councilNote = councilNotes[_id] || "";
    if (!newStatus) return;

    try {
      const updatedReport = await editForm(_id, newStatus, councilNote);
      if (updatedReport) {
        setData((prev) =>
          prev.map((report) =>
            report._id === _id ? { ...report, reportStatus: newStatus } : report
          )
        );
        setcouncilNotes((prev) => ({ ...prev, [_id]: "" }));
        setSelectedStatus((prev) => ({ ...prev, [_id]: "" }));
        setSelectedReport(null);
      }
    } catch (err) {
      console.error("Error updating report status:", err);
    }
  };

  const handleFlagReport = async (_id) => {
    try {
      await editForm(_id, "Flagged", "This report has been flagged as false.");
      setShowFlagConfirm(false);
      setShowFlagSuccess(true);

      // Update data states
      setData((prev) =>
        prev.map((report) =>
          report._id === _id ? { ...report, reportStatus: "Flagged" } : report
        )
      );
      setFlaggedReports((prev) => ({ ...prev, [_id]: true }));

      // Auto close after 2 seconds
      setTimeout(() => {
        setSelectedReport(null);
        setShowFlagSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Error flagging report:", err);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const success = await deleteForm(_id);
      if (success) {
        // Immediately remove the report from the data state for UI update
        setData((prev) => prev.filter((report) => report._id !== _id));
        setDeletedReportId(_id);
        
        // Close confirmation and show success message
        setShowDeleteConfirm(false);
        setShowDeleteSuccess(true);
        
        // Auto close modal after 2 seconds
        setTimeout(() => {
          setSelectedReport(null);
          setShowDeleteSuccess(false);
          setDeletedReportId(null);
        }, 2000);
      }
    } catch (err) {
      console.error("Error deleting report:", err);
    }
  };

  const statusColor = {
    Resolved: "text-green-500",
    Ongoing: "text-yellow-500",
  };

  const calculateExpiryDate = (dateCreated) => {
    return dayjs(dateCreated).add(30, "day").format("MMMM D, YYYY");
  };

  const filteredData =
    selectedCategory === "All"
      ? data
      : selectedCategory === "Flagged"
      ? data.filter((report) => flaggedReports[report._id])
      : data.filter((report) => report.reportStatus === selectedCategory);

  const sidebarItems = ["All", "Ongoing", "Resolved", "Flagged"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 p-6">
      {/* Success message notification (outside of modal) */}
      {deletedReportId && showDeleteSuccess && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fadeIn flex items-center gap-2">
          <span className="text-xl">✅</span>
          <span>Report deleted successfully</span>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-blue-500">🏛️</span> Council Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => getForms().then(setData)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow transition-all duration-200 flex items-center gap-2"
            >
              <span>🔄</span> Refresh Reports
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/5">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg sticky top-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-blue-500">📂</span> Categories
              </h3>
              <ul className="space-y-3">
                {sidebarItems.map((item) => (
                  <li key={item}>
                    <button
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        selectedCategory === item
                          ? "bg-blue-600 text-white shadow-lg transform scale-105"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:transform hover:scale-102"
                      }`}
                      onClick={() => setSelectedCategory(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {loading && (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
                ⚠️ Error: {error.message}
              </div>
            )}

            {filteredData.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredData.map((report) => (
                  <div
                    key={report._id}
                    className={`bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50 rounded-lg p-6 hover:border-blue-500/50 flex flex-col h-full ${
                      deletedReportId === report._id ? "animate-fadeOut" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-200">
                        📝 {report.problemType}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          report.reportStatus === "Resolved"
                            ? "bg-green-500/20 text-green-300"
                            : report.reportStatus === "Ongoing"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {report.reportStatus}
                      </span>
                    </div>

                    <div className="space-y-2 text-gray-400 flex-grow">
                      <p>📍 {report.location}</p>
                      <p>
                        🕒{" "}
                        {dayjs(report.dateCreated).format(
                          "MMMM D, YYYY h:mm A"
                        )}
                      </p>
                      {report.reportStatus === "Resolved" && (
                        <p>
                          ⏳ Expires: {calculateExpiryDate(report.dateCreated)}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedReport(report)}
                      className="mt-6 w-full px-4 py-2 bg-blue-600/90 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <span></span> View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center">
                <p className="text-xl text-gray-400">No reports found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal with fixed positioning and scroll */}
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
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedReport.reportStatus === "Resolved"
                        ? "bg-green-500/20 text-green-300"
                        : selectedReport.reportStatus === "Ongoing"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {selectedReport.reportStatus}
                  </span>
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
                  <div className="space-y-6">
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
                          🕒{" "}
                          {dayjs(selectedReport.dateCreated).format(
                            "MMMM D, YYYY h:mm A"
                          )}
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
                    </div>

                    {/* Details & Notes */}
                    {(selectedReport.details ||
                      selectedReport.note ||
                      (selectedReport.councilNote && selectedReport.councilNote.trim())) && (
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
                              Citizen Note
                            </label>
                            <p className="mt-1 text-gray-200">
                              {selectedReport.note}
                            </p>
                          </div>
                        )}
                        {selectedReport.councilNote && selectedReport.councilNote.trim() && (
                          <div>
                            <label className="text-sm font-medium text-gray-400">
                              Council Note
                            </label>
                            <p className="mt-1 text-gray-200">
                              {selectedReport.councilNote}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Column - Actions & Image */}
                  <div className="space-y-6">
                    {/* Status Update Section */}
                    <div className="bg-gray-700/20 rounded-lg p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Update Status
                        </label>
                        <select
                          value={selectedStatus[selectedReport._id] || ""}
                          onChange={(e) =>
                            setSelectedStatus((prev) => ({
                              ...prev,
                              [selectedReport._id]: e.target.value,
                            }))
                          }
                          disabled={flaggedReports[selectedReport._id] || selectedReport.reportStatus === "Flagged"}
                          className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-200 ${
                            (flaggedReports[selectedReport._id] || selectedReport.reportStatus === "Flagged") 
                            ? "opacity-50 cursor-not-allowed" 
                            : ""
                          }`}
                        >
                          <option value="">Select new status</option>
                          <option value="Ongoing">Ongoing</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>

                      {/* Council Feedback */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Council Feedback
                        </label>
                        <textarea
                          placeholder="Enter feedback for the citizen..."
                          value={councilNotes[selectedReport._id] || ""}
                          onChange={(e) =>
                            setcouncilNotes((prev) => ({
                              ...prev,
                              [selectedReport._id]: e.target.value,
                            }))
                          }
                          rows={3}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-200"
                        />
                      </div>
                    </div>

                    {/* Image Section */}
                    {selectedReport.imageUrl && (
                      <div className="bg-gray-700/20 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Uploaded Evidence
                        </label>
                        <img
                          src={selectedReport.imageUrl}
                          alt="Evidence"
                          className="w-full rounded-lg max-h-60 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-700">
                {showFlagConfirm ? (
                  <div className="bg-gray-700/20 border border-gray-600 rounded-lg p-4">
                    <p className="text-gray-300 mb-4">
                      Are you sure you want to flag this report as false? Once flagged, the status cannot be changed.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleFlagReport(selectedReport._id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                      >
                        Confirm Flag
                      </button>
                      <button
                        onClick={() => setShowFlagConfirm(false)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : showFlagSuccess ? (
                  <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                    <p className="text-green-300">
                      ✅ Report flagged successfully. Closing shortly...
                    </p>
                  </div>
                ) : showDeleteConfirm ? (
                  <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                    <p className="text-red-300 mb-4">
                      Are you sure you want to delete this report? This cannot
                      be undone.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDelete(selectedReport._id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : showDeleteSuccess ? (
                  <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                    <p className="text-green-300">
                      ✅ Report deleted successfully. Closing shortly...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleStatusUpdate(selectedReport._id)}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        ✅ Update Status
                      </button>
                      {selectedReport.reportStatus !== "Flagged" &&
                      !flaggedReports[selectedReport._id] ? (
                        <button
                          onClick={() => setShowFlagConfirm(true)}
                          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          🚩 Flag as False
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-6 py-2 bg-gray-600 text-gray-300 rounded-lg cursor-not-allowed"
                        >
                          🚩 Flagged
                        </button>
                      )}
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      >
                        🗑️ Delete Report
                      </button>
                    </div>
                    {(selectedReport.reportStatus === "Flagged" ||
                      flaggedReports[selectedReport._id]) && (
                      <div className="bg-gray-700/20 border border-gray-600 rounded-lg p-3">
                        <p className="text-gray-300 text-sm">
                          🚩 This report has been flagged as false and is under
                          review
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CouncilHome;