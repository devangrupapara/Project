import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`fixed left-0 top-0 w-64 bg-white h-full shadow-lg transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={toggleSidebar} className="p-4 text-gray-600 hover:text-gray-800">Close</button>
        <div className="flex items-center p-4">
          <img src="/path/to/logo.png" alt="Logo" className="h-10" />
        </div>
        <ul className="flex flex-col p-4 space-y-2">
          <li>
            <button onClick={() => navigate('/login')} className="text-left w-full p-2 hover:bg-gray-200">Login | Sign up</button>
          </li>
          <li>
            <button onClick={() => navigate('/terms')} className="text-left w-full p-2 hover:bg-gray-200">Terms & Conditions</button>
          </li>
          <li>
            <button onClick={() => navigate('/privacy')} className="text-left w-full p-2 hover:bg-gray-200">Privacy Policy</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;