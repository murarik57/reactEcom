import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtZX2zM9pc3gMqjUzdyTYBuccLOnFqBfg",
  authDomain: "peesho-f67ae.firebaseapp.com",
  projectId: "peesho-f67ae",
  storageBucket: "peesho-f67ae.appspot.com",
  messagingSenderId: "1049144392559",
  appId: "1:1049144392559:web:f9c41cafcf0c69a7c7469a",
};

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
