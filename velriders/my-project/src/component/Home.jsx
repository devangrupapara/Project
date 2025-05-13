// Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import PopularCarsSection from './PopularCarsSection';
import HowItWorksSection from './HowItWorksSection';
import TestimonialSlider from './TestimonialSlider';
import Footer from '../component/Footer';
import {
  fetchVehicleTypes,
  fetchVehicles,
  setSelectedTypeId,
  setSelectedCityId,
  setPickupDate,
  setPickupTime,
  setDropoffDate,
  setDropoffTime,
} from '../Redux/vehicleSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    vehicleTypes,
    vehicles,
    filteredVehicles,
    selectedTypeId,
    selectedCityId,
    pickupDate,
    pickupTime,
    dropoffDate,
    dropoffTime,
    loading,
  } = useSelector((state) => state.vehicles);

  const [animate, setAnimate] = useState(false);
  const [rentalType, setRentalType] = useState('Hourly');

  useEffect(() => {
    setAnimate(true);
    dispatch(fetchVehicleTypes());
    dispatch(fetchVehicles({ cityId: selectedCityId || 'default_city_id' }));
  }, [dispatch]);

  const handleSearch = () => {
    if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime) {
      alert('Please select both pickup and drop-off dates and times.');
      return;
    }
    dispatch(
      fetchVehicles({
        cityId: selectedCityId,
        typeId: selectedTypeId,
        startDate: pickupDate,
        startTime: pickupTime,
        endDate: dropoffDate,
        endTime: dropoffTime,
      })
    );
  };

  return (
    <>
      <HeroSection
        rentalType={rentalType}
        setRentalType={setRentalType}
        pickupDate={pickupDate}
        setPickupDate={(date) => dispatch(setPickupDate(date))}
        pickupTime={pickupTime}
        setPickupTime={(time) => dispatch(setPickupTime(time))}
        dropoffDate={dropoffDate}
        setDropoffDate={(date) => dispatch(setDropoffDate(date))}
        dropoffTime={dropoffTime}
        setDropoffTime={(time) => dispatch(setDropoffTime(time))}
        handleSearch={handleSearch}
        animate={animate}
      />
      <PopularCarsSection
        vehicleTypes={vehicleTypes}
        selectedTypeId={selectedTypeId}
        setSelectedTypeId={(id) => {
          dispatch(setSelectedTypeId(id));
          dispatch(fetchVehicles({ cityId: selectedCityId, typeId: id }));
        }}
        selectedCityId={selectedCityId}
        loading={loading}
        filteredVehicles={filteredVehicles}
        vehicles={vehicles}
        navigate={navigate}
      />
      <HowItWorksSection />
      <TestimonialSlider />
      <Footer />
    </>
  );
};

export default Home;