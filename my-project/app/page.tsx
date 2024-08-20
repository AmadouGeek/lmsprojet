'use client'

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  const handleAdminLogin = () => {
    router.push('/loginlms');
  };

  const handleFormateurLogin = () => {
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>LMS Login</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="flex h-screen">
        <div className="w-1/2 flex flex-col justify-center items-center bg-white">
          <div className="text-center p-8 rounded-lg shadow-lg">
            <img src="/asset/images/lms-logo.svg" alt="LMS Logo" className="w-32 h-32 mb-4 mx-auto" />
            <h1 className="text-4xl font-bold mb-8 text-gray-800">LMS Formation</h1>
            <div className="flex space-x-4">
              <button
                onClick={handleAdminLogin}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition duration-300"
              >
                Login as Administrator
              </button>
              <button
                onClick={handleFormateurLogin}
                className="border border-black text-black font-semibold py-2 px-6 rounded hover:bg-gray-100 transition duration-300"
              >
                Login as Formateur
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 relative">
          <img src="/asset/images/Vector.svg" alt="LMS Illustration" className="object-cover h-full w-full" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
