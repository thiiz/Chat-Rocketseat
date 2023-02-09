import { UserTypes } from "@/pages";
import { getHourAndMinuts } from "@/utils/getHourAndMinutes";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import {
	FormContainer,
	ChatForm,
	ChatInput,
	SubmitButton
} from './styleFooter'

const Footer: React.FC<{ setMessages: React.Dispatch<React.SetStateAction<any>>; messages: any; }> = ({ messages, setMessages }) => {
	const [newMessage, setNewMessage] = useState('');
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setMessages([...messages, { author: 'Você', text: newMessage, time: getHourAndMinuts() }]);
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