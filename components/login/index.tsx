import { auth, provider } from '@/services/firebase'
import { Container, SignInButton } from '../styleIndex'

const Login: React.FC = () => {
	const handleSignIn = () => {
		auth.signInWithPopup(provider).catch(alert)
	}
	return (
		<Container>
			<SignInButton onClick={handleSignIn}>LOGIN</SignInButton>
		</Container>
	)
}

export default Login