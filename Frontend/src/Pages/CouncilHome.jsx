import React, { useEffect, useState } from "react";
import { useGetForm } from "../hooks/useGetForms";

function CouncilHome() {
  const { getForms, loading, error } = useGetForm();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      const fetchedData = await getForms();
      console.log("Fetched data:", fetchedData); // Log the fetched data
      setData(fetchedData);
    };

    fetchData();
  }, []); // This ensures it runs only once

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message || "Something went wrong"}</p>}
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
}

export default CouncilHome;
