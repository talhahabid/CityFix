import React, { useEffect, useState } from "react";
import { useGetForm } from "../hooks/useGetForms";
import { useEditForm } from "../hooks/useEditForm";
import dayjs from "dayjs"; // Import dayjs for date calculations

function CouncilHome() {
  const { getForms, loading, error } = useGetForm();
  const { editForm } = useEditForm();
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [notes, setNotes] = useState({});
  const [flaggedReports, setFlaggedReports] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

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
    if (!newStatus) return;

    try {
      const updatedReport = await editForm(_id, newStatus, notes[_id] || "");
      if (updatedReport) {
        setData((prev) =>
          prev.map((report) =>
            report._id === _id ? { ...report, reportStatus: newStatus } : report
          )
        );
        setNotes((prev) => ({ ...prev, [_id]: "" }));
        setSelectedStatus((prev) => ({ ...prev, [_id]: "" }));
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
    Resolved: "bg-green-100 text-green-700",
    Ongoing: "bg-yellow-100 text-yellow-700",
  };

  // Filter logic
  const filteredData =
    selectedCategory === "All"
      ? data
      : selectedCategory === "Flagged"
      ? data.filter((report) => flaggedReports[report._id])
      : data.filter((report) => report.reportStatus === selectedCategory);

  const sidebarItems = ["All", "Ongoing", "Resolved", "Flagged"];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-4 h-full min-h-screen shadow-md">
        <h3 className="text-xl font-semibold mb-4">📂 Categories</h3>
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedCategory === item
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 hover:bg-blue-100"
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
      <div className="w-4/5 p-6">
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
            {filteredData.map((report) => {
              const daysPassed = dayjs().diff(dayjs(report.dateSubmitted), "day");
              const isExpiring = report.reportStatus === "Resolved";
              const daysRemaining = 30 - daysPassed;

              return (
                <div
                  key={report._id}
                  className="bg-white shadow-md hover:shadow-lg transition duration-200 border border-gray-200 rounded-xl p-6"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div />
                    <div className="text-right text-sm text-gray-500 italic">
                      <p>
                        🕒{" "}
                        {daysPassed === 0
                          ? "Today"
                          : `${daysPassed} day${daysPassed > 1 ? "s" : ""} ago`}
                      </p>
                      {isExpiring && (
                        <p className={daysRemaining <= 0 ? "text-red-500" : ""}>
                          ⏳{" "}
                          {daysRemaining <= 0
                            ? "Expired"
                            : `Expires in ${daysRemaining} day${
                                daysRemaining > 1 ? "s" : ""
                              }`}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      📝 {report.problemType}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      📍 Location: {report.location}
                    </p>
                    <p className="text-sm mb-2">
                      📊 Status:{" "}
                      <span
                        className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                          statusColor[report.reportStatus] ||
                          "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {report.reportStatus}
                      </span>
                    </p>
                    {report.details && (
                      <p className="text-gray-700 text-sm mb-2">🗒️ {report.details}</p>
                    )}
                    {report.imageUrl && (
                      <img
                        src={report.imageUrl}
                        alt="Uploaded evidence"
                        className="w-full mt-3 rounded-lg max-h-64 object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div className="flex gap-2 items-center">
                      <label className="font-medium">📌 Update Status:</label>
                      <select
                        value={selectedStatus[report._id] || ""}
                        onChange={(e) =>
                          setSelectedStatus((prev) => ({
                            ...prev,
                            [report._id]: e.target.value,
                          }))
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="">Select</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                  </div>

                  <textarea
                    placeholder="📝 Optional notes..."
                    value={notes[report._id] || ""}
                    onChange={(e) =>
                      setNotes((prev) => ({
                        ...prev,
                        [report._id]: e.target.value,
                      }))
                    }
                    rows={2}
                    className="w-full border rounded px-3 py-2 mb-3 text-sm"
                  />

                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => handleStatusUpdate(report._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      ✅ Submit
                    </button>
                    <button
                      onClick={() => handleFlagReport(report._id)}
                      className={`px-4 py-2 rounded-lg text-white ${
                        flaggedReports[report._id]
                          ? "bg-gray-500"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                      disabled={flaggedReports[report._id]}
                    >
                      🚩{" "}
                      {flaggedReports[report._id] ? "Flagged" : "Flag as False"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No reports found for selected category.
          </p>
        )}
      </div>
    </div>
  );
}

export default CouncilHome;
