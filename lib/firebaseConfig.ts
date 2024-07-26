import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfyX-VCFAEL3nwpJDyJ_XmXAMm05jA9KY",
  authDomain: "newsapp-cb4bb.firebaseapp.com",
  projectId: "newsapp-cb4bb",
  storageBucket: "newsapp-cb4bb.appspot.com",
  messagingSenderId: "858161419615",
  appId: "1:858161419615:web:2947df8b4f2059c0b292ea",
  measurementId: "G-NXS8616JXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);  
export default getFirestore(app); 