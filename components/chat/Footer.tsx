import { UserTypes } from "@/pages";
import { auth, db } from "@/services/firebase";
import { getHourAndMinuts } from "@/utils/getHourAndMinutes";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdSend } from "react-icons/md";
import firebase from "firebase/compat/app"
import {
	FormContainer,
	ChatForm,
	ChatInput,
	SubmitButton
} from './styleFooter'
import { collection, doc, addDoc, Timestamp } from "firebase/firestore";
import { formatWithOptions } from "util";

const Footer = () => {
	const { query } = useRouter()
	const [newMessage, setNewMessage] = useState('');
	const [user] = useAuthState(auth)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const date: Date = new Date
		console.log(query)
		const chatsRef = collection(db, "chats");
		const docIdRef = doc(chatsRef, `${query?.id}`)

		const messageRef = collection(docIdRef, "messages")

		await addDoc(messageRef, {
			message: newMessage,
			user: user?.displayName,
			photoURL: user?.photoURL,
			timestamp: Timestamp.fromDate(date)
		});

		setNewMessage('');

	};
	return (
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
	)

}

export default Footer