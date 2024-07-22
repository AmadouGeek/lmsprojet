"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { FaBell, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { AiFillDashboard, AiFillFile, AiFillBook, AiFillMessage, AiFillSetting, AiFillQuestionCircle, AiOutlineLogout, AiFillCalendar } from 'react-icons/ai';
import Link from 'next/link';

interface Formation {
  id: number;
  title: string;
  date: Date;
  time: string;
  description: string;
  image: string;
}

const formations: Formation[] = [
  { id: 1, title: 'Formation 1', date: new Date(2024, 6, 12), time: '10:00 - 12:00', description: 'Description de la formation 1', image: '/pics/formation1.jpg' },
  { id: 2, title: 'Formation 2', date: new Date(2024, 6, 14), time: '14:00 - 16:00', description: 'Description de la formation 2', image: '/pics/formation2.jpg' },
  // Ajouter plus de formations si nécessaire
];

const AdminCalendrier = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const renderFormationDetails = (date: Date) => {
    const formation = formations.find(f => f.date.toDateString() === date.toDateString());
    return formation ? (
      <div className="bg-white p-4 rounded-lg shadow-md mt-2">
        <h3 className="text-xl font-semibold mb-2">{formation.title}</h3>
        <p>{formation.time}</p>
        <p>{formation.description}</p>
      </div>
    ) : null;
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = getFirstDayOfMonth(month, year);

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="border h-32"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const formation = formations.find(f => f.date.toDateString() === date.toDateString());
      calendarDays.push(
        <div
          key={day}
          className={`border h-32 p-2 ${formation ? 'bg-red-500 text-white' : ''}`}
          onClick={() => onDateChange(date)}
        >
          <div>{day}</div>
          {formation && (
            <div>
              <span className="block font-bold">{formation.title}</span>
              <span className="text-xs">{formation.time}</span>
            </div>
          )}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <>
      <Head>
        <title>Admin Calendrier</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`bg-white w-64 h-full p-4 flex flex-col justify-between fixed z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div>
            <nav className="space-y-4">
              <Link href="/dashboardadmin" passHref>
                <div className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillDashboard className="text-blue-600" />
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link href="/gestionformations" passHref>
                <div className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillFile className="text-blue-600" />
                  <span>Gérer les formations</span>
                </div>
              </Link>
              <Link href="/gestionformateurs" passHref>
                <div className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillBook className="text-blue-600" />
                  <span>Gérer les formateurs</span>
                </div>
              </Link>
              <Link href="/messageadmin" passHref>
                <div className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillMessage className="text-blue-600" />
                  <span>Messages</span>
                </div>
              </Link>
              <Link href="/calendrieradmin" passHref>
                <div className="block bg-red-700 text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillCalendar className="text-blue-600" />
                  <span>Calendrier</span>
                </div>
              </Link>
              <Link href="/adminaccount" passHref>
                <div className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillSetting className="text-blue-600" />
                  <span>Account</span>
                </div>
              </Link>
              <Link href="/adminparametres" passHref>
                <div className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillSetting className="text-blue-600" />
                  <span>Paramètres</span>
                </div>
              </Link>
              <Link href="/adminhelp" passHref>
                <div className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillQuestionCircle className="text-blue-600" />
                  <span>Help</span>
                </div>
              </Link>
              <Link href="/logout" passHref>
                <div className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiOutlineLogout className="text-blue-600" />
                  <span>Logout</span>
                </div>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {/* Navbar */}
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
                <div className="ml-2 text-gray-700">Admin</div>
              </div>
            </div>
          </header>

          {/* Calendar Content */}
          <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handlePreviousMonth}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Mois précédent
              </button>
              <h2 className="text-2xl font-semibold">{currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</h2>
              <button
                onClick={handleNextMonth}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Mois suivant
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              <div className="text-center font-bold">Dim</div>
              <div className="text-center font-bold">Lun</div>
              <div className="text-center font-bold">Mar</div>
              <div className="text-center font-bold">Mer</div>
              <div className="text-center font-bold">Jeu</div>
              <div className="text-center font-bold">Ven</div>
              <div className="text-center font-bold">Sam</div>
              {renderCalendar()}
            </div>
            {selectedDate && renderFormationDetails(selectedDate)}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminCalendrier;
