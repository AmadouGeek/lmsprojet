// components/Navbar.tsx
import React from 'react';
import { FaBars, FaBell, FaSearch } from 'react-icons/fa';

interface NavbarProps {
  toggleSidebar: () => void;
  userName: string | null | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, userName }) => {
  return (
    <header className="bg-red-300 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-red-600 text-2xl">
          <FaBars />
        </button>
        <img src="/asset/images/lms-logo.svg" alt="LMS Logo" className="w-16 h-16 ml-4" />
      </div>
      <div className="flex items-center space-x-4 ml-auto">
        <div className="relative">
          <FaSearch className="absolute top-2 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:border-red-500"
          />
        </div>
        <button className="relative">
          <FaBell className="text-gray-600 w-6 h-6" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="relative flex items-center">
          <img
            src="/pics/profile.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-2 text-gray-700">{userName}</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
