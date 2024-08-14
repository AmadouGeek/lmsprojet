'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, doc, getDoc } from '@/db/configfirebase';
import Head from 'next/head';
import Sidebar from '@/app/components/sidebar';
import Navbar from '@/app/components/navbar';
import Image from 'next/image';

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          router.push('/login');
          return;
        }

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setError('No user data found');
        }
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen flex bg-gray-100 text-gray-800">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={toggleSidebar} userName={userData.firstName} />
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
              <div className="flex items-center justify-between px-4 py-4 bg-red-600 text-white">
                <div className="flex items-center">
                  <Image
                    src={userData.photoURL || '/pics/profile-placeholder.png'}
                    alt="Profile Picture"
                    className="rounded-full border-4 border-white mr-4"
                    width={96}
                    height={96}
                  />
                  <div>
                    <h2 className="text-2xl font-semibold">{userData.firstName} {userData.lastName}</h2>
                    <p>{userData.profession}</p>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/editprofile')}
                  className="bg-white text-red-600 px-4 py-2 rounded shadow hover:bg-gray-100"
                >
                  Modifier le Profil
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Informations Personnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <p className="bg-gray-100 p-2 rounded">{userData.email}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700">Téléphone</label>
                    <p className="bg-gray-100 p-2 rounded">{userData.phone}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700">Domaine d'intervention</label>
                    <p className="bg-gray-100 p-2 rounded">{userData.domain}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700">Expérience Professionnelle</label>
                    <p className="bg-gray-100 p-2 rounded">{userData.experience}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700">Diplome</label>
                    <p className="bg-gray-100 p-2 rounded">{userData.diploma}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
