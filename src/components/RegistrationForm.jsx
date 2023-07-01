import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { Button } from './Button';
import { useState } from 'react';

export const RegistrationForm = ({ navigation }) => {
	const [secureTextEntry, setSecureTextEntry] = useState(true);
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
					<Text style={styles.addBtn}>+</Text>
				</Pressable>
			</View>
			<Text style={styles.header}>Реєстрація</Text>
			<View style={{ marginBottom: 16 }}>
				<TextInput
					style={styles.input}
					placeholder="Логін"
					placeholderTextColor="#BDBDBD"
				/>
			</View>

			<View style={{ marginBottom: 16 }}>
				<TextInput
					style={styles.input}
					placeholder="Адреса електронної пошти"
					placeholderTextColor="#BDBDBD"
				/>
			</View>
			<View style={{ justifyContent: 'center', marginBottom: 16 }}>
				<TextInput
					style={styles.input}
					placeholder="Пароль"
					secureTextEntry={secureTextEntry}
					placeholderTextColor="#BDBDBD"
				/>
				<Text
					style={{
						...styles.link,
						position: 'absolute',
						right: 16,
					}}
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

			<Text
				style={{
					...styles.link,
					marginBottom: 66,
					marginTop: 16,
				}}
				onPress={() => navigation.navigate('Login')}
			>
				Вже є акаунт? Увійти
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	form: {
		backgroundColor: '#FFFFFF',
		paddingLeft: 16,
		paddingRight: 16,
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
		width: 24,
		height: 24,
		borderWidth: 1,
		borderColor: '#FF6C00',
		borderRadius: 50,
		backgroundColor: 'transparent',
	},
	addBtn: {
		color: '#FF6C00',
		textAlign: 'center',
	},
	header: {
		marginBottom: 33,

		textAlign: 'center',
		fontFamily: 'Roboto-Bold',
		color: '#212121',
		fontSize: 30,
		letterSpacing: 0.3,
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
	link: {
		textAlign: 'center',
		fontFamily: 'Roboto-Regular',
		color: '#1B4371',
	},
});
