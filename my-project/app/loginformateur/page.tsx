"use client";

import React from 'react';
import Head from 'next/head';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const handleGoogleLoginSuccess = (response: any) => {
    console.log(response);
    // Handle successful login here (e.g., send token to your backend)
  };

  const handleGoogleLoginFailure = (response: any) => {
    console.error(response);
    // Handle failed login here
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
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <div className="bg-gray-100 flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex flex-col items-center mb-6">
              <img src="/pics/lms-logo.svg" alt="LMS Logo" className="w-16 h-16 mb-4" />
              <h2 className="text-xl font-semibold mb-6">Connectez-vous en tant que Formateur</h2>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
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
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Remember my preference</label>
                </div>
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
              <div className="text-center text-sm text-gray-600">
                <p>Don't have an account? <a href="#" className="font-medium text-red-600 hover:text-red-500">Sign up</a></p>
              </div>
              <div className="mt-6">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onFailure={handleGoogleLoginFailure}
                  buttonText="Sign in with Google"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                />
              </div>
            </form>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default LoginPage;
