import Chat from '@/components/chat'
import { auth, db } from '@/services/firebase'
import { getUser } from '@/utils/getUser'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { UserTypes } from '..'


export const getStaticPaths: GetStaticPaths = async () => {
	const usersRef = collection(db, "chats");
	const { docs } = await getDocs(usersRef)
	const uids = docs.map(doc => doc.id);
	const ids = uids.map((id) => {
		return {
			params: { id }
		}
	})
	return {
		paths: ids,
		fallback: "blocking"

	}
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { id }: any = context.params
	const docRef: any = doc(db, "chats", id)
	const docs = await getDoc(docRef)
	const { users }: any = docs?.data()
	return { props: { usersUid: users } }
}

const UserChat: React.FC<{ usersUid: Array<string> }> = ({ usersUid }) => {
	const [user] = useAuthState(auth as any)
	const userData: UserTypes['userData'] = {
		uid: user?.uid || null,
		displayName: user?.displayName || null,
		email: user?.email || null,
		photoURL: user?.photoURL || null,
	}

	const friendUid = getUser(usersUid, userData)
	const friendUserRef = collection(db, "users")
	const q = query(friendUserRef, where("uid", "==", friendUid))
	const [userSnapshot] = useCollection(q)
	const friendUser = userSnapshot?.docs[0].data()
	return (
		<>
			<Head>
				<title>{friendUser ? `${friendUser?.displayName.toUpperCase()} | Chathiz` : 'Chathiz'}</title>
			</Head>
			<Chat friend={friendUser as UserTypes["userData"]} />
		</>
	)
}

export default UserChat