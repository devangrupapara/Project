import React from 'react';
import { motion } from 'framer-motion';
import carImage from '../assets/car1.png';
import bikeImage from '../assets/bike.png';
import backgroundImage from '../assets/bkg.png';

const HeroSection = ({
  rentalType,
  setRentalType,
  pickupDate,
  setPickupDate,
  pickupTime,
  setPickupTime,
  dropoffDate,
  setDropoffDate,
  dropoffTime,
  setDropoffTime,
  handleSearch,
  animate,
}) => {
  const today = new Date().toISOString().split('T')[0];

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handlePickupDateChange = (e) => {
    const newPickupDate = e.target.value;
    setPickupDate(newPickupDate);
    if (dropoffDate && newPickupDate > dropoffDate) {
      setDropoffDate('');
      setDropoffTime('');
    }
  };

  const handlePickupTimeChange = (e) => {
    const newPickupTime = e.target.value;
    setPickupTime(newPickupTime);
    if (pickupDate === dropoffDate && dropoffTime && newPickupTime >= dropoffTime) {
      setDropoffTime('');
    }
  };

  const handleDropoffDateChange = (e) => {
    const newDropoffDate = e.target.value;
    if (!pickupDate || newDropoffDate >= pickupDate) {
      setDropoffDate(newDropoffDate);
    }
  };

  const handleDropoffTimeChange = (e) => {
    const newDropoffTime = e.target.value;
    if (
      pickupDate &&
      pickupTime &&
      (pickupDate < dropoffDate || (pickupDate === dropoffDate && newDropoffTime > pickupTime))
    ) {
      setDropoffTime(newDropoffTime);
    }
  };

  return (
    <div
      className="w-full h-auto sm:h-auto md:h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-0">
        <div className="bg-white p-3 sm:p-4 shadow-lg rounded-xl w-full max-w-xs sm:max-w-sm z-10 order-1 md:order-none">
          <h2 className="text-[#38A4A6] text-base sm:text-lg flex flex-row items-center justify-center font-semibold mb-2 sm:mb-3 italic">
            Find Bike or Car
          </h2>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            {['Hourly', 'Monthly', 'Daily', 'Weekly'].map((type) => (
              <button
                key={type}
                className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm transition duration-200 ${
                  rentalType === type
                    ? 'bg-[#38A4A6] text-white'
                    : 'border border-[#38A4A6] text-[#38A4A6] hover:bg-teal-100'
                }`}
                onClick={() => setRentalType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Pickup */}
          <div className="mb-2 sm:mb-3">
            <label className="block text-gray-700 text-xs sm:text-sm">Pickup</label>
            <div className="flex flex-col sm:flex-row gap-1.5">
              <input
                type="date"
                className="w-full sm:w-1/2 p-1.5 border rounded mt-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38A4A6]"
                value={pickupDate}
                onChange={handlePickupDateChange}
                min={today}
              />
              <input
                type="time"
                className="w-full sm:w-1/2 p-1.5 border rounded mt-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38A4A6]"
                value={pickupTime}
                onChange={handlePickupTimeChange}
                min={pickupDate === today ? getCurrentTime() : undefined}
              />
            </div>
          </div>

          {/* Dropoff */}
          <div className="mb-2 sm:mb-3">
            <label className="block text-gray-600 text-xs sm:text-sm">Dropoff</label>
            <div className="flex flex-col sm:flex-row gap-1.5">
              <input
                type="date"
                className="w-full sm:w-1/2 p-1.5 border rounded mt-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38A4A6]"
                value={dropoffDate}
                onChange={handleDropoffDateChange}
                min={pickupDate || today}
              />
              <input
                type="time"
                className="w-full sm:w-1/2 p-1.5 border rounded mt-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38A4A6]"
                value={dropoffTime}
                onChange={handleDropoffTimeChange}
                min={pickupDate === dropoffDate ? pickupTime : undefined}
              />
            </div>
          </div>

          <button
            className="w-full bg-[#38A4A6] text-white py-1.5 rounded-full text-xs sm:text-sm font-semibold transition duration-200 hover:bg-[#38A4A6]"
            onClick={handleSearch}
            disabled={!pickupDate || !pickupTime || !dropoffDate || !dropoffTime}
          >
            Search
          </button>
        </div>

        {/* Vehicle Animation */}
        <div className="relative w-full flex flex-row items-center justify-center mt-6 md:mt-0 order-2 md:order-none max-w-full overflow-hidden">
          <motion.img
            src={carImage}
            alt="Car"
            className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[350px] xl:w-[500px] z-0"
            initial={{ x: '-10vw' }}
            animate={animate ? { x: 0 } : {}}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />
          <motion.img
            src={bikeImage}
            alt="Bike"
            className="w-[100px] sm:w-[120px] md:w-[150px] lg:w-[200px] xl:w-[300px] z-10"
            initial={{ x: '10vw' }}
            animate={animate ? { x: 0 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
