import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBaHEjeThR5H5xvu8jQbTtk-7ynjhjLloA",
    authDomain: "jeeva-ai.firebaseapp.com",
    projectId: "jeeva-ai",
    storageBucket: "jeeva-ai.appspot.com",
    messagingSenderId: "515091589707",
    appId: "1:515091589707:web:d286ac152293ab8ae9fbce"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire;

// Your web app's Firebase configuration

