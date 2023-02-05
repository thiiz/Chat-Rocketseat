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
import { auth } from '@/services/firebase'

const getUser = (users: Array<string>, userLogged: UserTypes["userData"]) => {
	users.filter((user) => user !== userLogged.email)
}

interface FriendItemType {
	friend: Friend;
}

const FriendItem: React.FC<FriendItemType> = ({ friend }) => {
	const [user] = useAuthState(auth)
	console.log(friend)
	console.log(user?.email)
	return (
		<FriendsLi>
			<Container>
				<ImageContainer>
					<Image src={friend?.img || ''} alt='' sizes='100%' fill />
				</ImageContainer>
				<NameAndLastMessageContainer>
					<Name>{friend?.name}</Name>
					<LastMessage>{friend?.message}</LastMessage>
				</NameAndLastMessageContainer>
			</Container>
		</FriendsLi>
	)
}

export default FriendItem