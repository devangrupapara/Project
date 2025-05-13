import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Home from "./component/Home";
import About from "./component/About";
import ContactUs from "./component/ContactUs";
import LoginSignup from "./component/Loginsignup";
import ViewAll from "./component/ViewAll";
import Rent from "./component/Rent";
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import Booking from "./component/Booking";
import PriceSummary from "./component/PriceSummary";
import OtpVerification from "./component/OtpVerification";
import ConfirmInformation from "./component/ConfirmInformation";
import Payment from "./component/Payment";
import PrivacyPolicy from "./component/PrivacyPolicy";
import TermsConditions from "./component/TermsConditions";
import ErrorBoundary from "./component/ErrorBoundary";
import ScrollToTop from "./component/ScrollToTop"; // Import the ScrollToTop component

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <div className="flex">
          <Sidebar />
          
          {/* ✅ Corrected scroll container with proper id and className */}
          <div id="main-scroll-container" className="w-full overflow-y-auto h-screen">
            <ErrorBoundary>
              <Navbar />
            </ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/viewall" element={<ViewAll />} />
              <Route path="/rentnow" element={<Rent />} />
              <Route path="/summary" element={<PriceSummary />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/otp" element={<OtpVerification />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/ConfirmI" element={<ConfirmInformation />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/pay" element={<Payment />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
