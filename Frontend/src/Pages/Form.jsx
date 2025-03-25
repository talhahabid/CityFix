import React, { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    situation: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col bg-white p-6 rounded shadow-md w-96">
        <div className="mb-4">
          <label htmlFor="name" className="block">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="px-3 py-3 border w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="situation" className="block">Situation</label>
          <input
            type="text"
            id="situation"
            name="situation"
            placeholder="Situation"
            className="px-3 py-3 border w-full"
            value={formData.situation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            className="px-3 py-3 border w-full"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="mt-3 px-4 py-2 bg-blue-500 text-white w-full">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
