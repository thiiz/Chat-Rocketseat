import { UserTypes } from "@/pages"
import { db } from "@/services/firebase";
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc, where } from "firebase/firestore";

const AcceptChat: React.FC<{ user: UserTypes["userData"] | undefined; chatID: string }> = ({ user, chatID }) => {

	const handleAccept = () => {
		const chatsDoc = doc(db, "chats", chatID)
		updateDoc(chatsDoc, { accepted: arrayUnion(`${user?.displayName}#${user?.uid?.slice(-4)}`) })
	}

	return (
		<div>
			<div style={{ color: "white" }}>{user?.displayName} quer enviar mensagem para você.</div>
			<div>
				<button>Recusar</button>
				<button onClick={handleAccept}>Aceitar</button>
			</div>
		</div>
	)
}

export default AcceptChat