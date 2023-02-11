import { AuthorMessage, ContainerMessageLi, TextMessage } from "./style"

const Message: React.FC<{ message: any, friendName: string | null | undefined }> = ({ message, friendName }) => {
	console.log(message)
	const isFriend = friendName === message?.data()?.user
	const time = message?.data()?.timestamp

	const convertTimestamp = (time: any) => {
		const timestampDate = time?.toDate();
		const hh = timestampDate?.getHours();
		const mm = timestampDate?.getMinutes();

		const hour = `${hh < 10 ? `0${hh}` : `${hh}`}`
		const minutes = `${mm < 10 ? `0${mm}` : `${mm}`}`
		const date = `${hour}:${minutes}`
		return date;
	}
	const date = convertTimestamp(time)
	return (
		<ContainerMessageLi user={isFriend}>
			<AuthorMessage>
				{isFriend ? message?.data()?.user : "Você"} - {date}
			</AuthorMessage>
			<TextMessage user={isFriend}>{message?.data()?.message}</TextMessage>
		</ContainerMessageLi>

	)
}

export default Message