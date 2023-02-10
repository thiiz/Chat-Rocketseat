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
import Footer from './Footer'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '@/services/firebase'
import { collection, doc, DocumentData, orderBy, query, QuerySnapshot } from 'firebase/firestore'
import Message from './message'



const Chat: React.FC<{ friend: UserTypes["userData"] | undefined }> = ({ friend }) => {
	const router = useRouter()

	const [messages, setMessages] = useState<QuerySnapshot<DocumentData> | undefined>();
	const messagesEndRef = useRef<HTMLHeadingElement>(null)

	const usersRef = collection(db, "chats");
	const docRef = doc(usersRef, `${router.query.id}`)
	const messagesRef = collection(docRef, "messages");
	const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"))
	const [allMessages] = useCollection(messagesQuery)

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
							<UserName>{friend?.displayName}</UserName>
							<UserStatus>Online</UserStatus>
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
				<Footer />
			</Container>
			<div id="chatEnd" ref={messagesEndRef} />
		</>
	)
}

export default Chat