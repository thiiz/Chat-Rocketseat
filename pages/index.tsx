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
  };
  setUserData: React.Dispatch<React.SetStateAction<any>>
}

const Index: React.FC = () => {
  const [user, loading] = useAuthState(auth)
  const [userData, setUserData] = useState<UserTypes['userData']>({
    uid: null,
    displayName: null,
    email: null,
    photoURL: null,
  })

  const updateUser = async (email: string | null, photoURL: string | null, displayName: string | null, userID: string) => {
    const usersRef = doc(db, 'users', userID);
    await setDoc(usersRef, {
      uid: userID,
      displayName,
      email,
      photoURL,
      onlineAt: new Date,
    }, { merge: true })
  }

  useEffect(() => {
    if (user) {
      const { email, photoURL, displayName, uid, metadata } = user
      console.log("🚀 ~ file: index.tsx:45 ~ useEffect ~ metadata:", metadata)
      const lastFourID = uid?.slice(-4);
      const userID = `${displayName}#${lastFourID}`
      setUserData({ uid: userID, email, photoURL, displayName })
      updateUser(email, photoURL, displayName, userID)
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