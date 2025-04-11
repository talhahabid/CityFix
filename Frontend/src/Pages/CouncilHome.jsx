import React, { useEffect, useState } from "react";
import { useGetForm } from "../hooks/useGetForms";
import { useEditForm } from "../hooks/useEditForm";
import dayjs from "dayjs";

function CouncilHome() {
  const { getForms, loading, error } = useGetForm();
  const { editForm } = useEditForm();
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [notes, setNotes] = useState({});
  const [flaggedReports, setFlaggedReports] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getForms();
        if (Array.isArray(fetchedData)) {
          const filteredData = fetchedData.filter((report) => {
            const daysPassed = dayjs().diff(dayjs(report.dateSubmitted), "day");
            return report.reportStatus !== "Resolved" || daysPassed < 30;
          });
          setData(filteredData);
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
    const newStatus = selectedStatus[_id];
    const note = notes[_id] || "";
    if (!newStatus) return;

    try {
      const updatedReport = await editForm(_id, newStatus, note);
      if (updatedReport) {
        setData((prev) =>
          prev.map((report) =>
            report._id === _id ? { ...report, reportStatus: newStatus } : report
          )
        );
        setNotes((prev) => ({ ...prev, [_id]: "" }));
        setSelectedStatus((prev) => ({ ...prev, [_id]: "" }));
        setSelectedReport(null);
      }
    } catch (err) {
      console.error("Error updating report status:", err);
    }
  };

  const handleFlagReport = (_id) => {
    const confirm = window.confirm("Are you sure you want to flag this report as false?");
    if (confirm) {
      setFlaggedReports((prev) => ({ ...prev, [_id]: true }));
      alert("🚩 Report flagged successfully!");
    }
  };

  const statusColor = {
    Resolved: "text-green-500",
    Ongoing: "text-yellow-500",
  };

  const calculateExpiryDate = (dateSubmitted) => {
    return dayjs(dateSubmitted).add(30, "day").format("MMMM D, YYYY");
  };

  const filteredData =
    selectedCategory === "All"
      ? data
      : selectedCategory === "Flagged"
      ? data.filter((report) => flaggedReports[report._id])
      : data.filter((report) => report.reportStatus === selectedCategory);

  const sidebarItems = ["All", "Ongoing", "Resolved", "Flagged"];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Council Dashboard</h1>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/5 bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📂 Categories</h3>
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      selectedCategory === item
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                    onClick={() => setSelectedCategory(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main content */}
          <div className="w-4/5 pl-6">
            <div className="flex justify-end mb-6">
              <button
                onClick={() => getForms().then(setData)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
              >
                🔄 Refresh Reports
              </button>
            </div>

            {loading && <p className="text-center text-lg">Loading reports...</p>}
            {error && <p className="text-red-500 text-center">Error: {error.message}</p>}

            {filteredData.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredData.map((report) => (
                  <div
                    key={report._id}
                    className="bg-gray-800 shadow-lg hover:shadow-xl transition duration-200 border border-gray-700 rounded-lg p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-200 mb-1">
                      📝 {report.problemType}
                    </h3>
                    <p className="text-sm text-gray-400 mb-1">
                      📍 Location: {report.location}
                    </p>
                    <p className="text-sm mb-2">
                      📊 Status:{" "}
                      <span
                        className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                          statusColor[report.reportStatus] || "text-gray-400"
                        }`}
                      >
                        {report.reportStatus}
                      </span>
                    </p>
                    {report.reportStatus === "Resolved" && (
                      <p className="text-sm text-gray-400 mb-2">
                        ⏳ Expires on: {calculateExpiryDate(report.dateSubmitted)}
                      </p>
                    )}
                    <p className="text-sm text-gray-400">
                      🕒 Submitted on:{" "}
                      {dayjs(report.dateSubmitted).format("MMMM D, YYYY h:mm A")}
                    </p>
                    {report.details && (
                      <p className="text-gray-400 text-sm mt-2">🗒️ {report.details}</p>
                    )}
                    {report.imageUrl && (
                      <img
                        src={report.imageUrl}
                        alt="Uploaded evidence"
                        className="w-full mt-3 rounded-lg max-h-64 object-cover"
                      />
                    )}
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
                      >
                        View Full Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 text-lg">
                No reports found for selected category.
              </p>
            )}
          </div>
        </div>
      </div>

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
                  statusColor[selectedReport.reportStatus] || "text-gray-400"
                }`}
              >
                {selectedReport.reportStatus}
              </span>
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Update Status:
              </label>
              <select
                value={selectedStatus[selectedReport._id] || ""}
                onChange={(e) =>
                  setSelectedStatus((prev) => ({
                    ...prev,
                    [selectedReport._id]: e.target.value,
                  }))
                }
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-gray-200"
              >
                <option value="">Select</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <textarea
              placeholder="📝 Optional feedback..."
              value={notes[selectedReport._id] || ""}
              onChange={(e) =>
                setNotes((prev) => ({
                  ...prev,
                  [selectedReport._id]: e.target.value,
                }))
              }
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 mb-4 text-sm text-gray-200"
            />
            <div className="flex gap-3">
              <button
                onClick={() => handleStatusUpdate(selectedReport._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                ✅ Update Status
              </button>
              <button
                onClick={() => handleFlagReport(selectedReport._id)}
                className={`px-4 py-2 rounded-lg text-white ${
                  flaggedReports[selectedReport._id]
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                disabled={flaggedReports[selectedReport._id]}
              >
                🚩 {flaggedReports[selectedReport._id] ? "Flagged" : "Flag as False"}
              </button>
              <button
                onClick={() => setSelectedReport(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                ❌ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CouncilHome;
