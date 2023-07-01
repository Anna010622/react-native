import { ContainerBG } from '../components/ContainerBG';
import { RegistrationForm } from '../components/RegistrationForm';

const RegistrationScreen = ({ navigation }) => {
	return (
		<ContainerBG>
			<RegistrationForm navigation={navigation} />
		</ContainerBG>
	);
};

export default RegistrationScreen;
