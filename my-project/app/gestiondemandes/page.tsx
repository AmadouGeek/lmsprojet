'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaBars, FaBell, FaSearch } from 'react-icons/fa';
import { AiFillDashboard, AiFillFile, AiFillBook, AiFillMessage, AiFillSetting, AiFillQuestionCircle, AiOutlineLogout, AiFillCalendar } from 'react-icons/ai';
import Link from 'next/link';
import { collection, getDocs, doc as firestoreDoc, getDoc } from 'firebase/firestore';
import { db } from '@/db/configfirebase';
import { Timestamp } from 'firebase/firestore';

interface Demande {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  type: string;
  location: string;
  description: string;
  image: string;
  requesterDetails: {
    name: string;
    profession: string;
    domain: string;
  } | null;
}

const GestionDemandes = () => {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [selectedFormation, setSelectedFormation] = useState<Demande | null>(null);

  useEffect(() => {
    const fetchDemandes = async () => {
      const demandesCollection = collection(db, 'demandes');
      const demandesSnapshot = await getDocs(demandesCollection);
      const demandesList = await Promise.all(
        demandesSnapshot.docs.map(async (demandeDoc) => {
          const data = demandeDoc.data();
          const formationRef = firestoreDoc(db, 'formations', data.formationId);
          const formationSnap = await getDoc(formationRef);

          if (formationSnap.exists()) {
            const formationData = formationSnap.data();
            return {
              id: demandeDoc.id,
              ...formationData,
              startDate: formationData.startDate ? (formationData.startDate as Timestamp).toDate() : null,
              endDate: formationData.endDate ? (formationData.endDate as Timestamp).toDate() : null,
              requesterDetails: data.requesterDetails || null,
            };
          }
          return null;
        })
      );

      setDemandes(demandesList.filter(Boolean) as Demande[]);
    };

    fetchDemandes();
  }, []);

  const openModal = (formation: Demande) => {
    setSelectedFormation(formation);
  };

  const closeModal = () => {
    setSelectedFormation(null);
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
            <h1 className="text-2xl font-semibold mb-4">Demandes de Formations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demandes.map((demande) => (
                <div key={demande.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <img src={demande.image} alt={demande.title} className="w-full h-32 object-cover rounded-md mb-4" />
                  <h2 className="text-xl font-semibold mb-2">{demande.title}</h2>
                  <p>Type: {demande.type}</p>
                  <button
                    onClick={() => openModal(demande)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Détails
                  </button>
                </div>
              ))}
            </div>

            {/* Modal */}
            {selectedFormation && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h2 className="text-2xl font-bold mb-4">{selectedFormation.title}</h2>
                  <img src={selectedFormation.image} alt={selectedFormation.title} className="w-full h-48 object-cover rounded-md mb-4" />
                  <p>Date de début : {selectedFormation.startDate?.toLocaleDateString()}</p>
                  <p>Date de fin : {selectedFormation.endDate?.toLocaleDateString()}</p>
                  <p>Lieu : {selectedFormation.location}</p>
                  <p>Description : {selectedFormation.description}</p>
                  {selectedFormation.requesterDetails && (
                    <>
                      <p>Nom: {selectedFormation.requesterDetails.name}</p>
                      <p>Profession: {selectedFormation.requesterDetails.profession}</p>
                      <p>Domaine: {selectedFormation.requesterDetails.domain}</p>
                    </>
                  )}
                  <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    onClick={closeModal}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default GestionDemandes;
