import { useState, useRef } from "react";
import { useSignOut } from "../hooks/useSignOut";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function CitizenHome() {
  const { submitForm, loading, error } = useSubmitForm();
  const { user } = useAuthContext();
  const { signOut } = useSignOut();
  const [formData, setFormData] = useState({
    location: "",
    problemType: "",
    image: null,
    receiveNotification: false,
  });
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default to London
  const [zoomLevel, setZoomLevel] = useState(13); // Default zoom level
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
      setZoomLevel(15); // Zoom in more after finding the location
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Citizen Report</h1>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={signOut}
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              ref={inputRef}
              className="border p-2 w-full rounded-md focus:ring focus:ring-blue-200"
              required
            />
            <button
              type="button"
              onClick={fetchCoordinates}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Search Location
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Problem Type</label>
            <input
              type="text"
              name="problemType"
              value={formData.problemType}
              onChange={handleChange}
              className="border p-2 w-full rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="border p-2 w-full rounded-md focus:ring focus:ring-blue-200"
              accept="image/*"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="receiveNotification"
              checked={formData.receiveNotification}
              onChange={handleChange}
              className="h-5 w-5 text-blue-500 focus:ring focus:ring-blue-200"
            />
            <span className="text-gray-700">Receive Notifications</span>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Always Visible Map Below Location Input */}
      <div className="mt-6 w-full max-w-lg">
        <MapContainer center={mapCenter} zoom={zoomLevel} style={{ width: "100%", height: "300px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
}

export default CitizenHome;
