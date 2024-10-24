import { initializeApp } from "firebase/app";


//inicializamos el sdk

const firebaseConfig = {
  apiKey: "AIzaSyAAEAYZXgWU5ECeRlIMMyJ6_vGgBC-Ns5c",
  authDomain: "pruebasutscalifica.firebaseapp.com",
  projectId: "pruebasutscalifica",
  storageBucket: "pruebasutscalifica.appspot.com",
  messagingSenderId: "473871067667",
  appId: "1:473871067667:web:90c347afe7697032a9ade6",
  measurementId: "G-B8NC4QKKN4"

  };


  const appFirebase = initializeApp(firebaseConfig);
  export default appFirebase;