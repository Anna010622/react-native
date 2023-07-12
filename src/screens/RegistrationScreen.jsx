import { ContainerBG } from '../components/ContainerBG';
import { RegistrationForm } from '../components/RegistrationForm';
import {
	Keyboard,
	TouchableWithoutFeedback,
	View,
	StyleSheet,
} from 'react-native';

const RegistrationScreen = ({ navigation }) => {
	return (
		<ContainerBG>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={styles.container}>
					<RegistrationForm navigation={navigation} />
				</View>
			</TouchableWithoutFeedback>
		</ContainerBG>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
	},
});

export default RegistrationScreen;
