import {
	FriendsContainer,
	ContainerUl,
} from './styleFriends'
import { useState } from 'react'
import { db } from '@/services/firebase';
import { useEffect } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import FriendItem from './FriendItem';
import { useCollection } from 'react-firebase-hooks/firestore'
import { UserTypes } from '@/pages';

export type Friend = {
	id: string
};

export type FriendsList = Friend[];


const Friends: React.FC<{ userData: UserTypes["userData"] }> = ({ userData }) => {
	const [friendsID, setFriendsID] = useState<FriendsList>([]);
	const chatsRef = collection(db, "chats");
	const q = query(chatsRef, where("users", "array-contains", userData?.email));

	const [chatSnapshot] = useCollection(q)

	useEffect(() => {
		setFriendsID(chatSnapshot?.docs as any)
	}, [chatSnapshot])
	return (
		<FriendsContainer>
			<ContainerUl>
				{friendsID?.map((friend: any, index: number | undefined) => (
					<FriendItem
						key={index}
						friendID={friend.id}
						friend={friend.data().users}
						user={userData}
					/>
				))}
			</ContainerUl>
		</FriendsContainer>

	)
}

export default Friends