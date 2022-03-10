import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: 'AIzaSyDYFvsTSQtRs9zFDqUpKS9KF2OZksaxKvE',
      authDomain: 'whatsapp-clone-2050.firebaseapp.com',
      projectId: 'whatsapp-clone-2050',
      storageBucket: 'whatsapp-clone-2050.appspot.com',
      messagingSenderId: '976628609355',
      appId: '1:976628609355:web:6838f66f2115de87bbb8ce',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage().ref('images');
const audioStorage = firebase.storage().ref('audios');
const createTimestamp = firebase.firestore.FieldValue.servrTimestamp;
const servrTimestamp = firebase.database.ServerValue.TIMESTAMP;

export { db, auth, provider, storage, audioStorage, createTimestamp, servrTimestamp };
