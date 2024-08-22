"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaBars, FaBell, FaSearch } from 'react-icons/fa';
import { AiFillFile, AiFillBook, AiFillMessage, AiFillSetting, AiFillQuestionCircle, AiOutlineLogout, AiFillCalendar } from 'react-icons/ai';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db, collection, addDoc, getDocs, deleteDoc, doc, addNotification, updateDoc } from '@/db/configfirebase';
import { Timestamp } from 'firebase/firestore';

interface Formation {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  location: string;
  consultant: string;  // Ajout du champ consultant
}

const AdminFormations = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);
  const [newFormation, setNewFormation] = useState<Formation>({
    id: '',
    title: '',
    description: '',
    type: 'Informatique',
    image: '',
    startDate: null,
    endDate: null,
    startTime: '',
    endTime: '',
    location: '',
    consultant: 'En attente',  // Ajout du champ consultant avec valeur par défaut
  });

  useEffect(() => {
    const fetchFormations = async () => {
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
    };

    fetchFormations();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'formations', id));
    setFormations(formations.filter(formation => formation.id !== id));
  };

  const handleEdit = (formation: Formation) => {
    setEditingFormation(formation);
    setNewFormation(formation);
    setIsFormOpen(true);
  };

  const handleAdd = async () => {
    if (editingFormation) {
      const formationRef = doc(db, 'formations', editingFormation.id);
      await updateDoc(formationRef, { ...newFormation });
      setFormations(formations.map(f => (f.id === editingFormation.id ? newFormation : f)));
    } else {
      const docRef = await addDoc(collection(db, 'formations'), newFormation);
      setFormations([...formations, { ...newFormation, id: docRef.id }]);
      await addNotification('all', `Une nouvelle formation "${newFormation.title}" est disponible.`);
    }
    setIsFormOpen(false);
    setEditingFormation(null);
    setNewFormation({
      id: '',
      title: '',
      description: '',
      type: 'Informatique',
      image: '',
      startDate: null,
      endDate: null,
      startTime: '',
      endTime: '',
      location: '',
      consultant: 'En attente',  // Réinitialiser le champ ici aussi
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFormation({ ...newFormation, [name]: value });
  };

  const handleStartDateChange = (date: Date) => {
    setNewFormation({ ...newFormation, startDate: date });
  };

  const handleEndDateChange = (date: Date) => {
    setNewFormation({ ...newFormation, endDate: date });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFormation({ ...newFormation, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Head>
        <title>Gérer les Formations</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="bg-white w-64 h-full p-4 flex flex-col justify-between fixed z-50">
          <div>
            <nav className="space-y-4">
              <Link href="/dashboardadmin" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillFile className="text-blue-600" />
                  <span>Dashboard</span>
                </a>
              </Link>
              <Link href="/gestionformations" legacyBehavior>
                <a className="block bg-red-700 text-white py-2 px-4 rounded flex items-center space-x-2">
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
              <Link href="/messageadmin" legacyBehavior>
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
            <h1 className="text-2xl font-semibold mb-4">Gérer les Formations</h1>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mb-4"
            >
              {isFormOpen ? 'Fermer le Formulaire' : 'Ajouter une Formation'}
            </button>

            {isFormOpen && (
              <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
                <h2 className="text-xl font-semibold mb-4">{editingFormation ? 'Modifier la Formation' : 'Nouvelle Formation'}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Titre</label>
                    <input
                      type="text"
                      name="title"
                      value={newFormation.title}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                      name="description"
                      value={newFormation.description}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Type</label>
                    <select
                      name="type"
                      value={newFormation.type}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    >
                      <option value="Informatique">Informatique</option>
                      <option value="Gestion">Gestion</option>
                      <option value="Management">Management</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Autres">Autres</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">Image</label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Date de début</label>
                    <DatePicker
                      selected={newFormation.startDate}
                      onChange={handleStartDateChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Date de fin</label>
                    <DatePicker
                      selected={newFormation.endDate}
                      onChange={handleEndDateChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Heure de début</label>
                    <input
                      type="time"
                      name="startTime"
                      value={newFormation.startTime}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Heure de fin</label>
                    <input
                      type="time"
                      name="endTime"
                      value={newFormation.endTime}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Lieu</label>
                    <input
                      type="text"
                      name="location"
                      value={newFormation.location}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <button
                    onClick={handleAdd}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                  >
                    {editingFormation ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formations.map((formation) => (
                <div key={formation.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">{formation.title}</h2>
                  <p className="text-gray-700">Type : {formation.type}</p>
                  <p className="text-gray-700">Date de début : {formation.startDate?.toLocaleDateString()}</p>
                  <p className="text-gray-700">Date de fin : {formation.endDate?.toLocaleDateString()}</p>
                  <p className="text-gray-700">Heure : {formation.startTime} - {formation.endTime}</p>
                  <p className="text-gray-700">Lieu : {formation.location}</p>
                  <p className="text-gray-700">Description : {formation.description}</p>
                  <p className="text-gray-700">Consultant : {formation.consultant}</p> {/* Affichage du consultant */}
                  {formation.image && <img src={formation.image} alt={formation.title} className="mt-4" />}
                  <div className="flex space-x-4 mt-4">
                    <button onClick={() => handleEdit(formation)} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300">
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(formation.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
                      Supprimer
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

export default AdminFormations;
