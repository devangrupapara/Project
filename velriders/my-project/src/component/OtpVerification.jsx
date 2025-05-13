import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/userSlice";
import Footer from "./Footer";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const { phone } = location.state || {};

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    if (otp.every((digit) => digit)) {
      // Simulate successful OTP verification and store user data
      const userData = { phone, isLoggedIn: true };
      dispatch(loginUser(userData)); // Store login state in Redux
      navigate("/ConfirmI");
    } else {
      alert("Please fill all OTP fields.");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow flex justify-center items-center px-4">
        <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg text-center">
          <h4 className="text-lg font-semibold">Login with OTP</h4>
          <h2 className="text-2xl font-bold mt-1">OTP Verification</h2>
          <p className="text-gray-700 mt-1">We will send you one time password</p>

          <div className="flex justify-center mt-6 space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-10 h-10 text-center border border-gray-300 rounded bg-gray-100 text-lg"
              />
            ))}
          </div>

          <div className="text-sm text-gray-700 mt-4">
            Didn't get OTP yet?{" "}
            <button className="text-teal-500 hover:underline">Send again</button>
          </div>

          <button
            onClick={handleVerify}
            className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded transition"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default OtpVerification;