'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaBars, FaBell, FaSearch, FaTimes } from 'react-icons/fa';
import { AiFillDashboard, AiFillFile, AiFillBook, AiFillMessage, AiFillSetting, AiFillQuestionCircle, AiOutlineLogout, AiFillCalendar } from 'react-icons/ai';
import Link from 'next/link';
import { collection, getDocs, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db, addNotification } from '@/db/configfirebase';
import { Timestamp } from 'firebase/firestore';

interface Demande {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  image: string;
  requestedBy: string;
  requestDate: Date;
  confirmed: boolean;
  requesterDetails: {
    name: string;
    profession: string;
    domain: string;
  } | null;
}

const GestionDemandes = () => {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [confirmations, setConfirmations] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchDemandes = async () => {
      const demandesCollection = collection(db, 'demandes');
      const demandesSnapshot = await getDocs(demandesCollection);
      const demandesList = demandesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          startDate: data.startDate ? (data.startDate as Timestamp).toDate() : null,
          endDate: data.endDate ? (data.endDate as Timestamp).toDate() : null,
          requestDate: data.requestDate ? (data.requestDate as Timestamp).toDate() : null,
          requesterDetails: data.requesterDetails || null,
        };
      }) as Demande[];
      setDemandes(demandesList);
    };

    const unsubscribe = onSnapshot(collection(db, 'demandes'), (snapshot) => {
      const updatedDemandes = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          startDate: data.startDate ? (data.startDate as Timestamp).toDate() : null,
          endDate: data.endDate ? (data.endDate as Timestamp).toDate() : null,
          requestDate: data.requestDate ? (data.requestDate as Timestamp).toDate() : null,
          requesterDetails: data.requesterDetails || null,
        };
      }) as Demande[];
      setDemandes(updatedDemandes);
    });

    fetchDemandes();
    return () => unsubscribe();
  }, []);

  const toggleConfirmation = async (id: string, confirmed: boolean) => {
    const demandeRef = doc(db, 'demandes', id);
    await updateDoc(demandeRef, { confirmed: !confirmed });

    setConfirmations({
      ...confirmations,
      [id]: !confirmed,
    });

    const demande = demandes.find(demande => demande.id === id);
    if (demande && !confirmed) {
      // Ajouter une notification pour le formateur
      await addNotification(demande.requestedBy, `Votre demande pour la formation "${demande.title}" a été confirmée.`);
    }
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
              {demandes.map((demande) => (
                <div key={demande.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <img src={demande.image} alt={demande.title} className="w-full h-32 object-cover rounded-md mb-4" />
                  <h2 className="text-xl font-semibold mb-2">{demande.title}</h2>
                  <p>Date de début : {demande.startDate?.toLocaleDateString()}</p>
                  <p>Date de fin : {demande.endDate?.toLocaleDateString()}</p>
                  <p>Heure : {demande.startTime} - {demande.endTime}</p>
                  <p>{demande.description}</p>
                  {demande.requesterDetails ? (
                    <>
                      <p className="mt-4">Demandé par : {demande.requesterDetails.name}</p>
                      <p>Profession : {demande.requesterDetails.profession}</p>
                      <p>Domaine d'intervention : {demande.requesterDetails.domain}</p>
                    </>
                  ) : (
                    <p className="mt-4 text-red-500">Détails du formateur indisponibles</p>
                  )}
                  <p>Date de demande : {demande.requestDate?.toLocaleDateString()}</p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => toggleConfirmation(demande.id, demande.confirmed)}
                      className={`py-2 px-4 rounded ${demande.confirmed ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'} hover:${demande.confirmed ? 'bg-green-600' : 'bg-blue-600'} transition duration-300`}
                    >
                      {demande.confirmed ? 'Confirmée, cliquez pour annuler' : 'Confirmer'}
                    </button>
                    <button
                      onClick={() => deleteDoc(doc(db, 'demandes', demande.id))}
                      className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                    >
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
