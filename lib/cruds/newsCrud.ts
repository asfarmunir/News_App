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

const collectionRef = collection(db, 'alerts');

const id = v4();

export async function addAlert(data: any) {

  const alertData = {
    ...data,
    newsId:id,
    timestamp: serverTimestamp(),
  }
  console.log("alertData",alertData);
  try {
    const alertRef = doc(collectionRef, id);    
     await setDoc(alertRef, alertData);
    return {
        message: "Alert added successfully"
    }
  } catch (error) {
    console.error(error);
  }
}