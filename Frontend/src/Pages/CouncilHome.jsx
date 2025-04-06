import React, { useEffect, useState } from "react";
import { useGetForm } from "../hooks/useGetForms";
import { useEditForm } from "../hooks/useEditForm";

function CouncilHome() {
  const { getForms, loading, error } = useGetForm();
  const { editForm } = useEditForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const fetchedData = await getForms();
        console.log("Fetched data:", fetchedData);
        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else {
          console.error("Fetched data is not an array:", fetchedData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleStatusUpdate = async (_id, newStatus) => {
    try {
      const updatedReport = await editForm(_id, newStatus);
      if (updatedReport) {
        setData((prevData) =>
          prevData.map((report) =>
            report._id === _id ? { ...report, reportStatus: newStatus } : report
          )
        );
      }
    } catch (err) {
      console.error("Error updating report status:", err);
    }
  };

  return (
    <div>
      <h2>Reports</h2>
      <button onClick={() => getForms().then(setData)}>Refresh</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message || "Something went wrong"}</p>}
      {data.length > 0 ? (
        <ul>
          {data.map((report) => (
            <li key={report._id} style={{ marginBottom: "10px" }}>
              <strong>Problem:</strong> {report.problemType} <br />
              <strong>Location:</strong> {report.location} <br />
              <strong>Status:</strong> {report.reportStatus} <br />
              <button onClick={() => handleStatusUpdate(report._id, "Rejected")}>
                Reject
              </button>
              <button
                onClick={() => handleStatusUpdate(report._id, "Resolved")}
                style={{ marginLeft: "10px" }}
              >
                Resolve
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reports available.</p>
      )}
    </div>
  );
}

export default CouncilHome;
