'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation'; // Utilisation de next/navigation pour le nouveau système de routage

const LoginPage = () => {
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifiant === 'admin001' && password === 'IBTK2024') {
      router.push('/dashboardadmin');
    } else {
      alert('Identifiant ou mot de passe incorrect');
    }
  };

  return (
    <>
      <Head>
        <title>Login Form</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <img src="/pics/lms-logo.svg" alt="LMS Logo" className="w-16 h-16 mb-4" />
            <h2 className="text-xl font-semibold mb-6">Connecter à votre compte administrateur</h2>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="identifiant" className="block text-sm font-medium text-gray-700">Identifiant</label>
              <input
                type="text"
                id="identifiant"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-red-600 hover:text-red-500">Forgot Password?</a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
