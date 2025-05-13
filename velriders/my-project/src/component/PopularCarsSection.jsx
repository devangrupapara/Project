import React from 'react';

const PopularCarsSection = ({
  vehicleTypes,
  selectedTypeId,
  setSelectedTypeId,
  selectedCityId,
  loading,
  filteredVehicles,
  vehicles,
  navigate,
}) => {
  // Navigate and scroll to top
  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="popular-cars container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
      <div id="pscar" className="flex flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">POPULAR CARS</h3>
        <div className="select flex items-center space-x-2">
          <h4 className="text-gray-700 font-medium text-sm sm:text-base">Select Vehicle</h4>
          <div className="relative">
            <select
              id="vehicle-type-dropdown"
              className={`px-3 py-1.5 sm:px-20 sm:py-2 rounded text-sm sm:text-base transition duration-200 ${
                selectedTypeId === ''
                  ? 'border-[2px]'
                  : 'border border-[#38A4A6] text-[#38A4A6] hover:bg-teal-100'
              }`}
              value={selectedTypeId}
              onChange={(e) => setSelectedTypeId(e.target.value)}
            >
              {vehicleTypes.map((type) => (
                <option key={type.type_id} value={type.type_id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="car-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6" id="car-container">
        {loading ? (
          <p className="col-span-full text-center text-gray-600 text-sm sm:text-base">Loading vehicles...</p>
        ) : filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <div key={vehicle.vehicle_id} className="car-card bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
              <img
                src={vehicle.cutout_image}
                alt={vehicle.vehicle_name}
                className="w-full h-40 sm:h-48 object-contain transition-transform duration-300 hover:scale-105"
              />
              <div className="p-3 sm:p-4">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 flex justify-between items-center">
                  {vehicle.vehicle_name}
                  <span className="text-gray-800 text-sm sm:text-base">{vehicle.price_pr_hour}</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {vehicle.properties.transmission_name || 'N/A'} |{' '}
                  {vehicle.properties.seating_capacity || 'N/A'} |{' '}
                  {vehicle.properties.fuel_type_name || 'N/A'}
                </p>
                <button
                  onClick={() =>
                    handleNavigate(
                      `/rentnow?vehicle_id=${vehicle.vehicle_id}&type_id=${selectedTypeId}&city_id=${selectedCityId}`
                    )
                  }
                  className="block mt-2 sm:mt-3 bg-[#38A4A6] text-white text-center py-2 rounded-xl text-sm sm:text-base hover:bg-[#2c8385] transition duration-200 w-full"
                >
                  Rent Now
                </button>
              </div>
            </div>
          ))
        ) : vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <div key={vehicle.vehicle_id} className="car-card bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
              <img
                src={vehicle.cutout_image}
                alt={vehicle.vehicle_name}
                className="w-full h-40 sm:h-48 object-contain transition-transform duration-300 hover:scale-105"
              />
              <div className="p-3 sm:p-4">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 flex justify-between items-center">
                  {vehicle.vehicle_name}
                  <span className="text-gray-800 text-sm sm:text-base">{vehicle.price_pr_hour}</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {vehicle.properties.transmission_name || 'N/A'} |{' '}
                  {vehicle.properties.seating_capacity || 'N/A'} |{' '}
                  {vehicle.properties.fuel_type_name || 'N/A'}
                </p>
                <button
                  onClick={() => handleNavigate(`/rentnow?vehicle_id=${vehicle.vehicle_id}`)}
                  className="block mt-2 sm:mt-3 bg-[#38A4A6] text-white text-center py-2 rounded-xl text-sm sm:text-base hover:bg-[#2c8385] transition duration-200 w-full"
                >
                  Rent Now
                </button>
              </div>
            </div>
          ))
        ) : null}
      </div>

      <div className="flex justify-center mt-6 sm:mt-8">
        <button
          id="viewbtn"
          className="bg-[#38A4A6] text-white px-4 sm:px-6 py-2 rounded-xl text-sm sm:text-base hover:bg-[#2c8385] transition duration-200 flex items-center space-x-2"
          onClick={() => handleNavigate('/viewall')}
        >
          <span>View All</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default PopularCarsSection;
