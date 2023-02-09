import { AuthorMessage, ContainerMessageLi, TextMessage } from "./style"

const Message: React.FC<{ message: any, friendName: string | null | undefined }> = ({ message, friendName }) => {
	console.log(message)
	const isFriend = friendName === message?.data()?.user
	return (
		<ContainerMessageLi user={isFriend}>
			<AuthorMessage>{isFriend ? message?.data()?.user : "Você"} - {`${message?.data()?.timestamp.toDate().getHours()}:${message?.data()?.timestamp.toDate().getMinutes()}`
			}
			</AuthorMessage>
			<TextMessage user={isFriend}>{message?.data()?.message}</TextMessage>
		</ContainerMessageLi>

	)
}

export default Message