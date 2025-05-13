import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const ConfirmInformation = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/'); // Navigate to homepage after submission
  };

  return (
    <>
    <div className="min-h-screen flex flex-col bg-white">
      <div className="mt-8 ml-16 sm:ml-6">
        <button
          className="bg-white border-none cursor-pointer"
          onClick={() => navigate('/otp')}
        >
          <img src="/image/back2.png" alt="Back" className="h-6" />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
          <h3 className="text-center text-xl font-semibold mb-6">
            Confirm Information
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="text-sm text-gray-600">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ConfirmInformation;