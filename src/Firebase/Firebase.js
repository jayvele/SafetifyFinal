import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyBH4utT-V46VjcbX8TEruOrO1ABPvZjhBw",
  authDomain: "safetifydatabase.firebaseapp.com",
  projectId: "safetifydatabase",
  storageBucket: "safetifydatabase.appspot.com",
  messagingSenderId: "263168978883",
  appId: "1:263168978883:web:acfdb280a519e4c4a5d776",
  measurementId: "G-H73FH25ZFD",
});

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
