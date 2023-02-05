import Head from 'next/head'
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
	AuthorMessage,
	MessageDate,
	ContainerUl,
	ContainerMessageLi,
	TextMessage,
	FormContainer,
	ChatForm,
	ChatInput,
	SubmitButton
} from '@/styles/styleIndex'

import Image from 'next/image'
import { MdClose, MdSend } from 'react-icons/md'
import { useRef, useState, useEffect } from 'react'
import { getHourAndMinuts } from '@/utils/getHourAndMinutes'

interface TypeMessage {
	author: 'Você' | 'user2',
	text: string,
	time: string,
}


const Chat: React.FC = () => {
	const [messages, setMessages] = useState<TypeMessage[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const messagesEndRef = useRef<HTMLHeadingElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setMessages([...messages, { author: 'Você', text: newMessage, time: getHourAndMinuts() }]);
		setNewMessage('');

	};

	return (
		<>
			<Container>
				<Header>
					<UserInfoContainer>
						<ContainerImage>
							<Image src="https://randomuser.me/api/portraits/women/8.jpg" fill sizes='100%' alt='' />
						</ContainerImage>
						<NameAndStatusContainer>
							<UserName>Cecilia Sassaki</UserName>
							<UserStatus>Online</UserStatus>
						</NameAndStatusContainer>
					</UserInfoContainer>
					<CloseButton>
						<MdClose />
					</CloseButton>
				</Header>
				<ChatContainer>
					<ContainerUl>
						{messages.map((message, index) => (
							<div key={index}>
								{
									messages[index - 1] &&
										new Date(messages[index].time).getTime() - new Date(messages[index - 1].time).getTime() > 60 * 60 * 1000 ||
										index === 0
										? (
											<MessageDate>Hoje {getHourAndMinuts()}</MessageDate>
										)
										: null
								}
								<ContainerMessageLi>
									<AuthorMessage>{message.author} - {message.time}</AuthorMessage>
									<TextMessage>{message.text}</TextMessage>
								</ContainerMessageLi>
							</div>
						))}
					</ContainerUl>
				</ChatContainer>
				<FormContainer>
					<ChatForm onSubmit={handleSubmit}>
						<ChatInput
							autoFocus
							type="text"
							placeholder='Digite sua mensagem'
							value={newMessage}
							onChange={event => setNewMessage(event.target.value)}
						/>
						<SubmitButton type="submit"><MdSend /></SubmitButton>
					</ChatForm>
				</FormContainer>
			</Container>
			<div id="chatEnd" ref={messagesEndRef} />
		</>
	)
}

export default Chat