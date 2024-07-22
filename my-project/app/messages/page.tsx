"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { FaBell, FaSearch, FaBars, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { AiFillHome, AiFillCalendar, AiFillBook, AiFillMessage, AiFillQuestionCircle, AiFillSetting, AiOutlineLogout } from 'react-icons/ai';

const messages = [
  { id: 1, sender: 'admin', text: 'Bonjour, comment ça va ?', timestamp: '12:00', profileImg: '/asset/images/admin-profile.jpg' },
  { id: 2, sender: 'formateur', text: 'Ça va bien, merci. Et vous ?', timestamp: '12:01', profileImg: '/asset/images/formateur-profile.jpg' },
  // Ajouter plus de messages si nécessaire
];

const Messages = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  const toggleSidebar = () => {
  };

  const sendMessage = () => {
    if (messageText.trim() !== "") {
      messages.push({
        id: messages.length + 1,
        sender: 'formateur',
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        profileImg: '/asset/images/formateur-profile.jpg'
      });
      setMessageText("");
    }
  };

  return (
    <>
      <Head>
        <title>Formateur Messages</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`bg-white w-64 h-full p-4 flex flex-col justify-between fixed z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
          <div>
            <div className="flex items-center justify-between mb-8">
              <img src="/asset/images/lms-logo.svg" alt="LMS Logo" className="w-16 h-16" />
            </div>
            <nav className="space-y-4">
              <a href="/dashboard" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillHome className="text-blue-600" />
                <span>Dashboard</span>
              </a>
              <a href="/formations" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillBook className="text-blue-600" />
                <span>Mes Formations</span>
              </a>
              <a href="/messages" className="block bg-red-700 text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillMessage className="text-blue-600" />
                <span>Messages</span>
              </a>
              <a href="/calendrier" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillCalendar className="text-blue-600" />
                <span>Calendrier</span>
              </a>
              <div className="flex-1"></div>
              <a href="/help" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillQuestionCircle className="text-blue-600" />
                <span>Help</span>
              </a>
              <a href="/account" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiFillSetting className="text-blue-600" />
                <span>Account</span>
              </a>
              <a href="/logout" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
                <AiOutlineLogout className="text-blue-600" />
                <span>Logout</span>
              </a>
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
                <div className="ml-2 text-gray-700">Alex Johnson</div>
              </div>
            </div>
          </header>

          {/* Messages Content */}
          <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-4">Messages</h1>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'formateur' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'admin' && (
                    <img
                      src={message.profileImg}
                      alt="Admin Profile"
                      className="w-10 h-10 rounded-full mr-4"
                    />
                  )}
                  <div
                    className={`p-4 rounded-lg shadow-md max-w-xs ${message.sender === 'formateur' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
                      }`}
                  >
                    <p className="mb-1">{message.text}</p>
                    <span className="text-xs">{message.timestamp}</span>
                  </div>
                  {message.sender === 'formateur' && (
                    <img
                      src={message.profileImg}
                      alt="Formateur Profile"
                      className="w-10 h-10 rounded-full ml-4"
                    />
                  )}
                </div>
              ))}
            </div>
          </main>

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
      </div>
    </>
  );
};

export default Messages;
