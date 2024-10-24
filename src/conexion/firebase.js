import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAEAYZXgWU5ECeRlIMMyJ6_vGgBC-Ns5c",
  authDomain: "pruebasutscalifica.firebaseapp.com",
  projectId: "pruebasutscalifica",
  storageBucket: "pruebasutscalifica.appspot.com",
  messagingSenderId: "473871067667",
  appId: "1:473871067667:web:90c347afe7697032a9ade6",
  measurementId: "G-B8NC4QKKN4"

  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };