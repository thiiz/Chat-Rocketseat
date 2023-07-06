import {
	Container,
	ContainerImage,
	Header,
	UserInfoContainer,
	NameAndStatusContainer,
	UserName,
	UserStatus,
	CloseButton,
	ChatContainer,
	ContainerUl,
} from '@/styles/styleIndex'

import Image from 'next/image'
import { MdClose } from 'react-icons/md'
import { useRef, useState, useEffect } from 'react'
import { UserTypes } from '@/pages'
import { useRouter } from 'next/router'
import InputMessage from './InputMessage'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '@/services/firebase'
import { collection, doc, DocumentData, orderBy, query, QuerySnapshot, where } from 'firebase/firestore'
import Message from './message'
import AcceptChat from './acceptChat'
import FriendNotAccept from './friend-not-accept'



const Chat: React.FC<{
	friend: UserTypes["userData"];
	user: UserTypes["userData"]
}> = ({ friend, user }) => {
	const router = useRouter()
	const [messages, setMessages] = useState<QuerySnapshot<DocumentData> | undefined>();
	const messagesEndRef = useRef<HTMLHeadingElement>(null)

	const chatsRef = collection(db, "chats");

	const docRef = doc(chatsRef, `${router.query.id}`)
	const messagesRef = collection(docRef, "messages");
	const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"))
	const [allMessages] = useCollection(messagesQuery)

	const uid = `${user.displayName}#${user.uid?.slice(-4)}`
	const usersQuery = query(chatsRef, where("users", "array-contains", uid));
	const [usersChatSnapshot] = useCollection(usersQuery)

	const usersAcceptedChat = usersChatSnapshot?.docs[0].data().accepted;

	const isUserAccept = usersAcceptedChat?.includes(uid)
	const isFriendAccept = usersAcceptedChat?.includes(friend?.uid)

	useEffect(() => {
		setMessages(allMessages)
	}, [allMessages])

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages]);

	return (
		<>
			<Container>
				<Header>
					<UserInfoContainer>
						<ContainerImage>
							{friend?.photoURL ?
								<Image src={friend?.photoURL || ''} fill sizes='100%' alt='' />
								:
								''
							}
						</ContainerImage>
						<NameAndStatusContainer>
							<UserName>{friend?.uid}</UserName>
							{isFriendAccept ? <UserStatus>Online</UserStatus> : ''}
						</NameAndStatusContainer>
					</UserInfoContainer>
					<CloseButton onClick={() => router.push('/')}>
						<MdClose />
					</CloseButton>
				</Header>
				<ChatContainer>
					<ContainerUl>
						{messages?.docs?.map((message) => (
							<Message friendName={friend?.displayName} message={message} key={message?.id} />
						))}
					</ContainerUl>
				</ChatContainer>
				{isUserAccept && isFriendAccept && <InputMessage />}
				{!isFriendAccept && isUserAccept && <FriendNotAccept />}
				{!isUserAccept && isFriendAccept &&
					<AcceptChat user={user} chatID={`${router.query.id}`} />
				}
			</Container>
			<div id="chatEnd" ref={messagesEndRef} />
		</>
	)
}

export default Chat