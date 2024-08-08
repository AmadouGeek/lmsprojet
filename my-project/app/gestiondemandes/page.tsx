"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc, onSnapshot, addDoc } from 'firebase/firestore';
import { db, addNotification } from '@/db/configfirebase';
import { Timestamp } from 'firebase/firestore';

interface Demande {
  id: string;
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  image: string;
  requestedBy: string;
  speciality: string;
  requestDate: Date | null;
  confirmed: boolean;
}

const GestionDemandes = () => {
  const [demandes, setDemandes] = useState<Demande[]>([]);

  useEffect(() => {
    const fetchDemandes = async () => {
      const demandesCollection = collection(db, 'demandes');
      const demandesSnapshot = await getDocs(demandesCollection);
      const demandesList = demandesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          startDate: data.startDate ? (data.startDate as Timestamp).toDate() : null,
          endDate: data.endDate ? (data.endDate as Timestamp).toDate() : null,
          requestDate: data.requestDate ? (data.requestDate as Timestamp).toDate() : null,
        };
      }) as Demande[];
      setDemandes(demandesList);
    };

    const unsubscribe = onSnapshot(collection(db, 'demandes'), (snapshot) => {
      const updatedDemandes = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          startDate: data.startDate ? (data.startDate as Timestamp).toDate() : null,
          endDate: data.endDate ? (data.endDate as Timestamp).toDate() : null,
          requestDate: data.requestDate ? (data.requestDate as Timestamp).toDate() : null,
        };
      }) as Demande[];
      setDemandes(updatedDemandes);
    });

    fetchDemandes();
    return () => unsubscribe();
  }, []);

  const toggleConfirmation = async (id: string, confirmed: boolean) => {
    const demandeRef = doc(db, 'demandes', id);
    await updateDoc(demandeRef, { confirmed: !confirmed });

    const demande = demandes.find(demande => demande.id === id);

    if (demande && !confirmed) {
      if (demande.title && demande.speciality && demande.startDate && demande.endDate) {
        const startDate = demande.startDate.toISOString();
        const endDate = demande.endDate.toISOString();

        try {
          await addDoc(collection(db, 'formations'), {
            title: demande.title,
            type: demande.speciality,
            startDate: startDate,
            endDate: endDate,
            time: `${demande.startTime} - ${demande.endTime}`,
            status: 'En cours',
            location: demande.location,
            description: demande.description,
            requestedBy: demande.requestedBy,
          });
          console.log("Formation confirmée ajoutée avec succès.");
        } catch (error) {
          console.error("Erreur lors de l'ajout de la formation confirmée :", error);
        }

        await addNotification(demande.requestedBy, `Votre demande pour la formation "${demande.title}" a été confirmée.`);
      } else {
        console.error("Des champs obligatoires sont manquants dans la demande.");
      }
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Gérer les Demandes de Formations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demandes.map((formation) => (
          <div key={formation.id} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={formation.image} alt={formation.title} className="w-full h-32 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{formation.title}</h2>
            <p>Date de début : {formation.startDate?.toLocaleDateString()}</p>
            <p>Date de fin : {formation.endDate?.toLocaleDateString()}</p>
            <p>Heure : {formation.startTime} - {formation.endTime}</p>
            <p>{formation.description}</p>
            <p className="mt-4">Demandé par : {formation.requestedBy}</p>
            <p>Spécialité : {formation.speciality}</p>
            <p>Date de demande : {formation.requestDate?.toLocaleDateString()}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => toggleConfirmation(formation.id, formation.confirmed)}
                className={`py-2 px-4 rounded ${formation.confirmed ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'} hover:${formation.confirmed ? 'bg-green-600' : 'bg-blue-600'} transition duration-300`}
              >
                {formation.confirmed ? 'Confirmée, cliquez pour annuler' : 'Confirmer'}
              </button>
              <button
                onClick={() => deleteDoc(doc(db, 'demandes', formation.id))}
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Refuser
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionDemandes;
