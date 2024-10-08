'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, db, setDoc, doc, getDoc } from '@/db/configfirebase';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Vérifier si les données utilisateur existent déjà
      const userDocRef = doc(db, 'admins', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // Si les données n'existent pas, créer un document avec des champs vides
        await setDoc(userDocRef, {
          firstName: '',
          lastName: '',
          email: user.email || '',
          phone: '',
          profession: '',
          domain: '',
          experience: '',
          diploma: '',
          photoURL: user.photoURL || '',
        });
      }

      router.push('/dashboardadmin');
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Vérifier si les données utilisateur existent déjà
      const userDocRef = doc(db, 'admins', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // Si les données n'existent pas, créer un document avec des champs vides
        await setDoc(userDocRef, {
          firstName: '',
          lastName: '',
          email: user.email || '',
          phone: '',
          profession: '',
          domain: '',
          experience: '',
          diploma: '',
          photoURL: '',
        });
      }

      router.push('/dashboardadmin');
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  };

  const handleSignUpRedirect = () => {
    router.push('/creationcompte');
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
            <h2 className="text-xl font-semibold mb-6">Connectez-vous en tant qu'Administrateur</h2>
          </div>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => router.push('/forgot-password')}
                  className="font-medium text-red-600 hover:text-red-500"
                >
                  Forgot Password?
                </button>
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
            <div className="text-center text-sm text-gray-600">
              <p>Don't have an account? <button type="button" onClick={handleSignUpRedirect} className="font-medium text-red-600 hover:text-red-500">Create one</button></p>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
