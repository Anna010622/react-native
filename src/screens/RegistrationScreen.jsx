import { useSelector } from 'react-redux';
import { ContainerBG } from '../components/ContainerBG';
import { RegistrationForm } from '../components/RegistrationForm';
import {
	Keyboard,
	TouchableWithoutFeedback,
	View,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import { selectLoading } from '../redux/selectors';

const RegistrationScreen = ({ navigation }) => {
	const loading = useSelector(selectLoading);
	return (
		<ContainerBG>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={styles.container}>
					{loading && (
						<View style={styles.loaderContainer}>
							<ActivityIndicator color="#FF6C00" size="large" />
						</View>
					)}
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
	loaderContainer: {
		position: 'absolute',
		zIndex: 2,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default RegistrationScreen;
