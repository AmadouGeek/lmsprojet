'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { auth, db, doc, getDoc, updateDoc, storage, ref, uploadBytes, getDownloadURL } from '@/db/configfirebase';
import { FaBars, FaBell, FaSearch } from 'react-icons/fa';
import { AiFillDashboard, AiFillFile, AiFillBook, AiFillMessage, AiFillSetting, AiFillQuestionCircle, AiOutlineLogout, AiFillCalendar } from 'react-icons/ai';
import Image from 'next/image';

const AdminProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('/dashboardadmin'); // Default to dashboard
  const [isEditing, setIsEditing] = useState(false);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          router.push('/login');
          return;
        }

        const docRef = doc(db, 'admins', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setPhotoURL(data.photoURL || '/pics/profile-placeholder.png');
        } else {
          setError('No admin data found');
        }
      } catch (err) {
        setError('Failed to fetch admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    router.push(link);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhoto(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        let updatedPhotoURL = userData.photoURL;

        if (newPhoto) {
          const storageRef = ref(storage, `profilePictures/${user.uid}`);
          await uploadBytes(storageRef, newPhoto);
          updatedPhotoURL = await getDownloadURL(storageRef);
        }

        await updateDoc(doc(db, 'admins', user.uid), {
          ...userData,
          photoURL: updatedPhotoURL,
        });

        setIsEditing(false);
        setPhotoURL(updatedPhotoURL);
      }
    } catch (err) {
      console.error('Error updating profile: ', err);
    }
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
        <title>Admin Profile</title>
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
              <a
                href="#"
                onClick={() => handleLinkClick('/dashboardadmin')}
                className={`block py-2 px-4 rounded flex items-center space-x-2 ${
                  activeLink === '/dashboardadmin' ? 'bg-red-700 text-white' : 'bg-white text-blue-600 hover:bg-red-700 hover:text-white'
                }`}
              >
                <AiFillDashboard className="text-blue-600" />
                <span>Dashboard</span>
              </a>
              <a
                href="#"
                onClick={() => handleLinkClick('/gestionformations')}
                className={`block py-2 px-4 rounded flex items-center space-x-2 ${
                  activeLink === '/gestionformations' ? 'bg-red-700 text-white' : 'bg-white text-blue-600 hover:bg-red-700 hover:text-white'
                }`}
              >
                <AiFillFile className="text-blue-600" />
                <span>Gérer les formations</span>
              </a>
              <a
                href="#"
                onClick={() => handleLinkClick('/gestionformateurs')}
                className={`block py-2 px-4 rounded flex items-center space-x-2 ${
                  activeLink === '/gestionformateurs' ? 'bg-red-700 text-white' : 'bg-white text-blue-600 hover:bg-red-700 hover:text-white'
                }`}
              >
                <AiFillBook className="text-blue-600" />
                <span>Gérer les formateurs</span>
              </a>
              <a
                href="#"
                onClick={() => handleLinkClick('/messagesadmin')}
                className={`block py-2 px-4 rounded flex items-center space-x-2 ${
                  activeLink === '/messagesadmin' ? 'bg-red-700 text-white' : 'bg-white text-blue-600 hover:bg-red-700 hover:text-white'
                }`}
              >
                <AiFillMessage className="text-blue-600" />
                <span>Messages</span>
              </a>
              <a
                href="#"
                onClick={() => handleLinkClick('/calendrieradmin')}
                className={`block py-2 px-4 rounded flex items-center space-x-2 ${
                  activeLink === '/calendrieradmin' ? 'bg-red-700 text-white' : 'bg-white text-blue-600 hover:bg-red-700 hover:text-white'
                }`}
              >
                <AiFillCalendar className="text-blue-600" />
                <span>Calendrier</span>
              </a>
              <a
                href="#"
                onClick={() => handleLinkClick('/adminaccount')}
                className={`block py-2 px-4 rounded flex items-center space-x-2 ${
                  activeLink === '/adminaccount' ? 'bg-red-700 text-white' : 'bg-white text-blue-600 hover:bg-red-700 hover:text-white'
                }`}
              >
                <AiFillSetting className="text-blue-600" />
                <span>Account</span>
              </a>
              <a
                href="#"
                onClick={() => handleLinkClick('/adminlogout')}
                className={`block py-2 px-4 rounded flex items-center space-x-2 ${
                  activeLink === '/adminlogout' ? 'bg-red-700 text-white' : 'bg-white text-blue-600 hover:bg-red-700 hover:text-white'
                }`}
              >
                <AiOutlineLogout className="text-blue-600" />
                <span>Logout</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col ml-64">
          <header className="bg-red-300 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="text-red-600 text-2xl">
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
              <button className="relative" onClick={toggleNotifications}>
                <FaBell className="text-gray-600 w-6 h-6" />
                <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative flex items-center" onClick={toggleProfileMenu}>
                <Image
                  src={photoURL || '/pics/profile-placeholder.png'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                <div className="ml-2 text-gray-700 cursor-pointer">Admin</div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-4">Profil Admin</h1>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl mx-auto">
              <div className="p-6">
                {isEditing ? (
                  <>
                    <h3 className="text-xl font-semibold mb-4">Modifier les Informations Personnelles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700">Nom</label>
                        <input
                          type="text"
                          name="lastName"
                          value={userData?.lastName || ''}
                          onChange={handleInputChange}
                          className="bg-gray-100 p-2 rounded w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Prénom</label>
                        <input
                          type="text"
                          name="firstName"
                          value={userData?.firstName || ''}
                          onChange={handleInputChange}
                          className="bg-gray-100 p-2 rounded w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={userData?.email || ''}
                          onChange={handleInputChange}
                          className="bg-gray-100 p-2 rounded w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Téléphone</label>
                        <input
                          type="text"
                          name="phone"
                          value={userData?.phone || ''}
                          onChange={handleInputChange}
                          className="bg-gray-100 p-2 rounded w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Domaine d'intervention</label>
                        <input
                          type="text"
                          name="domain"
                          value={userData?.domain || ''}
                          onChange={handleInputChange}
                          className="bg-gray-100 p-2 rounded w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Expérience Professionnelle</label>
                        <textarea
                          name="experience"
                          value={userData?.experience || ''}
                          onChange={handleInputChange}
                          className="bg-gray-100 p-2 rounded w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Diplome</label>
                        <input
                          type="text"
                          name="diploma"
                          value={userData?.diploma || ''}
                          onChange={handleInputChange}
                          className="bg-gray-100 p-2 rounded w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Photo de Profil</label>
                        <input
                          type="file"
                          onChange={handlePhotoChange}
                          className="bg-gray-100 p-2 rounded w-full"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleSaveChanges}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={handleEditToggle}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 ml-2"
                      >
                        Annuler
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-4">Informations Personnelles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700">Nom</label>
                        <p className="bg-gray-100 p-2 rounded">{userData?.lastName || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-gray-700">Prénom</label>
                        <p className="bg-gray-100 p-2 rounded">{userData?.firstName || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-gray-700">Email</label>
                        <p className="bg-gray-100 p-2 rounded">{userData?.email || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-gray-700">Téléphone</label>
                        <p className="bg-gray-100 p-2 rounded">{userData?.phone || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-gray-700">Domaine d'intervention</label>
                        <p className="bg-gray-100 p-2 rounded">{userData?.domain || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-gray-700">Expérience Professionnelle</label>
                        <p className="bg-gray-100 p-2 rounded">{userData?.experience || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-gray-700">Diplome</label>
                        <p className="bg-gray-100 p-2 rounded">{userData?.diploma || 'N/A'}</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <Image
                          src={photoURL || '/pics/profile-placeholder.png'}
                          alt="Profile Picture"
                          className="rounded-full border-4 border-white"
                          width={96}
                          height={96}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleEditToggle}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                      >
                        Modifier
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminProfilePage;
