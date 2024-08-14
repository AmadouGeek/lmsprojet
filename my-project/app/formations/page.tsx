'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar';
import Sidebar from '@/app/components/sidebar';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/db/configfirebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Formation {
  id: string;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  time: string;
  status: string;
  location: string;
  description: string;
}

interface Demande {
  formationId: string;
  requestedBy: string;
  confirmed: boolean;
}

const Formations: React.FC = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [monthFilter, setMonthFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormations = async () => {
      setLoading(true);
      setError(null);
      try {
        if (user) {
          const demandesRef = collection(db, 'demandes');
          const demandesQuery = query(demandesRef, where('requestedBy', '==', user.uid), where('confirmed', '==', true));
          const demandesSnapshot = await getDocs(demandesQuery);

          const formationsList: Formation[] = [];

          for (const demandeDoc of demandesSnapshot.docs) {
            const demandeData = demandeDoc.data() as Demande;
            const formationDocRef = doc(db, 'formations', demandeData.formationId);
            const formationDocSnap = await getDoc(formationDocRef);

            if (formationDocSnap.exists()) {
              const formationData = formationDocSnap.data() as Omit<Formation, 'id'>;
              formationsList.push({ id: formationDocSnap.id, ...formationData });
            }
          }

          setFormations(formationsList);
        }
      } catch (err) {
        setError('Failed to load formations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, [user]);

  const handleMonthFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonthFilter(event.target.value);
  };

  const handleTypeFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(event.target.value);
  };

  const filteredFormations = formations.filter((formation) => {
    const matchesMonth = monthFilter ? formation.startDate.includes(monthFilter) : true;
    const matchesType = typeFilter ? formation.type === typeFilter : true;
    return matchesMonth && matchesType;
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openModal = (formation: Formation) => {
    setSelectedFormation(formation);
  };

  const closeModal = () => {
    setSelectedFormation(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} user={user} />
        <main className="flex-1 p-8 bg-gray-50">
          <h1 className="text-3xl font-bold mb-4">Mes Formations</h1>
          {loading ? (
            <p>Chargement des formations...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div className="flex mb-4">
                <select
                  value={monthFilter}
                  onChange={handleMonthFilterChange}
                  className="mr-4 p-2 border rounded"
                >
                  <option value="">Tous les mois</option>
                  <option value="-01-">Janvier</option>
                  <option value="-02-">Février</option>
                  <option value="-03-">Mars</option>
                  <option value="-04-">Avril</option>
                  <option value="-05-">Mai</option>
                  <option value="-06-">Juin</option>
                  <option value="-07-">Juillet</option>
                  <option value="-08-">Août</option>
                  <option value="-09-">Septembre</option>
                  <option value="-10-">Octobre</option>
                  <option value="-11-">Novembre</option>
                  <option value="-12-">Décembre</option>
                </select>
                <select
                  value={typeFilter}
                  onChange={handleTypeFilterChange}
                  className="p-2 border rounded"
                >
                  <option value="">Tous les types</option>
                  <option value="Informatique">Informatique</option>
                  <option value="Marketing">Marketing</option>
                  {/* Ajoutez d'autres options de types ici */}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFormations.map((formation) => (
                  <div key={formation.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-4">
                      <h2 className="text-xl font-bold mb-2">{formation.title}</h2>
                      <p className="text-gray-600 mb-2">{formation.type}</p>
                      <div className="flex justify-between items-center">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => openModal(formation)}>
                          Détails
                        </button>
                        <p className={`text-sm font-semibold mt-2 ${formation.status === 'Terminée' ? 'text-green-600' : 'text-blue-600'}`}>
                          {formation.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Modal */}
          {selectedFormation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4">{selectedFormation.title}</h2>
                <p>Date de début: {selectedFormation.startDate}</p>
                <p>Date de fin: {selectedFormation.endDate}</p>
                <p>Heure: {selectedFormation.time}</p>
                <p>Lieu: {selectedFormation.location}</p>
                <p>Description: {selectedFormation.description}</p>
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={closeModal}>Fermer</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Formations;
