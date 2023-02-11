import { auth, db } from "@/services/firebase";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdSend } from "react-icons/md";
import {
	FormContainer,
	ChatForm,
	ChatInput,
	SubmitButton
} from './styleFooter'
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";

const Footer = () => {
	const { query } = useRouter()
	const [newMessage, setNewMessage] = useState('');
	const [user] = useAuthState(auth)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(query)
		if (!newMessage) return
		const chatsRef = collection(db, "chats");
		const docIdRef = doc(chatsRef, `${query?.id}`)

		const messageRef = collection(docIdRef, "messages")
		const timestamp: any = serverTimestamp();
		console.log(timestamp)
		await addDoc(messageRef, {
			message: newMessage,
			user: user?.displayName,
			photoURL: user?.photoURL,
			timestamp: timestamp
		});

		setNewMessage('');

	};
	return (
		<FormContainer>
			<ChatForm onSubmit={handleSubmit}>
				<ChatInput
					autoFocus={false}
					type="text"
					placeholder='Digite sua mensagem'
					value={newMessage}
					onChange={event => setNewMessage(event.target.value)}
				/>
				<SubmitButton type="submit"><MdSend /></SubmitButton>
			</ChatForm>
		</FormContainer>
	)

}

export default Footer