"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaBell, FaSearch, FaBars, FaPaperPlane, FaFilePdf } from 'react-icons/fa';
import { AiFillHome, AiFillCalendar, AiFillBook, AiFillMessage, AiFillSetting, AiOutlineLogout } from 'react-icons/ai';
import { db, collection, addDoc, query, orderBy, onSnapshot, storage, ref, uploadBytes, getDownloadURL } from '@/db/configfirebase';

const Messages = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const q = query(collection(db, `discussions/1/messages`), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs.map(doc => doc.data());
      setMessages(messagesList);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (messageText.trim() !== "" || file !== null) {
      let fileURL = null;
      if (file) {
        const storageRef = ref(storage, `uploads/${file.name}`);
        await uploadBytes(storageRef, file);
        fileURL = await getDownloadURL(storageRef);
      }
      await addDoc(collection(db, `discussions/1/messages`), {
        sender: 'formateur',
        text: messageText,
        file: fileURL,
        timestamp: new Date(),
        profileImg: '/asset/images/formateur-profile.jpg'
      });
      setMessageText("");
      setFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <Head>
        <title>Formateur Messages</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <div className="flex h-screen bg-gray-100">
        <aside className={`bg-white w-64 h-full p-4 flex flex-col justify-between fixed z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
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
            <a href="/account" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
              <AiFillSetting className="text-blue-600" />
              <span>Account</span>
            </a>
            <a href="/logout" className="block bg-white text-blue-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded flex items-center space-x-2">
              <AiOutlineLogout className="text-blue-600" />
              <span>Logout</span>
            </a>
          </nav>
        </aside>

        <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <header className="bg-red-300 p-4 flex items-center justify-between">
            <button onClick={toggleSidebar} className="text-red-600 text-2xl">
              <FaBars />
            </button>
            <img src="/asset/images/lms-logo.svg" alt="LMS Logo" className="w-16 h-16 ml-4" />
          </header>

          <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-4">Messages</h1>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'formateur' ? 'justify-end' : 'justify-start'}`}>
                  {message.sender === 'admin' && (
                    <img src={message.profileImg} alt="Admin Profile" className="w-10 h-10 rounded-full mr-4" />
                  )}
                  <div className={`p-4 rounded-lg shadow-md max-w-xs ${message.sender === 'formateur' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                    <p className="mb-1">{message.text}</p>
                    {message.file && (
                      <a href={message.file} target="_blank" rel="noopener noreferrer" className="text-blue-300">
                        <FaFilePdf /> Fichier PDF
                      </a>
                    )}
                    <span className="text-xs">{new Date(message.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  {message.sender === 'formateur' && (
                    <img src={message.profileImg} alt="Formateur Profile" className="w-10 h-10 rounded-full ml-4" />
                  )}
                </div>
              ))}
            </div>
          </main>

          <footer className="bg-white p-4 flex items-center">
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="mr-4" />
            <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder="Tapez votre message..." className="flex-1 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-red-500" />
            <button onClick={sendMessage} className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              <FaPaperPlane />
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Messages;
