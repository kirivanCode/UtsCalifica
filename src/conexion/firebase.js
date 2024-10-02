import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC006GcS33eVO59dh3Ba8ItYUEmz_kqujo",
    authDomain: "utscalifica.firebaseapp.com",
    projectId: "utscalifica",
    storageBucket: "utscalifica.appspot.com",
    messagingSenderId: "869868796018",
    appId: "1:869868796018:web:551d1cde85d3aba3226aeb",
    measurementId: "G-FT4SEBSTMQ"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };