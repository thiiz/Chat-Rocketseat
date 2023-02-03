import Image from 'next/image'
import {
	Container,
	ImageContainer,
	NameAndLastMessageContainer,
	LastMessage, Name,
} from './styleFriends'
import { FriendsList } from './'


interface FriendsProps {
	friend: {
		name: string | null;
		message: string | null;
		img: string | null;

	}
}

const Friends: React.FC<FriendsProps> = ({ friend }) => {
	return (
		<Container>
			<ImageContainer>
				<Image src={friend?.img || ''} alt='' sizes='100%' fill />
			</ImageContainer>
			<NameAndLastMessageContainer>
				<Name>{friend?.name}</Name>
				<LastMessage>{friend?.message}</LastMessage>
			</NameAndLastMessageContainer>
		</Container>
	)
}

export default Friends