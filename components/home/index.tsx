import { UserTypes } from "@/pages";
import Friends from "./Friends";
import {
	Container,
	ContainerImage,
	Header,
	MyProfileContainer,
	UserInfoContainer,
	UserName,
	LogoutButton,
	LogoutSpan,
	SearchContainer,
	SearchForm,
	SearchInput,
	SubmitButton,
	ContainerUserNameAndUserID,
	UserID
} from './styleIndex'
import Image from "next/image";
import { useEffect, useState } from 'react';
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { auth, db } from "@/services/firebase";
import { collection, addDoc, setDoc, doc, where, query, getDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

function isValidUid(uid: string) {
	console.log(uid.length)
	if (uid.length !== 28)
		return false
	return true
}

const Home: React.FC<UserTypes> = ({ userData, setUserData }) => {
	const [search, setSearch] = useState<string>('');

	const chatsRef = collection(db, "chats");
	const q = query(chatsRef, where("users", "array-contains", userData?.uid));
	const [chatsSnapshot] = useCollection(q)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!search) return

		const isUid = isValidUid(search)
		if (!isUid) return alert("ID DE USUÁRIO INVÁLIDO")

		if (chatExists(search)) return alert("O CHAT JÁ EXISTE")

		if (userData.uid === search) {
			alert("TENTE UTILIZAR OUTRO ID")
		}

		await addDoc(collection(db, "chats"), {
			users: [userData.uid, search]
		});

		alert("CHAT CRIADO COM SUCESSO")
	}

	const handleLogout = () => {
		auth.signOut()
		setUserData({
			uid: null,
			displayName: null,
			email: null,
			photoURL: null,
		})
	}

	const chatExists = (newUidChat: string) => {
		return !!chatsSnapshot?.docs.find(
			(chat: any) => chat.data().users.find((user: string) => user === newUidChat)?.length > 0)
	}

	return (
		<>
			<Container>
				<Header>
					<UserInfoContainer>
						<MyProfileContainer>
							<ContainerImage>
								{userData?.photoURL && <Image src={userData?.photoURL} fill sizes='100%' alt='' />}
							</ContainerImage>
							<ContainerUserNameAndUserID>
								<UserName>{userData?.displayName}</UserName>
								<UserID>{userData?.uid}</UserID>
							</ContainerUserNameAndUserID>
						</MyProfileContainer>
						<LogoutButton onClick={handleLogout}>
							<FaSignOutAlt />
							<LogoutSpan>Sair</LogoutSpan>
						</LogoutButton>
					</UserInfoContainer>
					<SearchContainer>
						<SearchForm onSubmit={handleSubmit}>
							<SearchInput
								autoFocus
								type="text"
								placeholder='Procurar'
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
							<SubmitButton type="submit"><FaSearch /></SubmitButton>
						</SearchForm>
					</SearchContainer>
				</Header>
				<Friends userData={userData} />
			</Container>
		</>
	)
}

export default Home