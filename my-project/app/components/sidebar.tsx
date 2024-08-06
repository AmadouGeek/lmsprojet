// components/Sidebar.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiFillHome, AiFillBook, AiFillMessage, AiFillCalendar, AiFillQuestionCircle, AiFillSetting, AiOutlineLogout } from 'react-icons/ai';
import Link from 'next/link';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <aside className={`bg-white w-64 h-full p-4 flex flex-col justify-between fixed z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div>
        <div className="flex items-center justify-between mb-8">
          <img src="/asset/images/lms-logo.svg" alt="LMS Logo" className="w-16 h-16" />
          <button onClick={toggleSidebar} className="text-blue-600 text-xl">
            <FaTimes />
          </button>
        </div>
        <nav className="space-y-4">
          <Link href="/dashboard" legacyBehavior>
            <a className="block bg-red-700 text-white py-2 px-4 rounded flex items-center space-x-2">
              <AiFillHome className="text-blue-600" />
              <span>Dashboard</span>
            </a>
          </Link>
          <Link href="/formations" legacyBehavior>
            <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
              <AiFillBook className="text-blue-600" />
              <span>Mes Formations</span>
            </a>
          </Link>
          <Link href="/messages" legacyBehavior>
            <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
              <AiFillMessage className="text-blue-600" />
              <span>Messages</span>
            </a>
          </Link>
          <Link href="/calendrier" legacyBehavior>
            <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
              <AiFillCalendar className="text-blue-600" />
              <span>Calendrier</span>
            </a>
          </Link>
          <div className="flex-1"></div>
          <Link href="/help" legacyBehavior>
            <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
              <AiFillQuestionCircle className="text-blue-600" />
              <span>Help</span>
            </a>
          </Link>
          <Link href="/account" legacyBehavior>
            <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
              <AiFillSetting className="text-blue-600" />
              <span>Account</span>
            </a>
          </Link>
          <Link href="/logout" legacyBehavior>
            <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
              <AiOutlineLogout className="text-blue-600" />
              <span>Logout</span>
            </a>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
