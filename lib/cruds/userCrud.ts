"use client"

import {
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import db from '@/lib/firebaseConfig';
import { v4} from 'uuid';

const collectionRef = collection(db, 'users');


export const fetchUserDetails = async (userId: string) => {
  const userDoc = doc(collectionRef, userId);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    return userSnapshot.data() 
  } else {
    console.error("No such user!");
    return null;
  }
};