import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  collection,
  addDoc,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtZX2zM9pc3gMqjUzdyTYBuccLOnFqBfg",
  authDomain: "peesho-f67ae.firebaseapp.com",
  projectId: "peesho-f67ae",
  storageBucket: "peesho-f67ae.appspot.com",
  messagingSenderId: "1049144392559",
  appId: "1:1049144392559:web:f9c41cafcf0c69a7c7469a",
};
//Google sign in pop up
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);

//Setting data in our firestore

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const db = getFirestore();
  const userRef = doc(db, `users/${userAuth.uid}`);

  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user data", error.message);
    }
  }
  return { userRef, snapShot };
};

// getting data from our firestore

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const db = getFirestore();
  const batch = writeBatch(db);

  const collectionRef = collection(db, collectionKey);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef);

    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};
