 
import firebase from 'firebase/app'; 
import 'firebase/firestore';
import 'firebase/auth';
 
 
 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyCU_V66k6IACoDzbvVWFZ0TZUWyzAVGo60",
  authDomain: "journal-app-78a92.firebaseapp.com",
  databaseURL: "https://journal-app-78a92.firebaseio.com",
  projectId: "journal-app-78a92",
  storageBucket: "journal-app-78a92.appspot.com",
  messagingSenderId: "131521548678",
  appId: "1:131521548678:web:1bb84ad54f7e58a5b21c07"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// referencia a base de datos
const db = firebase.firestore();

//Esta es la forma de autenticarse con el correo de google, de este mismo modo se puede autenticar con twitter, facebook, correo, etc. 
const googleAuthProvider= new firebase.auth.GoogleAuthProvider();

export {db, googleAuthProvider, firebase}