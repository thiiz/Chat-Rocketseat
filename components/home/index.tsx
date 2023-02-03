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
	FriendsContainer,
	ContainerUl,
	SearchContainer,
	SearchForm,
	SearchInput,
	SubmitButton,
	FriendsLi
} from './styleIndex'
import Image from "next/image";
import { useEffect, useState } from 'react';
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { auth, db } from "@/services/firebase";
import { useCollection } from 'react-firebase-hooks/firestore'



type Friend = {
	name: string;
	message: string;
	img: string;
};

export type FriendsList = Friend[];


const Home: React.FC<UserTypes> = ({ userData, setUserData }) => {
	const [search, setSearch] = useState('');
	const [friends, setFriends] = useState<FriendsList>([
		{ name: "Vitor", img: "https://avatars.githubusercontent.com/thiizz", message: "eai cupinxa" },
		{ name: "Nao sei", img: "https://avatars.githubusercontent.com/thiizz", message: "mas bah né guri" }
	]);


	const userChats = db.collection("chats").where("users", "array-contains", userData.email)

	const [chatsSnapshot, setChatsSnapshot] = useState<any>(null)
	console.log(chatsSnapshot)
	useEffect(() => {
		return userChats.onSnapshot(snapshot => {
			setChatsSnapshot(snapshot)
		})
	}, [userData.email])

	const handleCreateChat = () => {

	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	}

	const handleLogout = () => {
		auth.signOut()
		setUserData({
			name: null,
			email: null,
			img: null,
			isOnline: false,
		})

	}
	return (
		<>
			<Container>
				<Header>
					<UserInfoContainer>
						<MyProfileContainer>
							<ContainerImage>
								{userData?.img && <Image src={userData?.img} fill sizes='100%' alt='' />}
							</ContainerImage>
							<UserName>{userData?.name}</UserName>
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
				<FriendsContainer>
					<ContainerUl>
						{friends?.map((friend, index) => (
							<FriendsLi>
								<Friends friend={friend} />
							</FriendsLi>
						))}
					</ContainerUl>
				</FriendsContainer>
			</Container>
		</>
	)
}

export default Home