
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrTe908Otcmyf9jCsze-FivZqPiVO0pWM",
  authDomain: "personal-finance-tracker-46691.firebaseapp.com",
  projectId: "personal-finance-tracker-46691",
  storageBucket: "personal-finance-tracker-46691.appspot.com",
  messagingSenderId: "389368182373",
  appId: "1:389368182373:web:3fde648598731752c7388c",
  measurementId: "G-VG5MW23DY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };