import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';
import { Button } from './Button';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup
	.object({
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

export const LoginForm = ({ route, navigation }) => {
	const { setIsLoggedIn } = route.params;
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [isPasswordFocus, setIsPasswordFocus] = useState(false);
	const [isEmailFocus, setIsEmailFocus] = useState(false);
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

	const initialValues = { email: '', password: '' };
	const onSubmit = (values, { resetForm }) => {
		console.log(values);
		setIsLoggedIn(true);
		resetForm({ values: initialValues });
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={schema}
		>
			{({ handleChange, handleSubmit, values, errors, touched }) => (
				<View style={styles.form}>
					<Text style={styles.header}>Увійти</Text>

					<View style={isShowKeyboard && styles.inputContainer}>
						<View style={styles.inputWrapper}>
							<TextInput
								placeholder="Адреса електронної пошти"
								returnKeyType="next"
								onSubmitEditing={() => {
									secondTextInput.focus();
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
									secondTextInput = input;
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
							{errors.password && touched.password && (
								<Text style={styles.errorMessage}>{errors.password}</Text>
							)}
						</View>
					</View>

					<Button text="Увійти" onPressFunction={handleSubmit} />

					<Text
						style={styles.link}
						onPress={() => navigation.navigate('Registration')}
					>
						<Text>Немає акаунту? </Text>
						<Text style={styles.underline}>Зареєструватися</Text>
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
	inputContainer: {
		paddingBottom: 30,
	},
	inputWrapper: {
		marginBottom: 16,
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
		top: 16,
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
	errorMessage: {
		color: 'red',
		paddingHorizontal: 16,
		paddingTop: 4,
	},
});
