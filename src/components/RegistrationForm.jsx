import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Pressable,
	Keyboard,
} from 'react-native';
import { Button } from './Button';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup
	.object({
		login: yup
			.string()
			.min(3, 'Логін має бути не менше ніж 3 символів')
			.required('Заповніть це поле'),
		email: yup
			.string()
			.email('Eлектронна адреса має бути дійсною')
			.required('Заповніть це поле'),
		password: yup
			.string()
			.min(5, 'Пароль має бути не менше ніж 5 символів')
			.max(10, 'Пароль має бути не більше ніж 10 символів')
			.required('Заповніть це поле'),
	})
	.required();

export const RegistrationForm = ({ navigation }) => {
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [isPasswordFocus, setIsPasswordFocus] = useState(false);
	const [isEmailFocus, setIsEmailFocus] = useState(false);
	const [isLoginFocus, setIsLoginFocus] = useState(false);
	const [isShowKeyboard, setIsShowKeyboard] = useState(false);

	useEffect(() => {
		const addPadding = Keyboard.addListener('keyboardDidShow', () => {
			setIsShowKeyboard(true);
		});
		const removePadding = Keyboard.addListener('keyboardDidHide', () => {
			setIsShowKeyboard(false);
		});
		return () => {
			addPadding.remove();
			removePadding.remove();
		};
	}, []);

	const handleAddImg = () => {
		console.log('add img');
	};

	const onSubmit = values => {
		console.log(values);
		navigation.navigate('Home');
	};

	return (
		<Formik
			initialValues={{ login: '', email: '', password: '' }}
			onSubmit={onSubmit}
			validationSchema={schema}
		>
			{({ handleChange, handleSubmit, values, errors, touched }) => (
				<View style={styles.form}>
					<View style={styles.imgBox}>
						<Pressable onPress={handleAddImg} style={styles.addBtnWrapper}>
							<AntDesign name="plus" size={18} color="#FF6C00" />
						</Pressable>
					</View>
					<Text style={styles.header}>Реєстрація</Text>

					<View style={isShowKeyboard && styles.inputContainer}>
						<View style={styles.inputWrapper}>
							<TextInput
								placeholder="Логін"
								returnKeyType="next"
								onSubmitEditing={() => {
									secondTextInput.focus();
								}}
								blurOnSubmit={false}
								placeholderTextColor="#BDBDBD"
								onFocus={() => setIsLoginFocus(true)}
								onBlur={() => setIsLoginFocus(false)}
								onChangeText={handleChange('login')}
								value={values.login}
								style={[
									styles.input,
									isLoginFocus ? styles.inputFocus : styles.inputBlur,
								]}
							/>
							{errors.login && touched.login && (
								<Text style={styles.errorMessage}>{errors.login}</Text>
							)}
						</View>
						<View style={styles.inputWrapper}>
							<TextInput
								placeholder="Адреса електронної пошти"
								returnKeyType="next"
								ref={input => {
									secondTextInput = input;
								}}
								onSubmitEditing={() => {
									thirdTextInput.focus();
								}}
								blurOnSubmit={false}
								placeholderTextColor="#BDBDBD"
								onFocus={() => setIsEmailFocus(true)}
								onBlur={() => setIsEmailFocus(false)}
								onChangeText={handleChange('email')}
								value={values.email}
								style={[
									styles.input,
									isEmailFocus ? styles.inputFocus : styles.inputBlur,
								]}
							/>
							{errors.email && touched.email && (
								<Text style={styles.errorMessage}>{errors.email}</Text>
							)}
						</View>
						<View style={styles.inputWrapper}>
							<TextInput
								placeholder="Пароль"
								ref={input => {
									thirdTextInput = input;
								}}
								secureTextEntry={secureTextEntry}
								placeholderTextColor="#BDBDBD"
								onFocus={() => setIsPasswordFocus(true)}
								onBlur={() => setIsPasswordFocus(false)}
								onChangeText={handleChange('password')}
								value={values.password}
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
						{errors.password && touched.password && (
							<Text style={styles.errorMessage}>{errors.password}</Text>
						)}
					</View>

					<Button text="Зареєструватися" onPressFunction={handleSubmit} />

					<Text
						style={styles.link}
						onPress={() => navigation.navigate('Login')}
					>
						Вже є акаунт? Увійти
					</Text>
				</View>
			)}
		</Formik>
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
	inputContainer: {
		paddingBottom: 30,
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
	errorMessage: {
		color: 'red',
		paddingHorizontal: 16,
		paddingTop: 4,
	},
});
