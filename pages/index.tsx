import Chat from '@/components/chat';
import Login from '@/components/login';
import { auth, db } from '@/services/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from '@/components/loading';
import Home from '@/components/home';


export interface UserTypes {
  userData: {
    name: string | null;
    email: string | null;
    img: string | null;
    isOnline: boolean;
  };
  setUserData: React.Dispatch<React.SetStateAction<any>>
}

const Index: React.FC<UserTypes> = () => {
  const [user, loading] = useAuthState(auth as any)
  const [userData, setUserData] = useState<UserTypes['userData']>({
    name: null,
    email: null,
    img: null,
    isOnline: false,
  })
  const [isOnline, setIsOnline] = useState(false)


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
      <Home userData={userData} setUserData={setUserData} />
    </>
    :
    <Login />
}

export default Index