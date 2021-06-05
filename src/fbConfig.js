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