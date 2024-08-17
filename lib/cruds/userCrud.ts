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
const businessCollectionRef = collection(db, 'businesses');


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

// export const addFollowRequest = async (userEmail: string, businessData: any) => {
//   try {
//     // Query to find the user document with the provided email
//     const userQuery = query(collectionRef, where("email", "==", userEmail));
//     const querySnapshot = await getDocs(userQuery);

//     if (querySnapshot.empty) {
//       return { success: false, message: "User with this email does not exist." };
//     }
//     const businessDoc = doc(businessCollectionRef, businessData.businessId);
//     const businessSnapshot = await getDoc(businessDoc);
//     if (businessSnapshot.exists()) {

//     }

//     const userDoc = querySnapshot.docs[0].ref;
//     const userSnapshot = await getDoc(userDoc);

//     if (userSnapshot.exists()) {
//       const userData = userSnapshot.data();
//       const followRequests = userData.followRequests || [];

//       // Check if the business email already exists in the followRequests list
//       const emailExists = followRequests.some(
//         (request: { businessEmail: string }) => request.businessEmail === businessData.businessEmail
//       );

//       if (emailExists) {
//         return { success: false, message: "This business has already been requested to follow." };
//       }

//       // Create the new follow request without the timestamp
//       const newRequest = {
//         id: v4(), // Unique ID for the request
//         ...businessData,
//       };

//       console.log("🚀 ~ addFollowRequest ~ newRequest", newRequest);

//       const updatedFollowRequests = [...followRequests, newRequest];

//       // Update the user's document with the new follow request
//       await updateDoc(userDoc, { followRequests: updatedFollowRequests });

//       // Update the timestamp for the newly added request
//       // const updatedRequestsWithTimestamp = updatedFollowRequests.map((request) =>
//       //   request.id === newRequest.id ? { ...request, timestamp: serverTimestamp() } : request
//       // );

//       // await updateDoc(userDoc, { followRequests: updatedRequestsWithTimestamp });

//       return { success: true, message: "Follow request added successfully." };
//     } else {
//       console.error("User does not exist.");
//       return { success: false, message: "User not found." };
//     }
//   } catch (error) {
//     console.error("Error adding follow request:", error);
//     return { success: false, message: "An error occurred while adding the follow request." };
//   }
// };


export const addFollowRequest = async (userEmail: string, businessData: any) => {
  console.log("🚀 ~ addFollowRequest ~ businessData:", businessData)
  try {
    // Query to find the user document with the provided email
    const userQuery = query(collectionRef, where("email", "==", userEmail));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      return { success: false, message: "User with this email does not exist." };
    }

    const userDoc = querySnapshot.docs[0].ref;
    const userSnapshot = await getDoc(userDoc);
    const userId = userSnapshot.id; // Assuming the user's ID is the document ID

    if (!userSnapshot.exists()) {
      console.error("User does not exist.");
      return { success: false, message: "User not found." };
    }

    const businessDoc = doc(businessCollectionRef, businessData.businessEmail);
    const businessSnapshot = await getDoc(businessDoc);
      
    if (businessSnapshot.exists()) {
      const businessData = businessSnapshot.data();
      const followers = businessData.followers || [];

      // Check if the user is already in the followers list
      const isAlreadyFollower = followers.some(
        (follower: { userId: string }) => follower.userId === userId
      );

      if (isAlreadyFollower) {
        return { success: false, message: "This user is already a follower of your business." };
      }
    } else {
      return { success: false, message: "Business not found." };
    }

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

    return { success: true, message: "Follow request added successfully." };
  } catch (error) {
    console.error("Error adding follow request:", error);
    return { success: false, message: "An error occurred while adding the follow request." };
  }
};
