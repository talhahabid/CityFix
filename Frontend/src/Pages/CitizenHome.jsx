import { useState } from "react";
import { useSignOut } from "../hooks/useSignOut";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSubmitForm } from "../hooks/useSubmitForm";

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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : type === "radio" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitForm(formData);
  };

  return (
    <div className="p-6">
      <button
        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
        onClick={signOut}
      >
        Logout
      </button>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <label className="block">
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            required
          />
        </label>

        <label className="block">
          Problem Type:
          <input
            type="text"
            name="problemType"
            value={formData.problemType}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            required
          />
        </label>

        <label className="block">
          Upload Image:
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            accept="image/*"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="receiveNotification"
            checked={formData.receiveNotification}
            onChange={handleChange}
          />
          Receive Notifications
        </label>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CitizenHome;
