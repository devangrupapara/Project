import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from './Footer';

const Booking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fromDate: '',
    fromTime: '',
    toDate: '',
    toTime: '',
    unlimitedKm: false,
  });
  const [totalPrice, setTotalPrice] = useState('₹0');
  const [validationMessage, setValidationMessage] = useState('');

  const urlParams = new URLSearchParams(window.location.search);
  const vehicleId = urlParams.get('vehicle_id') || 'Unknown Vehicle';

  const formatDateString = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split(' ');
    if (parts.length < 2) return '';
    const [month, day, year] = parts[1].split('/');
    if (!month || !day || !year) return '';
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    return { date: `${year}-${month}-${day}`, time: `${hours}:00` };
  };

  const getDefaultToDateTime = (fromDate, fromTime) => {
    const fromDateTime = new Date(`${fromDate}T${fromTime}`);
    fromDateTime.setHours(fromDateTime.getHours() + 24);
    const year = fromDateTime.getFullYear();
    const month = String(fromDateTime.getMonth() + 1).padStart(2, '0');
    const day = String(fromDateTime.getDate()).padStart(2, '0');
    const hours = String(fromDateTime.getHours()).padStart(2, '0');
    return { date: `${year}-${month}-${day}`, time: `${hours}:00` };
  };

  useEffect(() => {
    const fromDateRaw = urlParams.get('from_date') || '';
    const fromTimeRaw = urlParams.get('from_time') || '';
    const toDateRaw = urlParams.get('to_date') || '';
    const toTimeRaw = urlParams.get('to_time') || '';

    const current = getCurrentDateTime();
    const formattedFromDate = fromDateRaw ? formatDateString(fromDateRaw) : current.date;
    const formattedFromTime = fromTimeRaw || current.time;
    const defaultTo = getDefaultToDateTime(formattedFromDate, formattedFromTime);
    const formattedToDate = toDateRaw ? formatDateString(toDateRaw) : defaultTo.date;
    const formattedToTime = toTimeRaw || defaultTo.time;

    const initialFormData = {
      fromDate: formattedFromDate,
      fromTime: formattedFromTime,
      toDate: formattedToDate,
      toTime: formattedToTime,
      unlimitedKm: false,
    };

    setFormData(initialFormData);
    fetchPriceDetails(initialFormData);
  }, []);

  const fetchPriceDetails = async (data) => {
    const { fromDate, fromTime, toDate, toTime, unlimitedKm } = data;

    if (!fromDate || !fromTime || !toDate || !toTime) {
      setValidationMessage('Please fill in all required fields.');
      setTotalPrice('₹0');
      return;
    }

    const startDateTime = new Date(`${fromDate}T${fromTime}`);
    const endDateTime = new Date(`${toDate}T${toTime}`);

    if (endDateTime <= startDateTime) {
      setValidationMessage('End date/time must be after start date/time');
      setTotalPrice('₹0');
      return;
    }

    setValidationMessage('');

    const apiUrl = `https://velriders.com/api/get-price-details?start_date=${startDateTime.toISOString()}&end_date=${endDateTime.toISOString()}&vehicle_id=${vehicleId}&unlimited_kms=${unlimitedKm ? 1 : 0}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
      const result = await response.json();

      if (!result?.data?.final_amount) {
        throw new Error('Invalid API response format');
      }

      const finalAmount = result.data.final_amount;
      setTotalPrice(`₹${finalAmount}`);

      if (finalAmount === 0) {
        setValidationMessage('Vehicle is not available for this date or time.');
      }
    } catch (error) {
      console.error('Error fetching price details:', error);
      setValidationMessage('Vehicle is not available for this date or time.');
      setTotalPrice('₹0');
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const fieldMap = {
      'from-date': 'fromDate',
      'from-time': 'fromTime',
      'to-date': 'toDate',
      'to-time': 'toTime',
      'unlimited-km': 'unlimitedKm',
    };

    const fieldName = fieldMap[id];
    const updatedFormData = { ...formData, [fieldName]: type === 'checkbox' ? checked : value };

    // Ensure toDate is not before fromDate
    if (fieldName === 'fromDate' && updatedFormData.toDate && new Date(updatedFormData.toDate) < new Date(value)) {
      const defaultTo = getDefaultToDateTime(value, updatedFormData.fromTime);
      updatedFormData.toDate = defaultTo.date;
      updatedFormData.toTime = defaultTo.time;
    }

    setFormData(updatedFormData);

    if (updatedFormData.fromDate && updatedFormData.fromTime && updatedFormData.toDate && updatedFormData.toTime) {
      fetchPriceDetails(updatedFormData);
    }
  };

  const redirectToPayment = () => {
    const { fromDate, fromTime, toDate, toTime, unlimitedKm } = formData;
    const price = totalPrice.replace('₹', '').trim();

    if (!fromDate || !fromTime || !toDate || !toTime) {
      setValidationMessage('Please fill in all required fields.');
      return;
    }

    const start = new Date(`${fromDate}T${fromTime}`);
    const end = new Date(`${toDate}T${toTime}`);
    if (end <= start) {
      setValidationMessage('End date/time must be after start date/time');
      return;
    }

    if (price === '0' || price === '') {
      setValidationMessage('Vehicle is not available for this date or time.');
      return;
    }

    navigate(
      `/summary?vehicle_id=${vehicleId}&from_date=${fromDate}&from_time=${fromTime}&to_date=${toDate}&to_time=${toTime}&unlimited_km=${
        unlimitedKm ? 1 : 0
      }&total_price=${price}`
    );
  };

  // Get today's date for min attribute
  const today = getCurrentDateTime().date;

  return (
    <>
      <div className="font-poppins min-h-screen bg-gray-100 text-black">
        {/* Back Button */}
        <button className="p-3 flex items-center gap-2 text-lg" onClick={() => navigate('/')}>
          <ArrowLeft size={32} /> Back
        </button>

        {/* Booking Form */}
        <div className="flex-grow flex justify-center items-center p-5">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {/* From */}
            <div className="mb-4 flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label htmlFor="from-date" className="block text-sm font-medium mb-1">
                  From Date*
                </label>
                <input
                  type="date"
                  id="from-date"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                  min={today}
                  className="w-full p-2 rounded bg-gray-200 text-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="from-time" className="block text-sm font-medium mb-1">
                  From Time*
                </label>
                <input
                  type="time"
                  id="from-time"
                  value={formData.fromTime}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-200 text-gray-600 focus:outline-none"
                />
              </div>
            </div>

            {/* To */}
            <div className="mb-4 flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label htmlFor="to-date" className="block text-sm font-medium mb-1">
                  To Date*
                </label>
                <input
                  type="date"
                  id="to-date"
                  value={formData.toDate}
                  onChange={handleInputChange}
                  min={formData.fromDate || today}
                  className="w-full p-2 rounded bg-gray-200 text-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="to-time" className="block text-sm font-medium mb-1">
                  To Time*
                </label>
                <input
                  type="time"
                  id="to-time"
                  value={formData.toTime}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-200 text-gray-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Unlimited Km Toggle Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="unlimited-km" className="text-black font-medium text-base">
                  Unlimited Kilometers
                </label>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${formData.unlimitedKm ? 'text-green-600' : 'text-red-500'}`}>
                    {formData.unlimitedKm ? 'Enabled' : 'Disabled'}
                  </span>

                  {/* Toggle Switch */}
                  <label className="relative inline-block w-11 h-6">
                    <input
                      type="checkbox"
                      id="unlimited-km"
                      checked={formData.unlimitedKm}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="bg-gray-300 peer-checked:bg-teal-600 w-full h-full rounded-full transition duration-300"></div>
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition duration-300"></div>
                  </label>
                </div>
              </div>

              {!formData.unlimitedKm && (
                <p className="text-sm text-red-600 mt-2">
                  You’ve selected the 300 km limit plan. Extra charges will apply if you exceed the limit.
                </p>
              )}
            </div>

            {/* Validation */}
            {validationMessage && <div className="text-red-600 mb-4">{validationMessage}</div>}

            {/* Price */}
            <div className="font-bold text-lg mb-4">{totalPrice}</div>

            {/* Confirm */}
            <button
              onClick={redirectToPayment}
              className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
            >
              Confirm your booking
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;