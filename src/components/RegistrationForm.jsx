import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { Button } from './Button';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

export const RegistrationForm = ({ navigation }) => {
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [isPasswordFocus, setIsPasswordFocus] = useState(false);
	const [isEmailFocus, setIsEmailFocus] = useState(false);
	const [isLoginFocus, setIsLoginFocus] = useState(false);

	const onPressFunction = () => {
		console.log('click');
	};
	const handlePressOnBtnRegistration = () => {
		console.log('Зареєструватися');
	};

	return (
		<View style={styles.form}>
			<View style={styles.imgBox}>
				<Pressable onPress={onPressFunction} style={styles.addBtnWrapper}>
					<AntDesign name="plus" size={18} color="#FF6C00" />
					{/* <AntDesign
						name="plus"
						size={18}
						color="#E8E8E8"
						style={styles.icon}
					/> */}
					{/* <AntDesign name="close" size={18} color="#E8E8E8" /> */}
				</Pressable>
			</View>
			<Text style={styles.header}>Реєстрація</Text>
			<View style={styles.inputWrapper}>
				<TextInput
					placeholder="Логін"
					placeholderTextColor="#BDBDBD"
					onFocus={() => setIsLoginFocus(true)}
					onBlur={() => setIsLoginFocus(false)}
					style={[
						styles.input,
						isLoginFocus ? styles.inputFocus : styles.inputBlur,
					]}
				/>
			</View>

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
				text="Зареєструватися"
				onPressFunction={handlePressOnBtnRegistration}
				marginBottom={50}
			/>

			<Text style={styles.link} onPress={() => navigation.navigate('Login')}>
				Вже є акаунт? Увійти
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	form: {
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16,
		paddingTop: 92,
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,
	},
	imgBox: {
		position: 'absolute',
		top: -60,
		width: 120,
		height: 120,
		borderRadius: 16,
		alignSelf: 'center',
		backgroundColor: '#F6F6F6',
	},
	icon: {
		transform: 'rotate(-45deg)',
	},
	addBtnWrapper: {
		position: 'absolute',
		right: -12,
		top: 84,
		width: 25,
		height: 25,
		borderWidth: 1,
		borderColor: '#FF6C00',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
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

		backgroundColor: '#F6F6F6',
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
});
