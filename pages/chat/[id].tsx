import Chat from '@/components/chat'
import { db } from '@/services/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'

export const getStaticPaths: GetStaticPaths = async () => {
	const chatsRef = collection(db, "users");
	const { docs } = await getDocs(chatsRef)
	const uids = docs.map(doc => doc.data().uid);
	console.log(uids)
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
	const chatsRef = collection(db, "users");
	const q = query(chatsRef, where("uid", "==", id));
	const { docs } = await getDocs(q)

	const user = docs[0].data()
	return { props: { user } }
}

const Username = ({ user }: any) => {
	console.log("paths: ", user)
	return (
		<Chat user={user} />
	)
}
export default Username