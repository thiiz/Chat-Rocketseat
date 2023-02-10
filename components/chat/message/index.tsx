import { AuthorMessage, ContainerMessageLi, TextMessage } from "./style"
import { getHourAndMinuts } from "@/utils/getHourAndMinutes"

const Message: React.FC<{ message: any, friendName: string | null | undefined }> = ({ message, friendName }) => {
	console.log(message)
	const isFriend = friendName === message?.data()?.user

	return (
		<ContainerMessageLi user={isFriend}>
			<AuthorMessage>
				{isFriend ? message?.data()?.user : "Você"} - {getHourAndMinuts()}
			</AuthorMessage>
			<TextMessage user={isFriend}>{message?.data()?.message}</TextMessage>
		</ContainerMessageLi>

	)
}

export default Message