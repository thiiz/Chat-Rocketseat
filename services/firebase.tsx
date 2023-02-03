// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCY4avej0WEknnPy5Kb2p7iPxUDPQe6jK4",
	authDomain: "chat-rseat-5482a.firebaseapp.com",
	projectId: "chat-rseat-5482a",
	storageBucket: "chat-rseat-5482a.appspot.com",
	messagingSenderId: "1075420652720",
	appId: "1:1075420652720:web:163591e628f3792fda4775",
	measurementId: "G-M4R0GQFHK5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore()
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider };