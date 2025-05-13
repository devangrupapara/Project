import React from 'react';

const Payment = () => {
  // Function to load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Function to handle payment
  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert('Razorpay SDK failed to load. Please try again.');
      return;
    }

    const options = {
      key: 'rzp_live_8ZEwbQZNhlfNwH', // Your Razorpay Live Key ID
      amount: '500000', // Amount in paise (e.g., 500 INR = 50000 paise)
      currency: 'INR',
      name: 'Your Company', // Replace with your company name
      description: 'Payment for product or service',
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        console.log(response);
        // You can handle the response here (e.g., save to backend)
      },
      prefill: {
        name: 'Customer Name', // Replace with dynamic user data if needed
        email: 'customer@example.com',
        contact: '9313450634',
      },
      theme: {
        color: '#3399cc', // Customize the theme color
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <h1>Payment with Razorpay</h1>
      <button
        onClick={handlePayment}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3399cc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;