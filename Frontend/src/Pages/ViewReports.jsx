import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetForm } from "../hooks/useGetForms";
import { useAuthContext } from "../hooks/useAuthContext";

function ViewReports() {
  const { getForms, loading, error } = useGetForm();
  const { user } = useAuthContext();
  const [userReports, setUserReports] = useState([]);
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
              <p className="text-sm text-gray-300">Location: {report.location}</p>
              <p className="text-sm text-gray-300">Status: {report.reportStatus}</p>
              {report.note && report.note.trim() !== "" && (
                <p className="text-sm text-gray-300 mt-2">📝 Note: {report.note}</p>
              )}
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
    </div>
  );
}

export default ViewReports;
