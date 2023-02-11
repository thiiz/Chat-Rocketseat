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
import { collection, doc, limitToLast, orderBy, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import { getUser } from '@/utils/getUser'

interface FriendItemType {
	friend: UserTypes["userData"];
	user: UserTypes["userData"];
	chatID: any;
}


const FriendItem: React.FC<FriendItemType> = ({ friend, user, chatID }) => {
	const usersRef = collection(db, "users");
	const q = query(usersRef, where("uid", "==", getUser(friend, user)));
	const [getUserItem] = useCollection(q)
	const friendsData = getUserItem?.docs[0]?.data() as UserTypes["userData"]

	const chatsRef = collection(db, "chats");
	const docRef = doc(chatsRef, chatID)
	const messagesRef = collection(docRef, "messages");
	const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"), limitToLast(1))
	const [allMessages] = useCollection(messagesQuery)
	const lastMessage = { user: allMessages?.docs[0]?.data().user, message: allMessages?.docs[0]?.data().message }

	const { push } = useRouter()
	const handleViewProduct = () => {
		push(`/chat/${chatID}`)
	}
	return (
		<>
			{friendsData &&
				<FriendsLi>
					<Container onClick={handleViewProduct}>
						<ImageContainer>
							<Image src={friendsData?.photoURL || ''} alt='' sizes='100%' fill />
						</ImageContainer>
						<NameAndLastMessageContainer>
							<Name>{friendsData?.displayName}</Name>
							{lastMessage.message &&
								<LastMessage>
									{lastMessage.user === friendsData.displayName ? `${friendsData.displayName}: ${lastMessage.message}` : `você: ${lastMessage.message}`}
								</LastMessage>
							}
						</NameAndLastMessageContainer>
					</Container>
				</FriendsLi>}
		</>
	)
}

export default FriendItem