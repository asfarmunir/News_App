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
const collectionRef = collection(db, 'businesses');



  
 export async function addBusiness(data: any) {

    const businessData = {
      ...data,
      timestamp: serverTimestamp(),
      requestAccepted: false,
      isAdmin : false,
    }
    console.log("businessData",businessData);
    try {
      const businessRef = doc(collectionRef, data.email);
      await setDoc(businessRef, businessData);
    } catch (error) {
      console.error(error);
    }
  }

export async function isBusinessApproved(email: string) {
  const businessRef = doc(collectionRef, email);
  const business = await getDoc(businessRef);
  console.log("business", business);

  if (business.exists()) {
    console.log("business", business.data());
    return business.data().requestAccepted;
  } else {
    return {
      message: "Invalid Credentials"
    };
  }
}


export function getAllApprovalRequests(callback: (requests: any[]) => void) {
  try {
    const q = query(collectionRef, where("requestAccepted", "==", false));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const approvalRequests = querySnapshot.docs.map(doc => doc.data());
      callback(approvalRequests);
    });
    return unsubscribe;
  } catch (error) {
    console.error(error);
    return () => {};
  }
}

export async function approveRequest (email: string) {
  const businessRef = doc(collectionRef, email);
  try {
    await updateDoc(businessRef, {
      requestAccepted: true,
    });
  } catch (error) {
    console.error(error);
  }
}