import type { NextApiRequest, NextApiResponse } from 'next'
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const firebaseConfig = {
    apiKey: "AIzaSyCY4avej0WEknnPy5Kb2p7iPxUDPQe6jK4",
    authDomain: "chat-rseat-5482a.firebaseapp.com",
    projectId: "chat-rseat-5482a",
    storageBucket: "chat-rseat-5482a.appspot.com",
    messagingSenderId: "1075420652720",
    appId: "1:1075420652720:web:163591e628f3792fda4775",
    measurementId: "G-M4R0GQFHK5"
  };

  const app = firebase.initializeApp(firebaseConfig);

  const db = app.firestore()
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider()

  const [user, loading] = useAuthState(auth as any)

  res.json({
    db,
    auth,
    provider
  })
}
