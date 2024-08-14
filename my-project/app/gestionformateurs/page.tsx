"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { FaBars, FaBell, FaSearch } from 'react-icons/fa';
import { AiFillFile, AiFillBook, AiFillMessage, AiFillSetting, AiFillQuestionCircle, AiOutlineLogout, AiFillCalendar } from 'react-icons/ai';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Formateur {
  id: number;
  name: string;
  firstName: string;
  email: string;
  subject: string;
  dateAdded: Date;
}

const AdminFormateurs = () => {
  const [formateurs, setFormateurs] = useState<Formateur[]>([
    { id: 1, name: 'John', firstName: 'Doe', email: 'john@example.com', subject: 'Informatique', dateAdded: new Date(2024, 6, 12) },
    { id: 2, name: 'Jane', firstName: 'Smith', email: 'jane@example.com', subject: 'Gestion', dateAdded: new Date(2024, 6, 14) },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFormateur, setEditingFormateur] = useState<Formateur | null>(null);
  const [newFormateur, setNewFormateur] = useState<Formateur>({
    id: formateurs.length + 1,
    name: '',
    firstName: '',
    email: '',
    subject: 'Informatique',
    dateAdded: new Date(),
  });

  const handleDelete = (id: number) => {
    setFormateurs(formateurs.filter(formateur => formateur.id !== id));
  };

  const handleEdit = (formateur: Formateur) => {
    setEditingFormateur(formateur);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    if (editingFormateur) {
      setFormateurs(formateurs.map(f => (f.id === editingFormateur.id ? newFormateur : f)));
    } else {
      setFormateurs([...formateurs, { ...newFormateur, id: formateurs.length + 1 }]);
    }
    setIsFormOpen(false);
    setEditingFormateur(null);
    setNewFormateur({
      id: formateurs.length + 2,
      name: '',
      firstName: '',
      email: '',
      subject: 'Informatique',
      dateAdded: new Date(),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewFormateur({ ...newFormateur, [name]: value });
  };

  const handleDateChange = (date: Date) => {
    setNewFormateur({ ...newFormateur, dateAdded: date });
  };

  return (
    <>
      <Head>
        <title>Gérer les Formateurs</title>
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
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillFile className="text-blue-600" />
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
                <a className="block bg-red-700 text-white py-2 px-4 rounded flex items-center space-x-2">
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
            <h1 className="text-2xl font-semibold mb-4">Gérer les Formateurs</h1>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mb-4"
            >
              {isFormOpen ? 'Fermer le Formulaire' : 'Ajouter un Formateur'}
            </button>

            {isFormOpen && (
              <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
                <h2 className="text-xl font-semibold mb-4">{editingFormateur ? 'Modifier le Formateur' : 'Nouveau Formateur'}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Nom</label>
                    <input
                      type="text"
                      name="name"
                      value={newFormateur.name}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      value={newFormateur.firstName}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newFormateur.email}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Spécialité</label>
                    <select
                      name="subject"
                      value={newFormateur.subject}
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
                    <label className="block text-gray-700">Date d'ajout</label>
                    <DatePicker
                      selected={newFormateur.dateAdded}
                      onChange={handleDateChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <button
                    onClick={handleAdd}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                  >
                    {editingFormateur ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formateurs.map((formateur) => (
                <div key={formateur.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">{formateur.name} {formateur.firstName}</h2>
                  <p className="text-gray-700">Email : {formateur.email}</p>
                  <p className="text-gray-700">Spécialité : {formateur.subject}</p>
                  <p className="text-gray-700">Date d'ajout : {formateur.dateAdded.toLocaleDateString()}</p>
                  <div className="flex space-x-4 mt-4">
                    <button onClick={() => handleEdit(formateur)} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300">
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(formateur.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
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

export default AdminFormateurs;
