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
  console.log("🚀 ~ fetchUserDetails ~ userId:", userId)
  const userDoc = doc(collectionRef, userId);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    return userSnapshot.data() 
  } else {
    console.error("No such user!");
    return null;
  }
};

export const addFollowRequest = async (userEmail: string, businessData: any) => {
  try {
    // Query to find the user document with the provided email
    const userQuery = query(collectionRef, where("email", "==", userEmail));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      return { success: false, message: "User with this email does not exist." };
    }

    // Assuming there's only one document per email (unique emails)
    const userDoc = querySnapshot.docs[0].ref;
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const followRequests = userData.followRequests || [];

      // Check if the business email already exists in the followRequests list
      const emailExists = followRequests.some(
        (request: { businessEmail: string }) => request.businessEmail === businessData.businessEmail
      );

      if (emailExists) {
        return { success: false, message: "This business has already been requested to follow." };
      }

      // Create the new follow request without the timestamp
      const newRequest = {
        id: v4(), // Unique ID for the request
        ...businessData,
      };

      console.log("🚀 ~ addFollowRequest ~ newRequest", newRequest);

      const updatedFollowRequests = [...followRequests, newRequest];

      // Update the user's document with the new follow request
      await updateDoc(userDoc, { followRequests: updatedFollowRequests });

      // Update the timestamp for the newly added request
      // const updatedRequestsWithTimestamp = updatedFollowRequests.map((request) =>
      //   request.id === newRequest.id ? { ...request, timestamp: serverTimestamp() } : request
      // );

      // await updateDoc(userDoc, { followRequests: updatedRequestsWithTimestamp });

      return { success: true, message: "Follow request added successfully." };
    } else {
      console.error("User does not exist.");
      return { success: false, message: "User not found." };
    }
  } catch (error) {
    console.error("Error adding follow request:", error);
    return { success: false, message: "An error occurred while adding the follow request." };
  }
};
