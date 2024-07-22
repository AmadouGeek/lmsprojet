"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaBars, FaBell, FaSearch, FaTimes } from 'react-icons/fa';
import { AiFillDashboard, AiFillFile, AiFillBook, AiFillMessage, AiFillSetting, AiFillQuestionCircle, AiOutlineLogout, AiFillCalendar } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Formation {
  id: number;
  title: string;
  date: Date;
  status: 'planifiée' | 'en cours';
  description: string;
  image: string;
}

const initialFormations: Formation[] = [
  { id: 1, title: 'Formation 1', date: new Date(2024, 6, 12), status: 'planifiée', description: 'Description de la formation 1', image: '/pics/formation1.jpg' },
  { id: 2, title: 'Formation 2', date: new Date(2024, 6, 14), status: 'en cours', description: 'Description de la formation 2', image: '/pics/formation2.jpg' },
  // Ajouter plus de formations si nécessaire
];

const notifications = [
  { id: 1, type: 'message', content: 'Formateur A vous a envoyé un message.', timestamp: '12:00', link: '/messageadmin' },
  { id: 2, type: 'formation', content: 'Formateur B a postulé pour la formation X.', timestamp: '14:00', link: '/gestiondemandes' },
  // Ajouter plus de notifications si nécessaire
];

const AdminDashboard = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [formations, setFormations] = useState<Formation[]>(initialFormations);
  const router = useRouter();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleNotificationClick = (link: string) => {
    router.push(link);
    setIsNotificationsOpen(false);
  };

  const plannedFormationsCount = formations.filter(f => f.status === 'planifiée').length;
  const ongoingFormationsCount = formations.filter(f => f.status === 'en cours').length;
  const pendingRequestsCount = 5; // This should be dynamically updated based on your data

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
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
              <Link href="/dashboardadmin" legacyBehavior>
                <a className="block bg-red-700 text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillDashboard className="text-blue-600" />
                  <span>Dashboard</span>
                </a>
              </Link>
              <Link href="/gestionformations" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillFile className="text-blue-600" />
                  <span>Gérer les formations</span>
                </a>
              </Link>
              <Link href="/gestionformateurs" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillBook className="text-blue-600" />
                  <span>Gérer les formateurs</span>
                </a>
              </Link>
              <Link href="/messagesadmin" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillMessage className="text-blue-600" />
                  <span>Messages</span>
                </a>
              </Link>
              <Link href="/calendrieradmin" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillCalendar className="text-blue-600" />
                  <span>Calendrier</span>
                </a>
              </Link>
              <Link href="/adminaccount" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillSetting className="text-blue-600" />
                  <span>Account</span>
                </a>
              </Link>
              <Link href="/adminparametres" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillSetting className="text-blue-600" />
                  <span>Paramètres</span>
                </a>
              </Link>
              <Link href="/adminhelp" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillQuestionCircle className="text-blue-600" />
                  <span>Help</span>
                </a>
              </Link>
              <Link href="/adminlogout" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiOutlineLogout className="text-blue-600" />
                  <span>Logout</span>
                </a>
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
            <div className="flex items-center space-x-4 ml-auto relative">
              <div className="relative">
                <FaSearch className="absolute top-2 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="relative">
                <button className="relative" onClick={toggleNotifications}>
                  <FaBell className="text-gray-600 w-6 h-6" />
                  <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white bg-opacity-90 rounded-lg shadow-lg py-2">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className="px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleNotificationClick(notification.link)}
                      >
                        <p className="text-gray-800">{notification.content}</p>
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative flex items-center" onClick={toggleProfileMenu}>
                <img
                  src="/pics/profile.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-2 text-gray-700 cursor-pointer">Admin</div>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-12 w-48 bg-white rounded-lg shadow-lg py-2">
                    <Link href="/adminaccount" legacyBehavior>
                      <a className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white">Modifier Profil</a>
                    </Link>
                    <Link href="/adminlogout" legacyBehavior>
                      <a className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white">Déconnexion</a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/calendrieradmin" passHref legacyBehavior>
                <a className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Formations Planifiées</h2>
                  <p className="text-gray-700">Nombre total : {plannedFormationsCount}</p>
                </a>
              </Link>
              <Link href="/gestiondemandes" passHref legacyBehavior>
                <a className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Demandes de Postuler</h2>
                  <p className="text-gray-700">Demandes en attente : {pendingRequestsCount}</p>
                </a>
              </Link>
              <a href="#confirmed-formations" className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Formations en Cours</h2>
                <p className="text-gray-700">Formations en cours : {ongoingFormationsCount}</p>
              </a>
            </div>

            {/* Confirmed Formations */}
            <section id="confirmed-formations" className="mt-8 bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-white">Formations Confirmées</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formations.filter(f => f.status === 'en cours').map(formation => (
                  <div key={formation.id} className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">{formation.title}</h3>
                    <p>{formation.description}</p>
                    <p>Date: {formation.date.toLocaleDateString()}</p>
                    <img src={formation.image} alt={formation.title} className="w-full h-32 object-cover rounded-md mt-2" />
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
