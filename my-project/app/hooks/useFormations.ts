import { useState, useEffect } from 'react';
import { db, storage } from '@/db/configfirebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface Formation {
  id?: string;
  title: string;
  description: string;
  type: string;
  image?: string;
  date: Date;
  time: string;
  imageFile?: File;
}

const useFormations = () => {
  const [formations, setFormations] = useState<Formation[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "formations"), (snapshot) => {
      const formations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Formation[];
      setFormations(formations);
    });

    return () => unsubscribe();
  }, []);

  const addFormation = async (formation: Formation) => {
    if (formation.imageFile) {
      const imageRef = ref(storage, `formations/${Date.now()}_${formation.imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, formation.imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);
      formation.image = imageUrl;
    }
    delete formation.imageFile;
    await addDoc(collection(db, "formations"), formation);
  };

  const updateFormation = async (id: string, formation: Partial<Formation>) => {
    if (formation.imageFile) {
      const imageRef = ref(storage, `formations/${Date.now()}_${formation.imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, formation.imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);
      formation.image = imageUrl;
    }
    delete formation.imageFile;
    const formationRef = doc(db, "formations", id);
    await updateDoc(formationRef, formation);
  };

  const deleteFormation = async (id: string) => {
    await deleteDoc(doc(db, "formations", id));
  };

  return { formations, addFormation, updateFormation, deleteFormation };
};

export default useFormations;
