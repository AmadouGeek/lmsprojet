'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { auth, db, storage, doc, getDoc, setDoc, ref, uploadBytes, getDownloadURL } from '@/db/configfirebase';
import Sidebar from '@/app/components/sidebar';
import Navbar from '@/app/components/navbar';

const EditProfile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>({
    firstName: '',
    lastName: '',
    profession: '',
    email: '',
    phone: '',
    domain: '',
    experience: '',
    diploma: '',
    photoURL: '',
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error state
    try {
      const user = auth.currentUser;
      if (user) {
        let photoURL = userData.photoURL;

        if (photoFile) {
          const storageRef = ref(storage, `profilePictures/${user.uid}`);
          await uploadBytes(storageRef, photoFile);
          photoURL = await getDownloadURL(storageRef);
        }

        await setDoc(doc(db, 'users', user.uid), {
          ...userData,
          photoURL,
        });

        router.push('/account');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Erreur lors de la mise à jour du profil. Veuillez réessayer.');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="bg-gray-100 flex min-h-screen">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={toggleSidebar} userName={userData.firstName} />
          <main className="flex-1 p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Modifier le Profil</h1>
            </div>
            <div className="bg-white p-8 rounded-lg shadow">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700">Prénom</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700">Nom</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="profession" className="block text-gray-700">Profession</label>
                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      value={userData.profession}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700">Téléphone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={userData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="domain" className="block text-gray-700">Domaine d’intervention</label>
                    <input
                      type="text"
                      id="domain"
                      name="domain"
                      value={userData.domain}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <label htmlFor="experience" className="block text-gray-700">Expérience Professionnelle</label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={userData.experience}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="diploma" className="block text-gray-700">Diplome</label>
                    <input
                      type="text"
                      id="diploma"
                      name="diploma"
                      value={userData.diploma}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <label htmlFor="photo" className="block text-gray-700">Photo de profil</label>
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      onChange={handleFileChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => router.push('/account')}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
