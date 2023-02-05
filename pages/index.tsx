import Login from '@/components/login';
import { auth, db } from '@/services/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from '@/components/loading';
import Home from '@/components/home';
import Head from 'next/head';
import { doc, setDoc } from 'firebase/firestore';


export interface UserTypes {
  userData: {
    uid: string | null;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    isOnline: boolean;
  };
  setUserData: React.Dispatch<React.SetStateAction<any>>
}

const Index: React.FC = () => {
  const [user, loading] = useAuthState(auth as any)
  const [userData, setUserData] = useState<UserTypes['userData']>({
    uid: null,
    displayName: null,
    email: null,
    photoURL: null,
    isOnline: true,
  })
  const [isOnline, setIsOnline] = useState(false)

  const updateUser = async (email: string | null, photoURL: string | null, displayName: string | null, uid: string) => {
    const usersRef = doc(db, 'users', uid);
    await setDoc(usersRef, {
      uid,
      displayName,
      email,
      photoURL,
    }, { merge: true })
  }

  useEffect(() => {
    if (user) {
      const { email, photoURL, displayName, uid } = user
      setUserData({ uid, email, photoURL, displayName, isOnline })
      updateUser(email, photoURL, displayName, uid)
    }

  }, [user]);

  if (loading) return <Loading />

  return user ?
    <>
      <Head>
        <title>Chathiz | Rseat</title>
      </Head>
      <Home userData={userData} setUserData={setUserData} />
    </>
    :
    <Login />
}

export default Index