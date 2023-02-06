import {
	FriendsLi,
	Container,
	ImageContainer,
	NameAndLastMessageContainer,
	LastMessage,
	Name,
} from './styleFriendItem'
import Image from 'next/image'
import { UserTypes } from '@/pages'
import { Friend } from './Friends'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/services/firebase'
import { collection, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

interface FriendItemType {
	friendID: string;
	friend: any;
	user: UserTypes["userData"];
}

const getUser = (friend: FriendItemType["friend"], userLogged: FriendItemType["user"]) => {
	return friend.filter((user: any) => user !== userLogged.email)[0]
}



const FriendItem: React.FC<FriendItemType> = ({ friend, friendID, user }) => {
	const chatsRef = collection(db, "users");
	const q = query(chatsRef, where("email", "==", getUser(friend, user)));
	const [getUserItem] = useCollection(q)
	const friendsData = getUserItem?.docs[0].data() as UserTypes["userData"]
	return (
		<FriendsLi>
			<Container onClick={() => console.log("click")}>
				<ImageContainer>
					<Image src={friendsData?.photoURL || ''} alt='' sizes='100%' fill />
				</ImageContainer>
				<NameAndLastMessageContainer>
					<Name>{friendsData?.displayName}</Name>
					<LastMessage>eai</LastMessage>
				</NameAndLastMessageContainer>
			</Container>
		</FriendsLi>
	)
}

export default FriendItem