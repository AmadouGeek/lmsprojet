"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { FaBars, FaBell, FaSearch, FaTimes } from 'react-icons/fa';
import { AiFillDashboard, AiFillFile, AiFillBook, AiFillMessage, AiFillSetting, AiFillQuestionCircle, AiOutlineLogout, AiFillCalendar } from 'react-icons/ai';
import Link from 'next/link';

interface Formation {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  requestedBy: string;
  speciality: string;
  requestDate: string;
}

const demandes: Formation[] = [
  { 
    id: 1, 
    title: 'Formation 1', 
    date: '2024-07-12', 
    time: '10:00 - 12:00', 
    description: 'Description de la formation 1', 
    image: '/pics/formation1.jpg', 
    requestedBy: 'John Doe', 
    speciality: 'Informatique', 
    requestDate: '2024-07-01' 
  },
  { 
    id: 2, 
    title: 'Formation 2', 
    date: '2024-07-14', 
    time: '14:00 - 16:00', 
    description: 'Description de la formation 2', 
    image: '/pics/formation2.jpg', 
    requestedBy: 'Jane Smith', 
    speciality: 'Gestion', 
    requestDate: '2024-07-02' 
  },
  // Ajouter plus de demandes si nécessaire
];

const GestionDemandes = () => {
  const [confirmations, setConfirmations] = useState<{ [key: number]: boolean }>({});

  const toggleConfirmation = (id: number) => {
    setConfirmations({
      ...confirmations,
      [id]: !confirmations[id],
    });
  };

  return (
    <>
      <Head>
        <title>Gérer les Demandes</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`bg-white w-64 h-full p-4 flex flex-col justify-between fixed z-50`}>
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
                <div className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillCalendar className="text-blue-600" />
                  <span>Calendrier</span>
                </div>
              </Link>
              <Link href="/account" passHref>
                <div className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillSetting className="text-blue-600" />
                  <span>Account</span>
                </div>
              </Link>
              <Link href="/parametres" passHref>
                <div className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillSetting className="text-blue-600" />
                  <span>Paramètres</span>
                </div>
              </Link>
              <Link href="/help" passHref>
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
        <div className="flex-1 flex flex-col ml-64">
          <header className="bg-red-300 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <button className="text-red-600 text-2xl">
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

          <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-4">Gérer les Demandes de Formations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demandes.map((formation) => (
                <div key={formation.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <img src={formation.image} alt={formation.title} className="w-full h-32 object-cover rounded-md mb-4" />
                  <h2 className="text-xl font-semibold mb-2">{formation.title}</h2>
                  <p>Date : {formation.date}</p>
                  <p>Heure : {formation.time}</p>
                  <p>{formation.description}</p>
                  <p className="mt-4">Demandé par : {formation.requestedBy}</p>
                  <p>Spécialité : {formation.speciality}</p>
                  <p>Date de demande : {formation.requestDate}</p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => toggleConfirmation(formation.id)}
                      className={`py-2 px-4 rounded ${confirmations[formation.id] ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'} hover:${confirmations[formation.id] ? 'bg-green-600' : 'bg-blue-600'} transition duration-300`}
                    >
                      {confirmations[formation.id] ? 'Confirmée, cliquez pour annuler' : 'Confirmer'}
                    </button>
                    <button className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
                      Refuser
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default GestionDemandes;
