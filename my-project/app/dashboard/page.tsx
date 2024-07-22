"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { FaBell, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { AiFillHome, AiFillCalendar, AiFillBook, AiFillMessage, AiFillQuestionCircle, AiFillSetting, AiOutlineLogout } from 'react-icons/ai';

interface Formation {
  id: number;
  title: string;
  date: string;
  time: string;
  image: string;
  type: string;
}

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [filter, setFilter] = useState<'month' | 'type' | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [postulerFormations, setPostulerFormations] = useState<Formation[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openModal = (formation: Formation) => {
    setSelectedFormation(formation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFormation(null);
  };

  const handlePostuler = (formation: Formation) => {
    setPostulerFormations([...postulerFormations, formation]);
  };

  const formations: Formation[] = [
    { id: 1, title: 'Formation 1', date: '2024-07-12', time: '10:00 - 12:00', image: '/asset/images/vector.svg', type: 'Informatique' },
    { id: 2, title: 'Formation 2', date: '2024-07-14', time: '14:00 - 16:00', image: '/pics/formation2.jpg', type: 'Gestion' },
    { id: 3, title: 'Formation 3', date: '2024-08-16', time: '09:00 - 11:00', image: '/pics/formation3.jpg', type: 'Marketing' },
    { id: 4, title: 'Formation 4', date: '2024-08-18', time: '13:00 - 15:00', image: '/pics/formation4.jpg', type: 'Management' },
    // Ajouter plus de formations si nécessaire
  ];

  const months = Array.from({ length: 12 }, (_, index) => new Date(0, index).toLocaleString('fr-FR', { month: 'long' }));
  const types = Array.from(new Set(formations.map(formation => formation.type)));

  const filteredFormations = filter === 'month' && selectedMonth !== null
    ? formations.filter(f => new Date(f.date).getMonth() === selectedMonth)
    : filter === 'type' && selectedType !== null
    ? formations.filter(f => f.type === selectedType)
    : formations;

  return (
    <>
      <Head>
        <title>Formateur Dashboard</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`bg-white w-64 h-full p-4 flex flex-col justify-between fixed z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div>
            <div className="flex items-center justify-between mb-8">
              <img src="/asset/images/lms-logo.svg" alt="LMS Logo" className="w-16 h-16" />
              <button onClick={toggleSidebar} className="text-blue-600 text-xl">
                <FaTimes />
              </button>
            </div>
            <nav className="space-y-4">
              <a href="/dashboard" className="block bg-red-700 text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillHome className="text-blue-600" />
                <span>Dashboard</span>
              </a>
              <a href="/formations" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillBook className="text-blue-600" />
                <span>Mes Formations</span>
              </a>
              <a href="/messages" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillMessage className="text-blue-600" />
                <span>Messages</span>
              </a>
              <a href="/calendrier" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillCalendar className="text-blue-600" />
                <span>Calendrier</span>
              </a>
              <div className="flex-1"></div>
              <a href="/help" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillQuestionCircle className="text-blue-600" />
                <span>Help</span>
              </a>
              <a href="/account" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillSetting className="text-blue-600" />
                <span>Account</span>
              </a>
              <a href="/logout" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiOutlineLogout className="text-blue-600" />
                <span>Logout</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
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
                <div className="ml-2 text-gray-700">Alex Johnson</div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-8 bg-gray-50">
            <div className="flex justify-end mb-4">
              <div className="relative">
                <button
                  onClick={() => setFilter('month')}
                  className={`px-4 py-2 rounded-l ${filter === 'month' ? 'bg-red-500 text-white' : 'bg-white text-red-500 border border-red-500'}`}
                >
                  Par Mois
                </button>
                {filter === 'month' && (
                  <select
                    className="absolute top-0 right-0 px-4 py-2 bg-white border border-red-500 rounded-r"
                    value={selectedMonth ?? ''}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
                  >
                    <option value="">Sélectionner un mois</option>
                    {months.map((month, index) => (
                      <option key={index} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setFilter('type')}
                  className={`px-4 py-2 rounded-l ${filter === 'type' ? 'bg-red-500 text-white' : 'bg-white text-red-500 border border-red-500'}`}
                >
                  Par Type
                </button>
                {filter === 'type' && (
                  <select
                    className="absolute top-0 right-0 px-4 py-2 bg-white border border-red-500 rounded-r"
                    value={selectedType ?? ''}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">Sélectionner un type</option>
                    {types.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFormations.map((formation) => (
                <div key={formation.id} className="bg-white p-4 rounded-lg shadow-md">
                  <img src={formation.image} alt={formation.title} className="w-full h-32 object-cover rounded-md mb-4" />
                  <h2 className="text-xl font-semibold mb-2">{formation.title}</h2>
                  <p>Type: {formation.type}</p>
                  <p>Date: {formation.date}</p>
                  <p>Heure: {formation.time}</p>
                  <button
                    onClick={() => openModal(formation)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Détails
                  </button>
                  <button
                    onClick={() => handlePostuler(formation)}
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ml-2"
                  >
                    Postuler
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Modal for formation details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
            {selectedFormation && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">{selectedFormation.title}</h2>
                <p className="mb-2">Type: {selectedFormation.type}</p>
                <p className="mb-2">Date: {selectedFormation.date}</p>
                <p className="mb-2">Heure: {selectedFormation.time}</p>
                <img src={selectedFormation.image} alt={selectedFormation.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <button
                  onClick={closeModal}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
