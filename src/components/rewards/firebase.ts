import firebase from 'firebase/app';
import 'firebase/database';

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
  // Export firestore database
  // It will be imported into your react app whenever it is needed
  firebase.initializeApp(firebaseConfig);

  export default firebase;