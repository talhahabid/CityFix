import { useState, useRef } from "react";
import { useSignOut } from "../hooks/useSignOut";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function SubmitReport() {
  const { submitForm, loading, error } = useSubmitForm();
  const { user } = useAuthContext();
  const { signOut } = useSignOut();
  const [formData, setFormData] = useState({
    location: "",
    problemType: "",
    image: null,
    receiveNotification: false,
  });
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [zoomLevel, setZoomLevel] = useState(13);
  const [marker, setMarker] = useState(null);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitForm(formData);
  };

  const fetchCoordinates = async () => {
    if (!formData.location) return;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${formData.location}`
    );
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon, display_name } = data[0];
      setFormData((prev) => ({ ...prev, location: display_name }));
      setMapCenter([parseFloat(lat), parseFloat(lon)]);
      setZoomLevel(15);
      setMarker([parseFloat(lat), parseFloat(lon)]);
    }
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setMarker([e.latlng.lat, e.latlng.lng]);
      },
    });
    return marker ? <Marker position={marker} /> : null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-6">
      
      {/* 🧾 Instruction Card */}
      <div className="bg-gray-800 border border-gray-700 text-gray-100 rounded-lg p-4 w-full max-w-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">🛠 How to Report an Issue</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>📍 Enter the location manually or use the map to drop a pin.</li>
          <li>⚠️ Describe the problem clearly (e.g. pothole, streetlight out).</li>
          <li>📷 Upload an optional image to help identify the issue.</li>
          <li>📩 Enable notifications if you'd like to receive updates.</li>
          <li>🚀 Click "Submit" to send your report to the city team.</li>
        </ul>
      </div>

      {/* 🔒 Form Container */}
      <div className="bg-gray-800 border border-gray-700 shadow-lg rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">📝 Citizen Report</h1>
          <button
            className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg text-white"
            onClick={signOut}
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">📍 Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              ref={inputRef}
              className="bg-gray-900 border border-gray-600 text-gray-100 p-2 w-full rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter location"
            />
            <button
              type="button"
              onClick={fetchCoordinates}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              🔍 Search Location
            </button>
          </div>

          <div>
            <label className="block font-medium mb-1">⚠️ Problem Type</label>
            <input
              type="text"
              name="problemType"
              value={formData.problemType}
              onChange={handleChange}
              className="bg-gray-900 border border-gray-600 text-gray-100 p-2 w-full rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="e.g. Broken streetlight"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">📷 Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="bg-gray-900 border border-gray-600 text-gray-100 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="receiveNotification"
              checked={formData.receiveNotification}
              onChange={handleChange}
              className="h-5 w-5 text-blue-500 bg-gray-700 border-gray-600 focus:ring focus:ring-blue-500"
            />
            <span>📩 Receive Notifications</span>
          </div>

          {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50 w-full"
          >
            {loading ? "Submitting..." : "🚀 Submit"}
          </button>
        </form>
      </div>

      {/* 🗺️ Map */}
      <div className="mt-6 w-full max-w-lg">
        <MapContainer center={mapCenter} zoom={zoomLevel} style={{ width: "100%", height: "300px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
}

export default SubmitReport;