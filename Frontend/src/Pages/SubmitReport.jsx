import { useState, useRef, useEffect } from "react";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

function SubmitReport() {
  const { submitForm, loading, error } = useSubmitForm();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: "",
    problemType: "",
    image: null,
    receiveNotification: false,
    additionalDetails: "",
  });
  const [mapCenter, setMapCenter] = useState([43.65107, -79.347015]); // Default to Toronto
  const [marker, setMarker] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      const redirectTimer = setTimeout(() => {
        navigate("/submission-successful");
      }, 2000);
      return () => clearTimeout(redirectTimer);
    }
  }, [isSubmitted, navigate]);

  useEffect(() => {
    if (isSubmitted) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSubmitted]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.location) {
      alert("Please select a location on the map.");
      return;
    }

    try {
      const response = await submitForm(formData);
      if (response.error === "Duplicate form") {
        alert("You have already submitted a similar report. Please wait before submitting again.");
        return;
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (err) {
      console.error("Error getting address:", err);
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;
        setMarker([lat, lng]);
        const address = await getAddressFromCoords(lat, lng);
        setFormData((prev) => ({
          ...prev,
          location: address,
        }));
      },
    });
    return marker ? <Marker position={marker} /> : null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Submit a Report</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
            onClick={() => navigate("/Citizen")}
          >
            <span>🏠</span> Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">📝 Report Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">📍 Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-gray-900 border border-gray-600 text-gray-100 p-2 w-full rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter address or select on map"
                />
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
                <div className="relative">
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                  <div className="bg-gray-900 border border-gray-600 text-gray-100 p-2 w-full rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {formData.image ? formData.image.name : "Choose a file..."}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">🗒️ Additional Details (Optional)</label>
                <textarea
                  name="additionalDetails"
                  value={formData.additionalDetails || ""}
                  onChange={handleChange}
                  className="bg-gray-900 border border-gray-600 text-gray-100 p-2 w-full rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide more details about the issue (optional)"
                  rows={4}
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
              {isSubmitted && (
                <div className="bg-green-800 border border-green-600 text-green-100 p-3 rounded-md">
                  ✅ Report submitted successfully! Redirecting...
                </div>
              )}

              <button
                type="submit"
                disabled={loading || isSubmitted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50 w-full"
              >
                {loading ? "Submitting..." : isSubmitted ? "Submitted ✓" : "🚀 Submit"}
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">📍 Select Location</h2>
            <div className="h-64 rounded-lg overflow-hidden">
              <MapContainer
                center={mapCenter}
                zoom={13}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
              </MapContainer>
            </div>
            {marker && (
              <p className="mt-4 text-sm text-gray-400">
                Selected Location: {formData.location}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitReport;