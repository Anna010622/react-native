import { ContainerBG } from '../components/ContainerBG';
import { LoginForm } from '../components/LoginForm';
import {
	Keyboard,
	TouchableWithoutFeedback,
	View,
	StyleSheet,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
	return (
		<ContainerBG>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={styles.container}>
					<LoginForm navigation={navigation} />
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

export default LoginScreen;
