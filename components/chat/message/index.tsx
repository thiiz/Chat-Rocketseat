import { AuthorMessage, ContainerMessageLi, TextMessage } from "./style"

const Message: React.FC<{ message: any, friendName: string | null | undefined }> = ({ message, friendName }) => {
	console.log(message)
	const isFriend = friendName === message?.data()?.user
	const time = message?.data()?.timestamp
	const fireBaseTime = new Date(
		time?.seconds * 1000 + time?.nanoseconds / 1000000,
	);

	const hour = fireBaseTime.getHours()
	const minutes = fireBaseTime.getMinutes();
	return (
		<ContainerMessageLi user={isFriend}>
			<AuthorMessage>
				{isFriend ? message?.data()?.user : "Você"} - {hour < 9 ? `0${hour}` : hour}:{minutes}
			</AuthorMessage>
			<TextMessage user={isFriend}>{message?.data()?.message}</TextMessage>
		</ContainerMessageLi>

	)
}

export default Message