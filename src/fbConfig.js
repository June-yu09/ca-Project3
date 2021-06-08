import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyCkkSJmiEybGP_bI-JzwrLiBh0nmjbUR1A",
    authDomain: "project3-73624.firebaseapp.com",
    projectId: "project3-73624",
    storageBucket: "project3-73624.appspot.com",
    messagingSenderId: "884031688647",
    appId: "1:884031688647:web:d8bf1044e97e5c861ad3e2",
    
};


firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;


// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// appId: process.env.REACT_APP_FIREBASE_APP_ID,