
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
  getCountFromServer,
  orderBy,
  limit
} from 'firebase/firestore';
import db from '@/lib/firebaseConfig';
import { v4} from 'uuid';
const collectionRef = collection(db, 'businesses');
const alertsCollectionRef = collection(db, 'alerts');
const usersCollectionRef = collection(db, 'users');



  
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

  if (business.exists()) {
    const data = business.data();
    console.log("business", data);

    if (data.isRestricted) {
      return { 
        status: "blocked"
       };
    }

    return data.requestAccepted;
  } else {
    return { message: "Invalid Credentials" };
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

export const getBusinessFollowers = async (businessEmail: string) => {
  const businessDoc = doc( collectionRef, businessEmail);
  const businessSnapshot = await getDoc(businessDoc);

  if (businessSnapshot.exists()) {
    
    const businessData = businessSnapshot.data() 
    
    return businessData.followers;
  } else {
    console.error("No such business!");
    return [];
  }
};

export const getAllBusinesses = async () => {
  try {
    const q = query(collectionRef);
    const querySnapshot = await getDocs( q);
    const businesses = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const businessData = doc.data();
        const businessId = businessData.businessId;
        const alertsQuery = query(alertsCollectionRef, where("creatorId", "==", businessId));
        const alertsSnapshot = await getDocs(alertsQuery);
        const totalAlerts = alertsSnapshot.size; // Count of alerts

        return {
          ...businessData,
          totalAlerts,
        };
      })
    );
    
    return businesses;
  } catch (error) {
    console.error("Error fetching businesses or alerts:", error);
    return [];
  }
}

export const getBusinessStats = async () => {
  try {
    // Query to get the count of businesses with accepted requests
    const acceptedQuery = query(collectionRef, where("requestAccepted", "==", true));
    const acceptedCountResult = await getCountFromServer(acceptedQuery);
    const acceptedCount = acceptedCountResult.data().count;

    // Query to get the count of businesses with not accepted requests
    const notAcceptedQuery = query(collectionRef, where("requestAccepted", "==", false));
    const notAcceptedCountResult = await getCountFromServer(notAcceptedQuery);
    const notAcceptedCount = notAcceptedCountResult.data().count;

    // Query to get the total count of businesses (irrespective of request status)
    const totalBusinessesResult = await getCountFromServer(collectionRef);
    const total = totalBusinessesResult.data().count;

    return {
      total,
      acceptedCount,
      notAcceptedCount,
    };
  } catch (error) {
    console.error("Error fetching business stats:", error);
    return {
      total: 0,
      acceptedCount: 0,
      notAcceptedCount: 0,
    };
  }
};


export const blockBusiness = async (email: string) => {
  const businessRef = doc(collectionRef, email);
  try {
    await updateDoc(businessRef, {
      isRestricted: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export const unBlockBusiness = (email:string)=>{
  try {
    const businessRef = doc(collectionRef, email);
    if(businessRef)
    {
      updateDoc(businessRef, {
        isRestricted: false,
      });
    }
  } catch (error) {
    
  }
}

export const toggleBusinessRestriction = async (email: string) => {
  const businessRef = doc(collectionRef, email);
  try {
    const business = await getDoc(businessRef);
    if (business.exists()) {
      const isRestricted = business.data().isRestricted;
      await updateDoc(businessRef, {
        isRestricted: !isRestricted,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export const getBusinessDetails = async (email: string) => {
  const businessDoc = doc(collectionRef, email);
  const businessSnapshot = await getDoc(businessDoc);

  if (businessSnapshot.exists()) {
    return businessSnapshot.data();
  } else {
    console.error("No such business!");
    return null;
  }
};


//   export const removeFollower = async (businessEmail: string, followerId: string) => {
//   try {
//     // Reference to the business document
//     const businessRef = doc(collectionRef, businessEmail);
    
//     // Get the business document
//     const businessSnapshot = await getDoc(businessRef);
    
//     if (!businessSnapshot.exists()) {
//       console.error("Business does not exist.");
//       return { success: false, message: "Business not found." };
//     }

//     // Get the current followers array
//     const businessData = businessSnapshot.data();
//     const followers = businessData.followers || [];

//     // Filter out the follower whose userId matches the followerId
//     const updatedFollowers = followers.filter(
//       (follower: { userId: string; followedOn: any }) => follower.userId !== followerId
//     );

//     // Update the business document with the new followers array
//     await updateDoc(businessRef, { followers: updatedFollowers });

//     return { success: true, message: "Follower removed successfully." };
//   } catch (error) {
//     console.error("Error removing follower:", error);
//     return { success: false, message: "An error occurred while removing the follower." };
//   }
// };

export const removeFollower = async (businessEmail: string, followerId: string) => {
  try {
    // Reference to the business document
    const businessRef = doc(collectionRef, businessEmail);
    
    // Get the business document
    const businessSnapshot = await getDoc(businessRef);
    
    if (!businessSnapshot.exists()) {
      console.error("Business does not exist.");
      return { success: false, message: "Business not found." };
    }

    // Get the current followers array
    const businessData = businessSnapshot.data();
    const followers = businessData.followers || [];

    // Filter out the follower whose userId matches the followerId
    const updatedFollowers = followers.filter(
      (follower: { userId: string; followedOn: any }) => follower.userId !== followerId
    );

    // Update the business document with the new followers array
    await updateDoc(businessRef, { followers: updatedFollowers });

    // Reference to the user document in the users collection
    const userRef = doc(usersCollectionRef, followerId);
    
    // Get the user document
    const userSnapshot = await getDoc(userRef);
    
    if (!userSnapshot.exists()) {
      console.error("User does not exist.");
      return { success: false, message: "User not found." };
    }

    // Get the current followedBusinesses array
    const userData = userSnapshot.data();
    const followedBusinesses = userData.followedBusinesses || [];

    // Filter out the businessEmail from the followedBusinesses array
    const updatedFollowedBusinesses = followedBusinesses.filter(
      (email: string) => email !== businessEmail
    );

    // Update the user document with the new followedBusinesses array
    await updateDoc(userRef, { followedBusinesses: updatedFollowedBusinesses });

    return { success: true, message: "Follower removed successfully." };
  } catch (error) {
    console.error("Error removing follower and business:", error);
    return { success: false, message: "An error occurred while removing the follower." };
  }
};