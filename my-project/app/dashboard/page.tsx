"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar';
import Sidebar from '@/app/components/sidebar';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { FaBars, FaBell, FaSearch, FaTimes } from 'react-icons/fa';
import { AiFillHome, AiFillBook, AiFillMessage, AiFillCalendar, AiFillQuestionCircle, AiFillSetting, AiOutlineLogout } from 'react-icons/ai';
import Link from 'next/link';
import { collection, addDoc, deleteDoc, doc, getDocs, query, where, onSnapshot, updateDoc } from 'firebase/firestore';
import { db, auth, addNotification } from '@/db/configfirebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';

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
  const [filter, setFilter] = useState<'month' | 'type' | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [postulerFormations, setPostulerFormations] = useState<string[]>([]);

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
      const postulerQuery = query(collection(db, 'demandes'), where('requestedBy', '==', user.uid));
      const unsubscribe = onSnapshot(postulerQuery, (snapshot) => {
        const postulerIds = snapshot.docs.map(doc => doc.data().formationId);
        setPostulerFormations(postulerIds);
      });

      return () => unsubscribe();
    }
  }, [user]);

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
          <div>
            <div className="flex items-center justify-between mb-8">
              <Image src="/asset/images/lms-logo.svg" alt="LMS Logo" className="w-16 h-16" width={64} height={64} />
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

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-red-300 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="text-red-600 text-2xl">
              <FaBars />
            </button>
            <Image src="/asset/images/lms-logo.svg" alt="LMS Logo" className="w-16 h-16 ml-4" width={64} height={64} />
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
