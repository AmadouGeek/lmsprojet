'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar';
import Sidebar from '@/app/components/sidebar';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { FaBars, FaBell, FaSearch } from 'react-icons/fa';
import { AiFillHome, AiFillBook, AiFillMessage, AiFillCalendar, AiFillSetting, AiOutlineLogout } from 'react-icons/ai';
import Link from 'next/link';
<<<<<<< HEAD
import { collection, addDoc, deleteDoc, doc, getDocs, query, where, onSnapshot, updateDoc } from 'firebase/firestore';
import { db, auth, addNotification } from '@/db/configfirebase';
=======
import { collection, getDoc,getDocs, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db, auth, signOut } from '@/db/configfirebase';
>>>>>>> 55aaeaab7d896657ae66bb7e6d7080607e90b6ec
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image';
import { Timestamp } from 'firebase/firestore';

interface Formation {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  image: string;
  type: string;
  consultant: string;  // Ajout du champ consultant
}

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchFormations = async () => {
      try {
        const formationsCollection = collection(db, 'formations');
        const formationsSnapshot = await getDocs(formationsCollection);
        const formationsList = formationsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            startDate: data.startDate ? (data.startDate as Timestamp).toDate() : null,
            endDate: data.endDate ? (data.endDate as Timestamp).toDate() : null,
          };
        }) as Formation[];
        setFormations(formationsList);
      } catch (error) {
        console.error('Error fetching formations: ', error);
      }
    };

    fetchFormations();
  }, [user]);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const fetchUserSettings = async () => {
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setNotificationsEnabled(userData.notificationsEnabled || false);
          }
        } catch (error) {
          console.error('Error fetching user settings:', error);
        }
      };

      fetchUserSettings();
    }
  }, [user]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userDocRef, { notificationsEnabled: newValue });
      } catch (error) {
        console.error('Error updating notification settings:', error);
      }
    }
  };

  const openModal = (formation: Formation) => {
    setSelectedFormation(formation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFormation(null);
  };

<<<<<<< HEAD
  const handlePostuler = async (formation: Formation) => {
    if (postulerFormations.includes(formation.id)) {
      // Annuler la postulation
      setPostulerFormations(postulerFormations.filter(id => id !== formation.id));
      const demandeQuery = query(collection(db, 'demandes'), where('formationId', '==', formation.id), where('requestedBy', '==', user?.uid));
      const demandeSnapshot = await getDocs(demandeQuery);
      demandeSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Remettre le champ consultant à "En attente"
      const formationRef = doc(db, 'formations', formation.id);
      await updateDoc(formationRef, { consultant: 'En attente' });
    } else {
      // Postuler à la formation
      setPostulerFormations([...postulerFormations, formation.id]);
      await addDoc(collection(db, 'demandes'), {
        formationId: formation.id,
        requestedBy: user?.uid,
        speciality: user?.displayName,
        requestDate: new Date(),
        confirmed: false,
      });

      // Mettre à jour le champ consultant avec le nom du formateur
      const formationRef = doc(db, 'formations', formation.id);
      await updateDoc(formationRef, { consultant: user?.displayName });

      // Empêcher d'autres formateurs de postuler
      addNotification('admin', `Le formateur ${user?.displayName} a postulé pour la formation "${formation.title}".`);
    }
  };

  const months = Array.from({ length: 12 }, (_, index) => new Date(0, index).toLocaleString('fr-FR', { month: 'long' }));
  const types = Array.from(new Set(formations.map(formation => formation.type)));

  const filteredFormations = 
  (filter === 'month' && selectedMonth !== null) ? 
  formations.filter(f => f.startDate && f.startDate.getMonth() === selectedMonth) :
  (filter === 'type' && selectedType !== null) ? 
  formations.filter(f => f.type === selectedType) : 
  formations;

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
=======
  return (
    <>
      <Head>
        <title>Formateur Dashboard</title>
      </Head>
      <div className="flex h-screen bg-gray-100">
        <aside className={`bg-white w-64 h-full p-4 flex flex-col justify-between fixed z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
>>>>>>> 55aaeaab7d896657ae66bb7e6d7080607e90b6ec
          <div>
            <div className="flex items-center justify-between mb-8">
              <Image src="/asset/images/lms-logo.svg" alt="LMS Logo" className="w-16 h-16" width={64} height={64} />
              <button onClick={toggleSidebar} className="text-blue-600 text-xl">
                <FaBars />
              </button>
            </div>
            <nav className="space-y-4">
              <Link href="/dashboard" className="block bg-red-700 text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillHome className="text-blue-600" />
                <span>Dashboard</span>
              </Link>
              <Link href="/formations" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillBook className="text-blue-600" />
                <span>Mes Formations</span>
              </Link>
              <Link href="/messages" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillMessage className="text-blue-600" />
                <span>Messages</span>
              </Link>
              <Link href="/calendrier" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillCalendar className="text-blue-600" />
                <span>Calendrier</span>
              </Link>
              <div className="flex-1"></div>
              <Link href="/account" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillSetting className="text-blue-600" />
                <span>Account</span>
              </Link>
              <button
                onClick={() => signOut(auth)}
                className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2"
              >
                <AiOutlineLogout className="text-blue-600" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>

<<<<<<< HEAD
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-red-300 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="text-red-600 text-2xl">
              <FaBars />
            </button>
            <Image src="/asset/images/lms-logo.svg" alt="LMS Logo" className="w-16 h-16 ml-4" width={64} height={64} />
=======
        <div className="flex-1 flex flex-col">
          <header className="bg-red-300 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="text-red-600 text-2xl">
                <FaBars />
              </button>
              <Image src="/asset/images/lms-logo.svg" alt="LMS Logo" className="w-16 h-16 ml-4" width={64} height={64} />
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
              <button className="relative" onClick={toggleNotifications}>
                <FaBell className={`text-gray-600 w-6 h-6 ${notificationsEnabled ? 'text-red-500' : 'text-gray-400'}`} />
                {notificationsEnabled && <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>}
              </button>
              <div className="relative flex items-center">
                <Image
                  src="/pics/profile.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                <div className="ml-2 text-gray-700">{user?.displayName}</div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-8 bg-gray-50">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {formations.map((formation) => (
                <div key={formation.id} className="bg-white p-4 rounded-lg shadow-md">
                  <Image src={formation.image} alt={formation.title} className="w-full h-32 object-cover rounded-md mb-4" width={320} height={128} />
                  <h2 className="text-xl font-semibold mb-2">{formation.title}</h2>
                  <p>Type: {formation.type}</p>
                  <p>Date de début: {formation.startDate?.toLocaleDateString()}</p>
                  <p>Date de fin: {formation.endDate?.toLocaleDateString()}</p>
                  <p>Heure: {formation.startTime} - {formation.endTime}</p>
                  <p>Lieu: {formation.location}</p>
                  <p>Description: {formation.description}</p>
                  <button
                    onClick={() => openModal(formation)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Détails
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {isModalOpen && selectedFormation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">{selectedFormation.title}</h2>
            <p className="mb-2">Type: {selectedFormation.type}</p>
            <p className="mb-2">Date de début: {selectedFormation.startDate?.toLocaleDateString()}</p>
            <p className="mb-2">Date de fin: {selectedFormation.endDate?.toLocaleDateString()}</p>
            <p className="mb-2">Heure: {selectedFormation.startTime} - {selectedFormation.endTime}</p>
            <p className="mb-2">Lieu: {selectedFormation.location}</p>
            <p className="mb-2">Description: {selectedFormation.description}</p>
            <Image src={selectedFormation.image} alt={selectedFormation.title} className="w-full h-48 object-cover rounded-md mb-4" width={320} height={192} />
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
            >
              Fermer
            </button>
>>>>>>> 55aaeaab7d896657ae66bb7e6d7080607e90b6ec
          </div>
          {/* Other content */}
        </header>

        <main className="flex-1 p-8 bg-gray-50">
          {/* Main content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFormations.map((formation) => (
              <div key={formation.id} className="bg-white p-4 rounded-lg shadow-md">
                <Image src={formation.image} alt={formation.title} className="w-full h-32 object-cover rounded-md mb-4" width={320} height={128} />
                <h2 className="text-xl font-semibold mb-2">{formation.title}</h2>
                <p>Type: {formation.type}</p>
                <p>Date de début: {formation.startDate?.toLocaleDateString()}</p>
                <p>Date de fin: {formation.endDate?.toLocaleDateString()}</p>
                <p>Heure: {formation.startTime} - {formation.endTime}</p>
                <p>Lieu: {formation.location}</p>
                <p>Description: {formation.description}</p>
                <p>Consultant: {formation.consultant}</p>
                <button
                  onClick={() => openModal(formation)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Détails
                </button>
                <button
                  onClick={() => handlePostuler(formation)}
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ml-2"
                  disabled={formation.consultant !== 'En attente'}
                >
                  {postulerFormations.includes(formation.id) ? 'Déjà postulé, cliquez pour annuler' : 'Postuler'}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  </>
);

};

export default Dashboard;
