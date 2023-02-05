import Image from 'next/image'
import {
	FriendsContainer,
	ContainerUl,
} from './styleFriends'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/services/firebase';
import { useEffect } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import FriendItem from './FriendItem';
import { useCollection } from 'react-firebase-hooks/firestore'
import { UserTypes } from '@/pages';

export type Friend = {
	name: string;
	message: string;
	img: string;
};

export type FriendsList = Friend[];


const Friends = () => {
	const [user] = useAuthState(auth)
	const [friends, setFriends] = useState<FriendsList>([
		{ name: "Vitor", img: "https://avatars.githubusercontent.com/thiizz", message: "eai cupinxa" },
		{ name: "Nao sei", img: "https://avatars.githubusercontent.com/thiizz", message: "mas bah né guri" }
	]);
	const chatsRef = collection(db, "chats");
	const q = query(chatsRef, where("users", "array-contains", user?.email));

	const [chatSnapshot] = useCollection(q)

	useEffect(() => {
		setFriends(chatSnapshot?.docs as any)
	}, [chatSnapshot])
	return (
		<FriendsContainer>
			<ContainerUl>
				{friends?.map((friend: any, index: number | undefined) => (
					<div key={index}>

						<FriendItem
							friend={friend}
						/>
					</div>
				))}
			</ContainerUl>
		</FriendsContainer>

	)
}

export default Friends