import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from './Footer';

const Rent = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const vehicleId = new URLSearchParams(window.location.search).get('vehicle_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (vehicleId) {
      fetchVehicleDetails(vehicleId);
    }
  }, [vehicleId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (vehicle && vehicle.regular_images.length > 0) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % vehicle.regular_images.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [vehicle]);

  const fetchVehicleDetails = async (id) => {
    try {
      const response = await axios.get(`https://velriders.com/api/vehicle-details?vehicle_id=${id}`);
      if (response.data.status === "success") {
        setVehicle(response.data.data);
      } else {
        console.error("Vehicle ID is invalid");
      }
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
    } finally {
      setLoading(false);
    }
  };

  const redirectToBooking = () => {
    navigate(`/booking?vehicle_id=${vehicleId}`); // ✅ Proper React Router navigation
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
    <div className="container mx-auto mt-5 p-5">
      <button className="mb-10 flex items-center gap-2 text-lg" onClick={() => navigate('/')}>
        <ArrowLeft size={32} /> Back
      </button>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 h-full flex items-stretch">
          <div className="rounded-lg overflow-hidden flex-1">
            <div className="relative h-[380px] w-full">
              <img src={vehicle.regular_images[currentImageIndex]} alt="Vehicle" className="w-full h-full object-contain transition-all duration-700" />
            </div>
            <div className="flex gap-2 mt-4 p-2 overflow-x-auto justify-center items-center">
              {vehicle.regular_images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className={`w-24 h-20 object-cover cursor-pointer rounded border ${index === currentImageIndex ? 'border-teal-500' : 'border-gray-300'} transition-all duration-300`}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-full flex items-stretch">
          <div className="rounded-lg p-6 flex-1">
            <h2 className="text-3xl font-bold mb-2">{vehicle.vehicle_name}</h2>
            <p className="text-gray-600 mb-4">{vehicle.description}</p>
            <div className="mb-4 text-sm flex gap-4 flex-wrap" id="vehicle-properties">
              <span>{vehicle.properties.seating_capacity} Seater</span>
              <span>{vehicle.properties.engine_cc}</span>
              <span>{vehicle.properties.transmission_name}</span>
              <span>{vehicle.properties.mileage}</span>
              <span>{vehicle.properties.fuel_type_name}</span>
              <span>{vehicle.properties.fuel_capacity}</span>
            </div>
            <h5 className="font-semibold mb-2">Features</h5>
            <div className="grid grid-cols-2 gap-2">
              {vehicle.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <img src={feature.icon} alt={feature.name} className="w-5 h-5 mr-2" />
                  <span className="text-sm">{feature.name}</span>
                </div>
              ))}
            </div>
            <button
              className="mt-4 w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
              onClick={redirectToBooking}
            >
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Rent;
