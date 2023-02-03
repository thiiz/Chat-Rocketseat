import Chat from '@/components/chat';
import Login from '@/components/login';
import { auth, db } from '@/services/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from '@/components/loading';
import Home from '@/components/home';
import Header from '@/components/home/Header';

export type User = {
  name: string | null;
  email: string | null;
  img: string | null;
  isOnline: boolean;
}

const Index: React.FC<{ userData: User; }> = () => {
  const [user, loading] = useAuthState(auth as any)
  const [userData, setUserData] = useState({} as User)
  const [isOnline, setIsOnline] = useState(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("user Online ", uid)
      setIsOnline(true)
      // ...
    } else {
      console.log("user Offline")
      setIsOnline(false)
      // ...
    }
  });

  useEffect(() => {
    if (user) {
      console.log(user)
      const { email, photoURL, displayName, uid } = user
      setUserData({ email, img: photoURL, name: displayName, isOnline })
      db.collection("users").doc(uid).set({
        name: displayName,
        email: email,
        img: photoURL,
        isOnline: true
      })
    }

  }, [user]);

  if (loading) return <Loading />

  return user ?
    <>
      <Home user={userData} />
    </>
    :
    <Login />
}

export default Index