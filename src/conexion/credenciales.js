import { initializeApp } from "firebase/app";


//inicializamos el sdk

const firebaseConfig = {
    apiKey: "AIzaSyC006GcS33eVO59dh3Ba8ItYUEmz_kqujo",
    authDomain: "utscalifica.firebaseapp.com",
    projectId: "utscalifica",
    storageBucket: "utscalifica.appspot.com",
    messagingSenderId: "869868796018",
    appId: "1:869868796018:web:551d1cde85d3aba3226aeb",
    measurementId: "G-FT4SEBSTMQ"
  };


  const appFirebase = initializeApp(firebaseConfig);
  export default appFirebase;