import { ContainerBG } from '../components/ContainerBG';
import { LoginForm } from '../components/LoginForm';

const LoginScreen = ({ route, navigation }) => {
	return (
		<ContainerBG>
			<LoginForm navigation={navigation} route={route} />
		</ContainerBG>
	);
};

export default LoginScreen;
