"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaBell, FaSearch, FaBars, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { AiFillDashboard, AiFillFile, AiFillBook, AiFillMessage, AiFillSetting, AiFillQuestionCircle, AiOutlineLogout, AiFillCalendar } from 'react-icons/ai';
import Link from 'next/link';
import { db, auth, collection, addDoc, query, orderBy, onSnapshot } from '@/db/configfirebase';

const MessagesAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const selectDiscussion = (id: number) => {
    setSelectedDiscussion(id);
  };

  useEffect(() => {
    if (selectedDiscussion !== null) {
      const q = query(collection(db, `discussions/${selectedDiscussion}/messages`), orderBy('timestamp', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesList = snapshot.docs.map(doc => doc.data());
        setMessages(messagesList);
      });
      return () => unsubscribe();
    }
  }, [selectedDiscussion]);

  const sendMessage = async () => {
    if (messageText.trim() !== "" && selectedDiscussion !== null) {
      await addDoc(collection(db, `discussions/${selectedDiscussion}/messages`), {
        sender: 'admin',
        text: messageText,
        timestamp: new Date(),
        profileImg: '/asset/images/admin-profile.jpg'
      });
      setMessageText("");
    }
  };

  return (
    <>
      <Head>
        <title>Admin Messages</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`bg-white w-64 h-full p-4 flex flex-col justify-between fixed z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
          <div>
            <nav className="space-y-4">
              <Link href="/dashboardadmin" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
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
                <a className="block bg-red-700 text-white py-2 px-4 rounded flex items-center space-x-2">
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
              <Link href="/accountadmin" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillSetting className="text-blue-600" />
                  <span>Account</span>
                </a>
              </Link>
              <Link href="/parametresadmin" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillSetting className="text-blue-600" />
                  <span>Paramètres</span>
                </a>
              </Link>
              <Link href="/helpadmin" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiFillQuestionCircle className="text-blue-600" />
                  <span>Help</span>
                </a>
              </Link>
              <Link href="/logoutadmin" legacyBehavior>
                <a className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                  <AiOutlineLogout className="text-blue-600" />
                  <span>Logout</span>
                </a>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {/* Navbar */}
          <header className="bg-red-300 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="text-red-600 text-2xl">
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

          <main className="flex-1 p-8 bg-gray-50 overflow-y-auto flex">
            {/* Discussions List */}
            <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Discussions</h2>
              <ul>
                {[{ id: 1, name: 'Discussion 1' }, { id: 2, name: 'Discussion 2' }].map(discussion => (
                  <li key={discussion.id} className="mb-2">
                    <button
                      className={`flex items-center space-x-4 p-2 w-full text-left ${selectedDiscussion === discussion.id ? 'bg-red-200' : ''}`}
                      onClick={() => selectDiscussion(discussion.id)}
                    >
                      <img src="/asset/images/formateur-profile.jpg" alt="Discussion Profile" className="w-10 h-10 rounded-full" />
                      <span>{discussion.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Messages Content */}
            <div className="flex-1 bg-white p-8 rounded-lg shadow-lg ml-4 flex flex-col">
              <h1 className="text-2xl font-semibold mb-4">Messages</h1>
              <div className="flex-1 space-y-4 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'admin' ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.sender === 'admin' && (
                      <img
                        src={message.profileImg}
                        alt="Admin Profile"
                        className="w-10 h-10 rounded-full mr-4"
                      />
                    )}
                    <div
                      className={`p-4 rounded-lg shadow-md max-w-xs ${message.sender === 'admin' ? 'bg-gray-200 text-gray-900' : 'bg-blue-500 text-white'}`}
                    >
                      <p className="mb-1">{message.text}</p>
                      <span className="text-xs">{new Date(message.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    {message.sender !== 'admin' && (
                      <img
                        src={message.profileImg}
                        alt="Formateur Profile"
                        className="w-10 h-10 rounded-full ml-4"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <footer className="bg-white p-4 flex items-center">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-red-500"
                />
                <button
                  onClick={sendMessage}
                  className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  <FaPaperPlane />
                </button>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MessagesAdmin;
