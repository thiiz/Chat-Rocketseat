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
import { db } from '@/services/firebase'
import { collection, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import { getUser } from '@/utils/getUser'

interface FriendItemType {
	friend: any;
	user: UserTypes["userData"];
	chatID: any;
}


const FriendItem: React.FC<FriendItemType> = ({ friend, user, chatID }) => {
	const chatsRef = collection(db, "users");
	const q = query(chatsRef, where("uid", "==", getUser(friend, user)));
	const [getUserItem] = useCollection(q)
	const friendsData = getUserItem?.docs[0]?.data() as UserTypes["userData"]
	const { push } = useRouter()
	const handleViewProduct = () => {
		push(`/chat/${chatID}`)
	}
	return (
		<FriendsLi>
			<Container onClick={handleViewProduct}>
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