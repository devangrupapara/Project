import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const LoginSignup = () => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (phone) {
      navigate('/otp', { state: { phone } }); // Pass phone number to OTP page
    } else {
      alert('Please enter your phone number.');
    }
  };

  return (
    <>
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Login / Sign Up</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center border border-gray-300 rounded">
              <div className="flex items-center border-r border-gray-300 px-2">
                <img src="https://flagcdn.com/24x18/in.png" alt="India Flag" className="h-5" />
                <span className="ml-2">+91</span>
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-grow p-2 outline-none"
              />
            </div>
            <button type="submit" className="bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition">
              GET OTP
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600 text-center">
            By creating an account, I agree to{' '}
            <a href="#" className="text-teal-600 hover:underline">Terms of Services</a>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default LoginSignup;