import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from './Button';
import { useState } from 'react';

export const LoginForm = ({ navigation }) => {
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [isPasswordFocus, setIsPasswordFocus] = useState(false);
	const [isEmailFocus, setIsEmailFocus] = useState(false);

	const onPressFunction = () => {
		console.log('click');
	};
	const handlePressOnBtnRegistration = () => {
		console.log('Увійти');
	};

	return (
		<View style={styles.form}>
			<Text style={styles.header}>Увійти</Text>

			<View style={styles.inputWrapper}>
				<TextInput
					placeholder="Адреса електронної пошти"
					placeholderTextColor="#BDBDBD"
					onFocus={() => setIsEmailFocus(true)}
					onBlur={() => setIsEmailFocus(false)}
					style={[
						styles.input,
						isEmailFocus ? styles.inputFocus : styles.inputBlur,
					]}
				/>
			</View>
			<View style={styles.inputWrapper}>
				<TextInput
					placeholder="Пароль"
					secureTextEntry={secureTextEntry}
					placeholderTextColor="#BDBDBD"
					onFocus={() => setIsPasswordFocus(true)}
					onBlur={() => setIsPasswordFocus(false)}
					style={[
						styles.input,
						isPasswordFocus ? styles.inputFocus : styles.inputBlur,
					]}
				/>
				<Text
					style={styles.inputButton}
					onPress={() => setSecureTextEntry(!secureTextEntry)}
				>
					{secureTextEntry ? 'Показати' : 'Cховати'}
				</Text>
			</View>

			<Button
				text="Увійти"
				onPressFunction={handlePressOnBtnRegistration}
				marginBottom={50}
			/>

			<Text
				style={styles.link}
				onPress={() => navigation.navigate('Registration')}
			>
				<Text>Немає акаунту? </Text>
				<Text style={styles.underline}>Зареєструватися</Text>
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	form: {
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16,
		paddingTop: 32,
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,
	},
	header: {
		marginBottom: 33,

		textAlign: 'center',
		fontFamily: 'Roboto-Bold',
		color: '#212121',
		fontSize: 30,
		letterSpacing: 0.3,
	},
	inputWrapper: {
		marginBottom: 16,
		justifyContent: 'center',
	},
	input: {
		padding: 16,
		borderWidth: 1,
		borderColor: '#E8E8E8',
		borderRadius: 5,
		color: '#212121',
		fontFamily: 'Roboto-Regular',
	},
	inputFocus: {
		backgroundColor: '#FFFFFF',
		borderColor: '#FF6C00',
	},
	inputBlur: {
		backgroundColor: '#F6F6F6',
	},
	inputButton: {
		textAlign: 'center',
		fontFamily: 'Roboto-Regular',
		color: '#1B4371',
		position: 'absolute',
		right: 16,
	},
	link: {
		textAlign: 'center',
		fontFamily: 'Roboto-Regular',
		color: '#1B4371',
		marginBottom: 66,
		marginTop: 16,
	},
	underline: {
		textDecorationLine: 'underline',
	},
});
