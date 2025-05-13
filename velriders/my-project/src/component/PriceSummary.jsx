import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import discountIcon from '../assets/image2/discount-percent-line.png';
import { ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import Footer from './Footer';
import {
  fetchVehicleDetails,
  fetchCoupons,
  setCouponCode,
  applyCoupon,
  removeCoupon,
  toggleShowAllCoupons,
  setInitialPrice,
} from '../Redux/priceSummarySlice';

const PriceSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const finalAmountRef = useRef(null);

  // Select state from Redux store
  const { isLoggedIn } = useSelector((state) => state.user);
  const {
    vehicleDetails,
    couponCode,
    couponMessage,
    totalPrice,
    finalAmount,
    couponApplied,
    coupons,
    showAllCoupons,
    discountAmount,
    convenienceFee,
    loading,
    error,
  } = useSelector((state) => state.priceSummary);

  const getUrlParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options).replace(',', '');
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert('Razorpay SDK failed to load. Please try again.');
      return;
    }

    const options = {
      key: 'rzp_live_8ZEwbQZNhlfNwH',
      amount: (finalAmount * 100).toString(),
      currency: 'INR',
      name: 'Velriders',
      description: `Payment for ${vehicleDetails.name} rental`,
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        console.log(response);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    const vehicleId = getUrlParameter('vehicle_id') || '';
    const totalPriceRaw = getUrlParameter('total_price') || '0';
    const parsedTotalPrice = parseFloat(totalPriceRaw.replace(/,/g, '')) || 0;

    // Set initial price
    dispatch(setInitialPrice({ totalPrice: parsedTotalPrice }));

    // Fetch vehicle details and coupons
    if (vehicleId) {
      dispatch(fetchVehicleDetails(vehicleId));
      dispatch(fetchCoupons({ vehicleId, totalPrice: parsedTotalPrice }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (couponApplied && finalAmountRef.current) {
      finalAmountRef.current.scrollIntoView({ behavior: 'smooth' });
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.1 },
        startVelocity: 30,
        gravity: 0.5,
      });
    }
  }, [couponApplied]);

  const taxAmount = totalPrice * 0.18;
  const totalBeforeDiscount = totalPrice + taxAmount + convenienceFee;

  return (
    <>
      <div className="font-poppins px-4 sm:px-6 py-6">
        <button className="mb-10 flex items-center gap-2 text-lg" onClick={() => navigate('/')}>
          <ArrowLeft size={32} /> Back
        </button>

        <div className="flex flex-col items-center justify-center min-h-screen w-full">
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-600">Error: {error}</div>}
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-6 sm:p-10 gap-8 w-full max-w-2xl">
            {/* Vehicle Info */}
            <div className="flex w-full h-32 rounded-lg gap-12 items-center p-4 border-2 border-gray-200">
              <img src={vehicleDetails.image} alt="Vehicle" className="h-24" />
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold uppercase">{vehicleDetails.name}</h3>
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col">
                    <h5 className="text-sm">{formatDate(getUrlParameter('from_date'))}</h5>
                    <p className="text-gray-500">{getUrlParameter('from_time')}</p>
                  </div>
                  <span className="text-gray-500">→</span>
                  <div className="flex flex-col">
                    <h5 className="text-sm">{formatDate(getUrlParameter('to_date'))}</h5>
                    <p className="text-gray-500">{getUrlParameter('to_time')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="border-2 border-gray-200 p-6 sm:p-8 rounded-lg flex flex-col items-center gap-4 w-full">
              <button className="bg-teal-100 text-teal-600 rounded-md px-4 py-2 font-semibold uppercase">
                Price Summary
              </button>

              <div className="w-full flex justify-between py-4 border-t border-gray-200">
                <span>Trip Amount (excludes fuel)</span>
                <span className="text-gray-500">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="w-full flex justify-between py-4 border-t border-gray-200">
                <span>Tax Amount</span>
                <span className="text-gray-500">₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="w-full flex justify-between py-4 border-t border-gray-200">
                <span>Convenience Fee</span>
                <span className="text-gray-500">+₹{convenienceFee}</span>
              </div>
              <div className="w-full flex justify-between py-4 border-t border-gray-200">
                <span>Total Price</span>
                <span className="text-gray-500">₹{totalBeforeDiscount.toFixed(2)}</span>
              </div>

              {couponApplied && (
                <div className="w-full flex justify-between py-4 border-t border-gray-200">
                  <span>
                    Coupon Discount
                    <span className="ml-2 text-teal-600 text-xs bg-teal-100 px-2 py-0.5 rounded-full uppercase">
                      {couponCode}
                    </span>
                  </span>
                  <span className="text-green-600 font-semibold">-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div ref={finalAmountRef} className="w-full flex justify-between py-4 border-t border-gray-200">
                <span>Final Amount</span>
                <span className="text-black font-semibold">₹{finalAmount.toFixed(2)}</span>
              </div>

              <button
                className="w-full bg-teal-600 text-white rounded-lg py-3 uppercase font-semibold"
                onClick={handlePayment}
              >
                Pay Now
              </button>
            </div>

            {/* Coupons */}
            <div className="flex flex-col w-full gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={discountIcon} alt="Discount" className="w-10 h-10 bg-teal-100 rounded-full p-2" />
                  <h2 className="text-lg font-semibold">Apply Coupon Code</h2>
                </div>
                <button
                  className="border border-teal-400 text-teal-500 font-medium px-4 py-1 rounded-full text-sm hover:bg-teal-50 transition"
                  onClick={() => dispatch(toggleShowAllCoupons())}
                >
                  {showAllCoupons ? 'Hide Coupons' : 'All Coupons'}
                </button>
              </div>

              <div className="flex rounded-md border border-gray-300 overflow-hidden">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => dispatch(setCouponCode(e.target.value))}
                  placeholder="Enter Your Coupon Code"
                  className="w-full px-4 py-3 outline-none text-sm sm:text-base"
                  onKeyDown={(e) => e.key === 'Enter' && dispatch(applyCoupon())}
                />

                <button
                  onClick={() => dispatch(applyCoupon())}
                  className="bg-teal-100 text-teal-600 font-semibold px-6 text-sm sm:text-base uppercase"
                >
                  Apply
                </button>
              </div>

              {couponMessage && (
                <div className="text-red-600 text-sm font-medium">{couponMessage}</div>
              )}

              {couponApplied && (
                <button
                  onClick={() => dispatch(removeCoupon())}
                  className="text-red-500 text-sm underline"
                >
                  Remove Coupon
                </button>
              )}

              {showAllCoupons && coupons.length > 0 && (
                <div className="w-full border border-teal-200 rounded-md p-4 space-y-2 bg-teal-50">
                  <h3 className="font-semibold text-teal-700 mb-2">Available Coupons:</h3>
                  {coupons.map((coupon, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-white border border-gray-300 rounded-md p-3 hover:bg-teal-100 transition cursor-pointer"
                      onClick={() => {
                        dispatch(setCouponCode(coupon.code));
                        dispatch(applyCoupon());
                      }}
                    >
                      <div>
                        <p className="font-medium">{coupon.code}</p>
                        <p className="text-sm text-gray-500">{coupon.description}</p>
                      </div>
                      <span className="text-sm text-teal-600">
                        {coupon.type === 'percentage'
                          ? `${coupon.percentage_discount}% off`
                          : `₹${coupon.fixed_discount_amount} off`}
                      </span>
                    </div>
                  ))}
                </div>

              )}
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PriceSummary;