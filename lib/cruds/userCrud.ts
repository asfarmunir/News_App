"use client"

import {
  doc,
  updateDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';
import db from '@/lib/firebaseConfig';
import { v4} from 'uuid';
import { revalidatePath } from 'next/cache';

const collectionRef = collection(db, 'users');
const businessCollectionRef = collection(db, 'businesses');


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

export const addFollowRequest = async (userEmail: string, businessData: any) => {
  console.log("🚀 ~ addFollowRequest ~ businessData:", businessData);
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

    const updatedFollowRequests = [...followRequests, newRequest];

    // Add the follow request to the user's document
    await updateDoc(userDoc, { followRequests: updatedFollowRequests });

    // Create a new notification
    const newNotification = {
      businessName: businessData.businessName,
      message: `You have a new follow request from ${businessData.businessName}.`,
      timestampe : Date.now(),
      markedAsRead: false,
    };

    // Add the notification to the user's notifications array
    const notifications = userData.notifications || [];
    const updatedNotifications = [...notifications, newNotification];
    console.log("🚀 ~ addFollowRequest ~ updatedNotifications:", updatedNotifications)

    // Update the user's document with the new notifications array
    await updateDoc(userDoc, { notifications: updatedNotifications });

    return { success: true, message: "Follow request added successfully." };
  } catch (error) {
    console.error("Error adding follow request :", error);
    return { success: false, message: "An error occurred while adding the follow request." };
  }
};


export const getDeleteRequests = async () => {
  try {
    const q = query(collectionRef, where("deleteRequest", "==", 'pending'));
    const querySnapshot = await getDocs(q);
    const deleteRequests = querySnapshot.docs.map((doc) => doc.data());
    return deleteRequests;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const handleUserDeleteRequest = async (userId: string) => {
  try {
    const userDoc = doc(collectionRef, userId);
    await updateDoc(userDoc, { deleteRequest: 'approved' });
    return { success: true, message: "User delete request approved." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "An error occurred while approving the delete request." };
  }
}

export const handleDeleteRequest = async (userId:string, requestAccepted:boolean) => {
  console.log("🚀 ~ handleDeleteRequest ~ requestAccepted:", requestAccepted)
  console.log("🚀 ~ handleDeleteRequest ~ userId:", userId)
  try {
    const userDocRef = doc(db, "users", userId); // Replace "users" with your collection name

    if (requestAccepted) {
      // Delete the user document
      await deleteDoc(userDocRef);
      console.log(`User with ID ${userId} has been deleted.`);
    } else {
      // Update the deleteRequest field to false
      await updateDoc(userDocRef, { deleteRequest: "false" });
      console.log(`Delete request for user with ID ${userId} has been rejected.`);
    }


    return true; // Indicate success
  } catch (error) {
    console.error("Error handling delete request:", error);
    return false; // Indicate failure
  }
};