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
} from 'firebase/firestore';
import db from '@/lib/firebaseConfig';
import { v4} from 'uuid';

const collectionRef = collection(db, 'alerts');
const businessCollectionRef = collection(db, 'businesses');
const usersCollectionRef = collection(db, 'users');



// export async function addAlert(data: any) {
//     const id = v4();
//     console.log("🚀 ~ id:", id)
//   const alertData = {
//     ...data,
//     newsId:id,
//     timestamp: serverTimestamp(),
//   }
//   console.log("alertData",alertData);
//   try {
//     const alertRef =  doc(collectionRef, id);    
//      await setDoc(alertRef, alertData);
//     return {
//         message: "Alert added successfully"
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }


export async function addAlert(data: any) {
  const id = v4();
  console.log("🚀 ~ id:", id);

  const alertData = {
    ...data,
    newsId: id,
    timestamp: serverTimestamp(),
  };
  
  console.log("alertData", alertData);

  try {
    // Add the alert to the alerts collection
    const alertRef = doc(collectionRef, id);
    await setDoc(alertRef, alertData);

    // Fetch the business document using creatorEmail
    const businessQuery = query(businessCollectionRef, where("email", "==", data.creatorEmail));
    const businessSnapshot = await getDocs(businessQuery);

    if (businessSnapshot.empty) {
      console.error("Business not found for the given creatorEmail.");
      return { message: "Business not found." };
    }

    // Assuming one business document per email
    const businessDoc = businessSnapshot.docs[0];
    const businessData :any = businessDoc.data();

    const followers = businessData.followers || [];

    // Iterate through each follower and add a notification
    for (const follower of followers) {
      const userRef = doc(usersCollectionRef, follower.userId);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const notifications = userData.notifications || [];

        const newNotification = {
          businessName: businessData.BusinessName, // Assuming businessData has a 'name' field
          message: `A new alert has been added by ${businessData.BusinessName}.`,
          timestamp: Date.now(),
          markedAsRead: false,
        };

        const updatedNotifications = [...notifications, newNotification];

        // Update the user's notifications array
        await updateDoc(userRef, { notifications: updatedNotifications });
      } else {
        console.error(`User with ID ${follower.userId} not found.`);
      }
    }

    return { message: "Alert and notifications added successfully." };
  } catch (error) {
    console.error("Error adding alert and notifications:", error);
    return { message: "An error occurred while adding the alert and notifications." };
  }
}


export const getTotalAlertCount = async () => {
  try {
         const q = query(collectionRef);
    const totalAlerts =  await getCountFromServer(q)
    return totalAlerts.data().count;
    
  } catch (error) {
    console.error(error);
  }
}


export const getTotalAlertsOfBusiness = async (email: string) =>
{
  
  try {
      const q = query(collectionRef, where("creatorEmail", "==", email));
    const totalAlerts =  await getCountFromServer(q)
    return totalAlerts.data().count;
    
  } catch (error) {
    console.error(error)
  }
}

export const deleteAlert = async (id: any) => {
  console.log("🚀 ~ deleteAlert ~ id", id)
  try {
    await deleteDoc(doc(collectionRef, id.newsId));
    return {
      status: 201,
      message: "Alert deleted successfully"
    }
  } catch (error) {
    console.error(error)
  }
}


interface IAlert {
  name: string;
  description: string;
  link: string;
  date: string;
  creatorId: string;
  creatorEmail: string;
  timeStamps: string;
  newsId: string;
  creatorDetails?: any;
}

// export const getAllAlerts = async () =>{
//   try {
//     const querySnapshot = await getDocs(collectionRef);
//     let alerts: IAlert[] = [];
//     querySnapshot.forEach((doc) => {
//       alerts.push(doc.data() as IAlert);
//     });
//     return alerts;
//   } catch (error) {
//     console.error(error)
//   }
// }


// export const getAllAlerts = async (email: string ): Promise<IAlert[]> => {
//   console.log("🚀 ~ getAllAlerts ~ email:", email)
  
//   try {
//     const querySnapshot = await getDocs(collectionRef);
//     const alerts: IAlert[] = [];

//     const alertsWithUserDetails = await Promise.all(
//       querySnapshot.docs.map(async (docSnapshot) => {
//         const alertData = docSnapshot.data() as IAlert;
        
//         try {
//           const alertCreatorDocRef = doc(db, "businesses", alertData.creatorEmail);
//           const alertCreatorDoc = await getDoc(alertCreatorDocRef);
          
          
//           if (alertCreatorDoc.exists()) {
//                 const alertCreatorData = alertCreatorDoc.data();
//             alertData.creatorDetails = alertCreatorData;
//           }
//         } catch (error) {
//           console.error(`Failed to fetch creator details for alert ${alertData.name}:`, error);
//         }
        
//         return alertData;
//       })
//     );


export const getAllAlerts = async (name: string): Promise<IAlert[]> => {
  const searchText = name.toLowerCase();
  try {
    let alertsWithUserDetails: IAlert[] = [];

    if (searchText === "") {
      // If email is an empty string, fetch all alerts
      const querySnapshot = await getDocs(collectionRef);

      alertsWithUserDetails = await Promise.all(
        querySnapshot.docs.map(async (docSnapshot) => {
          const alertData = docSnapshot.data() as IAlert;

          try {
            const alertCreatorDocRef = doc(db, "businesses", alertData.creatorEmail);
            const alertCreatorDoc = await getDoc(alertCreatorDocRef);

            if (alertCreatorDoc.exists()) {
              const alertCreatorData = alertCreatorDoc.data();
              alertData.creatorDetails = alertCreatorData;
            }
          } catch (error) {
            console.error(`Failed to fetch creator details for alert ${alertData.name}:`, error);
          }

          return alertData;
        })
      );
    } else {
      const businessQuery = query(collection(db, "businesses"), where("BusinessName", "==", searchText));
      const businessSnapshot = await getDocs(businessQuery);

      if (!businessSnapshot.empty) {
        const businessData = businessSnapshot.docs[0].data();
        const businessEmail = businessData.email;

        const alertsQuery = query(collectionRef, where("creatorEmail", "==", businessEmail));
        const alertsSnapshot = await getDocs(alertsQuery);

        alertsWithUserDetails = await Promise.all(
          alertsSnapshot.docs.map(async (docSnapshot) => {
            const alertData = docSnapshot.data() as IAlert;

            try {
              const alertCreatorDocRef = doc(db, "businesses", alertData.creatorEmail);
              const alertCreatorDoc = await getDoc(alertCreatorDocRef);

              if (alertCreatorDoc.exists()) {
                const alertCreatorData = alertCreatorDoc.data();
                alertData.creatorDetails = alertCreatorData;
              }
            } catch (error) {
              console.error(`Failed to fetch creator details for alert ${alertData.name}:`, error);
            }

            return alertData;
          })
        );
      } else {
        console.error(`No business found with the name: ${searchText}`);
      }
    }

    return alertsWithUserDetails;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return [];
  }
};

export const getAllAlertsforStats = async () => {
  try {
    const querySnapshot = await getDocs(collectionRef);
    let alerts: IAlert[] = [];
    querySnapshot.forEach((doc) => {
      alerts.push(doc.data() as IAlert);
    });
    return alerts as IAlert[];
  } catch (error) {
    console.error(error)
  }
}

export const removeAlert = async (id: any) => {
  try {
    await deleteDoc(doc(collectionRef, id));
    return {
      status: 201,
      message: "Alert deleted successfully"
    }
  } catch (error) {
    console.error(error)
  }
}