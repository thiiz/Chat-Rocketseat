import { User } from "@/pages";
import Image from "next/image";
import Chat from "../chat";
import Header from './Header'
import {
	Container,
} from "./styleIndex";

interface HomeProps {
	user: User | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
	return (
		<Container>
			<Header user={user} />
		</Container>
	)
}

export default Home