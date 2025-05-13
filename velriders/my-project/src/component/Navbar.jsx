"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVehicles } from "../Redux/viewAllSlice";
import { logout } from "../Redux/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logoNav.png";
import {
  FaMapPin,
  FaBars as Menu,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaUser,
} from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";
import { MdClose as X } from "react-icons/md";

// City name to ID mapping
const cityIdMap = {
  Ahmedabad: 1,
  Jamnagar: 2,
  Gandhinagar: 3,
  Porbandar: 4,
};

// Reusable Location Dropdown Component
const LocationDropdown = ({
  locations,
  selectedLocation,
  handleLocationChange,
  sortOrder,
  toggleSortOrder,
  isOpen,
  setIsOpen,
  isMobile = false,
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center ${
          isMobile
            ? "justify-between w-full"
            : "border border-[#38A4A6] px-3 py-2 rounded-md bg-white shadow-sm hover:shadow-md transition-all"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select location"
      >
        {isMobile ? (
          <>
            <span>{selectedLocation}</span>
            <FaMapPin className="text-[#38A4A6] w-4 h-4" />
          </>
        ) : (
          <>
            <FaMapPin className="text-[#38A4A6] w-5 h-5 mr-2" />
            <span className="text-[#38A4A6]">{selectedLocation}</span>
            <AiOutlineDown className="ml-2 w-5 h-5 text-[#38A4A6]" />
          </>
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            isMobile ? "right-0" : "left-0"
          } mt-2 w-40 bg-white border border-[#38A4A6] shadow-md rounded-md z-50`}
        >
          <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200">
            <span className="text-xs text-gray-600">Sort</span>
            <button
              onClick={toggleSortOrder}
              className="text-[#38A4A6] hover:text-[#2c8385]"
            >
              {sortOrder === "asc" ? (
                <FaSortAlphaDown className="w-4 h-4" />
              ) : (
                <FaSortAlphaUp className="w-4 h-4" />
              )}
            </button>
          </div>
          <ul>
            {locations.map((location) => (
              <li
                key={location}
                className="px-3 py-2 hover:bg-teal-100 cursor-pointer text-black"
                onClick={() => handleLocationChange(location)}
              >
                {location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Reusable Avatar Dropdown Component
const AvatarDropdown = ({ userData, handleLogout, isOpen, setIsOpen }) => {
  const avatarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div className="relative" ref={avatarRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-[#38A4A6] flex items-center justify-center text-white font-semibold focus:outline-none"
        aria-label="User menu"
      >
        {userData?.avatar ? (
          <img
            src={userData.avatar}
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <FaUser className="w-5 h-5" />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-[#38A4A6] shadow-md rounded-md z-50">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-semibold text-[#38A4A6]">
              {userData?.phone || "User"}
            </p>
            <p className="text-xs text-gray-600">
              {userData?.email || "No email provided"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-b-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, userData } = useSelector((state) => state.user);

  const [selectedLocation, setSelectedLocation] = useState(
    localStorage.getItem("selectedLocation") || "Ahmedabad"
  );
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const locationsData = ["Ahmedabad", "Jamnagar", "Gandhinagar", "Porbandar"];
  const locations = [...locationsData].sort((a, b) =>
    sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a)
  );

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact Us" },
  ];

  useEffect(() => {
    if (cityIdMap[selectedLocation]) {
      dispatch(fetchAllVehicles({ cityId: cityIdMap[selectedLocation] }));
    }
  }, [dispatch, selectedLocation]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const handleLocationChange = (loc) => {
    if (!cityIdMap[loc]) return;
    setSelectedLocation(loc);
    setIsLocationOpen(false);
    dispatch(fetchAllVehicles({ cityId: cityIdMap[loc] }));
    localStorage.setItem("selectedLocation", loc);
    if (isMobileSidebarOpen) setIsMobileSidebarOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsAvatarOpen(false);
    navigate("/login");
  };

  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 py-3 md:px-6 bg-white shadow-md sticky top-0 z-40">
        <div className="flex items-center">
          <button
            className="hidden md:flex items-center mr-4 h-10 w-10"
            onClick={() => setIsDesktopSidebarOpen((prev) => !prev)}
            aria-label="Toggle Desktop Sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <img src={logo} alt="Logo" className="h-10 sm:h-12 md:h-14" />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 items-center text-big  gap-10 font-semibold">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`${
                  isActive(item.path)
                    ? "text-[#38A4A6]"
                    : "text-gray-700 hover:text-[#38A4A6]"
                } transition-colors`}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <LocationDropdown
              locations={locations}
              selectedLocation={selectedLocation}
              handleLocationChange={handleLocationChange}
              sortOrder={sortOrder}
              toggleSortOrder={toggleSortOrder}
              isOpen={isLocationOpen}
              setIsOpen={setIsLocationOpen}
            />
          </li>
          <li>
            {!isLoggedIn ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-[#38A4A6] text-white px-4 py-2 rounded-md hover:bg-[#2c8385] transition"
              >
                Login | Sign up
              </button>
            ) : (
              <AvatarDropdown
                userData={userData}
                handleLogout={handleLogout}
                isOpen={isAvatarOpen}
                setIsOpen={setIsAvatarOpen}
              />
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileSidebarOpen((prev) => !prev)}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

    
    </>
  );
};

export default Navbar;
