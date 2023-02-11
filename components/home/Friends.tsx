import {
	FriendsContainer,
	ContainerUl,
} from './styleFriends'
import { useState } from 'react'
import { db } from '@/services/firebase';
import { useEffect } from 'react'
import { collection, DocumentData, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import FriendItem from './FriendItem';
import { useCollection } from 'react-firebase-hooks/firestore'
import { UserTypes } from '@/pages';

export type Friend = {
	id: string
};

export type FriendsList = Friend[];

const Friends: React.FC<{ userData: UserTypes["userData"] }> = ({ userData }) => {

	const chatsRef = collection(db, "chats");
	const usersQuery = query(chatsRef, where("users", "array-contains", userData.uid));
	const [usersChatSnapshot] = useCollection(usersQuery)
	return (
		<FriendsContainer>
			<ContainerUl>
				{usersChatSnapshot?.docs?.map((friend: any, index: number | undefined) => (
					<FriendItem
						key={index}
						chatID={friend.id}
						friend={friend.data().users}
						user={userData}
					/>
				))}
			</ContainerUl>
		</FriendsContainer>

	)
}

export default Friends