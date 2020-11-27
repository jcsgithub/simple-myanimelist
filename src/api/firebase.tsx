import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBA9V0egPlTgHAkeOtva-NggAGZZtUbzFs",
  authDomain: "simple-myanimelist.firebaseapp.com",
  databaseURL: "https://simple-myanimelist.firebaseio.com",
  projectId: "simple-myanimelist",
  storageBucket: "simple-myanimelist.appspot.com",
  messagingSenderId: "734940639447",
  appId: "1:734940639447:web:b6c6295bc6d5fb69e8c092",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
