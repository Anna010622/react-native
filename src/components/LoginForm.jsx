import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';
import { Button } from './Button';
import { useEffect, useState } from 'react';
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

export const LoginForm = ({ navigation }) => {
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [isPasswordFocus, setIsPasswordFocus] = useState(false);
	const [isEmailFocus, setIsEmailFocus] = useState(false);
	const [isShowKeyboard, setIsShowKeyboard] = useState(false);

	useEffect(() => {
		const removeMargin = Keyboard.addListener('keyboardDidHide', () => {
			setIsShowKeyboard(false);
		});
		return () => {
			removeMargin.remove();
		};
	}, []);

	const onSubmit = values => {
		console.log(values);
	};

	return (
		<Formik
			initialValues={{ login: '', email: '', password: '' }}
			onSubmit={onSubmit}
			validationSchema={schema}
		>
			{({
				handleChange,
				handleSubmit,
				handleBlur,
				values,
				errors,
				touched,
			}) => (
				<View style={styles.form}>
					<Text style={styles.header}>Увійти</Text>

					<View style={{ marginBottom: isShowKeyboard ? 110 : 0 }}>
						<View style={styles.inputWrapper}>
							<TextInput
								placeholder="Адреса електронної пошти"
								placeholderTextColor="#BDBDBD"
								onFocus={() => {
									setIsEmailFocus(true);
									setIsShowKeyboard(true);
								}}
								onBlur={() => {
									setIsEmailFocus(false);
								}}
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
								secureTextEntry={secureTextEntry}
								placeholderTextColor="#BDBDBD"
								onFocus={() => {
									setIsPasswordFocus(true);
									setIsShowKeyboard(true);
								}}
								onBlur={() => {
									setIsPasswordFocus(false);
								}}
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
	errorMessage: {
		color: 'red',
		paddingHorizontal: 16,
		paddingTop: 4,
	},
});
