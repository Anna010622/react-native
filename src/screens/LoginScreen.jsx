import { ContainerBG } from '../components/ContainerBG';
import { LoginForm } from '../components/LoginForm';

const LoginScreen = ({ navigation }) => {
	return (
		<ContainerBG>
			<LoginForm navigation={navigation} />
		</ContainerBG>
	);
};

export default LoginScreen;
