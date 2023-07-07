import { ContainerBG } from '../components/ContainerBG';
import { RegistrationForm } from '../components/RegistrationForm';

const RegistrationScreen = ({ navigation, route }) => {
	return (
		<ContainerBG>
			<RegistrationForm navigation={navigation} route={route} />
		</ContainerBG>
	);
};

export default RegistrationScreen;
