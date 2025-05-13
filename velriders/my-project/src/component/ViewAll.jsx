import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Footer from './Footer';
import calendarIcon from '../assets/calendar.png';
import {
  fetchAllVehicles,
  fetchVehicleModels,
  setVehicleType,
  setVehicleModel,
  setFuelTypes,
  setFromDate,
  setToDate,
  setCurrentPage,
} from '../Redux/viewAllSlice';

const ViewAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    allVehicles,
    filteredVehicles,
    vehicleType,
    vehicleModel,
    fuelTypes,
    fromDate,
    toDate,
    loading,
    error,
    currentPage,
    models,
  } = useSelector((state) => state.viewAll);

  const cityId = new URLSearchParams(window.location.search).get('city_id') || '1';
  const cityName = new URLSearchParams(window.location.search).get('city_name') || 'Example City';

  const [minDate, setMinDate] = useState('');

  // Set minimum date to tomorrow's date
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow
    setMinDate(tomorrow.toISOString().slice(0, 16)); // Format as 'YYYY-MM-DDTHH:MM'
  }, []);

  useEffect(() => {
    dispatch(fetchAllVehicles({ cityId }));
  }, [dispatch, cityId]);

  useEffect(() => {
    if (vehicleType) {
      const typeId = vehicleType === 'car' ? 1 : vehicleType === 'bike' ? 2 : '';
      dispatch(fetchVehicleModels(typeId));
    } else {
      dispatch({ type: 'viewAll/setModels', payload: [] });
    }
  }, [vehicleType, dispatch]);

  const applyFilter = () => {
    const typeId = vehicleType === 'car' ? 1 : vehicleType === 'bike' ? 2 : '';
    dispatch(
      fetchAllVehicles({
        cityId,
        typeId,
        modelId: vehicleModel,
        startDate: fromDate,
        endDate: toDate,
        fuelTypes,
      })
    );
    dispatch(setCurrentPage(1));
  };

  const vehiclesPerPage = 6;
  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);
  const startIndex = (currentPage - 1) * vehiclesPerPage;
  const vehiclesToDisplay = filteredVehicles.slice(startIndex, startIndex + vehiclesPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
  };
  const goToPage = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      <motion.div className=" container mx-auto p-4 flex flex-col md:flex-row gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Select Vehicle</h3>
          <select
            id="vehicle-type"
            className="w-full p-2 mb-4 border rounded-md"
            value={vehicleType}
            onChange={(e) => dispatch(setVehicleType(e.target.value))}
          >
            <option value="">All Types</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>
          <div className="mb-4">
            <label htmlFor="from" className="block mb-2 flex items-center">
              <img src={calendarIcon} alt="calendar" className="w-6 mr-2" /> From
            </label>
            <input
              type="datetime-local"
              id="from"
              className="w-full p-2 border rounded-md"
              value={fromDate}
              min={minDate}
              onChange={(e) => dispatch(setFromDate(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="to" className="block mb-2 flex items-center">
              <img src={calendarIcon} alt="calendar" className="w-6 mr-2" /> To
            </label>
            <input
              type="datetime-local"
              id="to"
              className="w-full p-2 border rounded-md"
              value={toDate}
              min={fromDate ? fromDate : minDate} // Ensure the 'To' date is after the 'From' date
              onChange={(e) => dispatch(setToDate(e.target.value))}
            />
          </div>
          <h4 className="text-md font-semibold mb-2">Select Category</h4>
          <select
            id="vehicle-model"
            className="w-full p-2 mb-4 border rounded-md"
            value={vehicleModel}
            onChange={(e) => dispatch(setVehicleModel(e.target.value))}
          >
            <option value="">All Models</option>
            {models.map((model) => (
              <option key={model.model_id} value={model.model_id}>
                {model.name}
              </option>
            ))}
          </select>
          <h4 className="text-md font-semibold mb-2">Fuel Type</h4>
          {['Petrol', 'Diesel', 'LPG', 'CNG'].map((fuel) => (
            <div key={fuel} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`fuel-${fuel}`}
                value={fuel}
                checked={fuelTypes.includes(fuel)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  dispatch(setFuelTypes(checked ? [...fuelTypes, fuel] : fuelTypes.filter((f) => f !== fuel)));
                }}
                className="mr-2"
              />
              <label htmlFor={`fuel-${fuel}`}>{fuel}</label>
            </div>
          ))}
          <button
            onClick={applyFilter}
            className="w-full mt-4 p-2 bg-[#38A4A6] text-white rounded-md hover:bg-[#38A4A6]"
          >
            Apply Filter
          </button>
        </div>
        <div className="w-full md:w-2/3">
          {loading && <div className="text-center text-gray-600">Loading...</div>}
          {error && <div className="text-center text-red-500">{error}</div>}
          {!loading && !error && filteredVehicles.length === 0 && (
            <div className="text-center text-gray-600">No vehicles found.</div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehiclesToDisplay.map((vehicle) => (
              <motion.div
                key={vehicle.vehicle_id}
                className="bg-white rounded-lg shadow-md p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={vehicle.cutout_image}
                  alt={vehicle.vehicle_name}
                  className="w-full h-48 object-contain mb-4 rounded-md hover:scale-105 transition-transform"
                />
                <h3 className="text-lg font-semibold">
                  {vehicle.vehicle_name}{' '}
                  <span className="text-gray-600 text-sm">{vehicle.price_pr_hour}</span>
                </h3>
                <p className="text-gray-600">
                  {vehicle.properties?.transmission_name || 'N/A'} |{' '}
                  {vehicle.properties?.seating_capacity || 'N/A'} |{' '}
                  {vehicle.properties?.fuel_type_name || 'N/A'}
                </p>
                <button
                  onClick={() => navigate(`/rentnow?vehicle_id=${vehicle.vehicle_id}`)}
                  className="mt-4 w-full bg-[#38A4A6] text-white p-2 rounded-md hover:bg-[#38A4A6]"
                >
                  Rent Now
                </button>
              </motion.div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#38A4A6] text-white rounded-md disabled:bg-gray-300 hover:bg-[#38A4A6]"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded-md ${
                    page === currentPage
                      ? 'bg-[#38A4A6] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-teal-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#38A4A6] text-white rounded-md disabled:bg-gray-300 hover:bg-[#38A4A6]"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default ViewAll;
