
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { Attendee } from "../types";

// Replace these with the actual config from the jodisfields/performates project
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "performates-melbourne.firebaseapp.com",
  projectId: "performates-melbourne",
  storageBucket: "performates-melbourne.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const registerAttendee = async (data: Attendee) => {
  try {
    const docRef = await addDoc(collection(db, "rsvps"), {
      ...data,
      registeredAt: serverTimestamp(),
      status: 'pending'
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
