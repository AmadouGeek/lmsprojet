import React from 'react';
import Head from 'next/head';

const EditProfile = () => {
  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="bg-gray-100 flex">
        {/* Sidebar */}
        <aside className="bg-red-600 w-64 h-screen p-4">
          <div className="flex flex-col items-center">
            <img src="/pics/lms-logo.svg" alt="LMS Logo" className="w-16 h-16 mb-8" />
            <div className="text-center text-white mb-8">
              <img src="/path/to/profile.jpg" alt="Profile Picture" className="w-16 h-16 rounded-full mb-2" />
              <div>Hi, Alex</div>
              <div>E173037</div>
            </div>
            <nav className="flex flex-col space-y-4 w-full">
              <a href="#" className="flex items-center space-x-2 bg-blue-200 text-black p-2 rounded">
                <img src="/icons/home-icon.svg" alt="Home" className="w-6 h-6" />
                <span>Home</span>
              </a>
              <a href="#" className="flex items-center space-x-2 bg-blue-200 text-black p-2 rounded">
                <img src="/icons/courses-icon.svg" alt="My Courses" className="w-6 h-6" />
                <span>My Courses</span>
              </a>
              <a href="#" className="flex items-center space-x-2 bg-blue-200 text-black p-2 rounded">
                <img src="/icons/assignments-icon.svg" alt="Assignments" className="w-6 h-6" />
                <span>Assignments</span>
              </a>
              <a href="#" className="flex items-center space-x-2 bg-blue-200 text-black p-2 rounded">
                <img src="/icons/timetable-icon.svg" alt="Time Table" className="w-6 h-6" />
                <span>Time Table</span>
              </a>
              <a href="#" className="flex items-center space-x-2 bg-blue-200 text-black p-2 rounded">
                <img src="/icons/settings-icon.svg" alt="Settings" className="w-6 h-6" />
                <span>Settings</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Edit Profile</h1>
          </div>
          <div className="bg-white p-8 rounded-lg shadow">
            <form>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label htmlFor="first-name" className="block text-gray-700">First Name</label>
                  <input type="text" id="first-name" name="first-name" placeholder="Mehrab" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-gray-700">Last Name</label>
                  <input type="text" id="last-name" name="last-name" placeholder="Bozorgi" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  <input type="email" id="email" name="email" placeholder="mehrabbozorgi.business@gmail.com" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div>
                  <label htmlFor="profession" className="block text-gray-700">Profession</label>
                  <input type="text" id="profession" name="profession" placeholder="33062 Zboncak isle" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label htmlFor="contact-number" className="block text-gray-700">Contact Number</label>
                  <input type="text" id="contact-number" name="contact-number" placeholder="0601020304" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div>
                  <label htmlFor="domaine-intervention" className="block text-gray-700">Domaine d’intervention</label>
                  <select id="domaine-intervention" name="domaine-intervention" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>Mehrab</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label htmlFor="diplome" className="block text-gray-700">Diplome</label>
                  <input type="file" id="diplome" name="diplome" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default EditProfile;
