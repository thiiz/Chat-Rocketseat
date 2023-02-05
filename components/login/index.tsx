import { auth, GoogleProvider } from '@/services/firebase'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { Container, SignInButton } from '../styleIndex'

const Login: React.FC = () => {
	const [signInWithGoogle] = useSignInWithGoogle(auth as any)

	return (
		<Container>
			<SignInButton onClick={() => signInWithGoogle()}>LOGIN</SignInButton>
		</Container>
	)
}

export default Login