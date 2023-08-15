import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCdU8gVH6IdnSqTLCLk2SiW9iH08tcM_VU",
    authDomain: "pixeldemnxyzapp.firebaseapp.com",
    databaseURL: "https://pixeldemnxyzapp-default-rtdb.firebaseio.com",
    projectId: "pixeldemnxyzapp",
    storageBucket: "pixeldemnxyzapp.appspot.com",
    messagingSenderId: "825886271451",
    appId: "1:825886271451:web:2985c112f066eb165a29fe",
    measurementId: "G-LW1XDS9SVT"
  };
  
  const app = initializeApp(firebaseConfig);
  
  export const db = getFirestore(app);