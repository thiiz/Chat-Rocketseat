import { User } from '@/pages';
import Image from 'next/image';
import { HeaderContainer, SearchForm, SearchInput, SubmitButton, ImageContainer } from './styleHeader'

interface HeaderProps {
	user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
	return (
		<HeaderContainer>
			<SearchForm>
				<SearchInput placeholder="Procurar" />
			</SearchForm>
			<ImageContainer>
				{user?.img && <Image src={user?.img} fill sizes='100%' alt='' />}
			</ImageContainer>
		</HeaderContainer >
	)
}

export default Header;