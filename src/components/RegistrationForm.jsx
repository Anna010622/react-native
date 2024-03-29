import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Pressable,
	Keyboard,
	Image,
	ActivityIndicator,
	Alert,
} from 'react-native';
import { Button } from './Button';
import { useEffect, useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Camera } from 'expo-camera';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../../config';
import { setDoc, doc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { logIn, setLoading } from '../redux/userSlice';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

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
			.min(6, 'Пароль має бути не менше ніж 6 символів')
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
	const [hasPermission, setHasPermission] = useState(null);
	const cameraRef = useRef(null);
	const [cameraOn, setCameraOn] = useState(false);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const registerDB = async ({ email, password, login }) => {
		dispatch(setLoading(true));
		try {
			await createUserWithEmailAndPassword(auth, email, password);

			if (auth.currentUser.uid && image) {
				await uploadImage(image, login);
			} else if (auth.currentUser.uid) {
				await setDoc(doc(db, 'users', auth.currentUser.uid), {
					login,
					email,
				});
				await updateProfile(auth.currentUser, {
					displayName: login,
				});
				dispatch(
					logIn({
						name: auth.currentUser.displayName,
						email: auth.currentUser.email,
					})
				);
			}
			dispatch(setLoading(false));
		} catch (error) {
			dispatch(setLoading(false));
			if (error.code === 'auth/email-already-in-use') {
				return Alert.alert('Такий користувач вже зареєстрований');
			} else console.log('error:', error);
			throw error;
		}
	};

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

	const takePicture = async () => {
		setIsLoading(true);
		if (cameraRef) {
			try {
				const data = await cameraRef.current.takePictureAsync();
				setImage(data.uri);
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		}
	};

	const uploadImage = async (uri, login) => {
		const response = await fetch(uri);
		const blob = await response.blob();
		const id = blob._data.name;
		const storageRef = ref(storage, `images/${auth.currentUser.uid}/avatar`);
		const uploadTask = uploadBytesResumable(storageRef, blob);

		uploadTask.on(
			'state_changed',
			snapshot => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			error => {
				switch (error.code) {
					case 'storage/unauthorized':
						console.log("User doesn't have permission to access the object");
						break;
					case 'storage/canceled':
						console.log('User canceled the upload');
						break;
					case 'storage/unknown':
						console.log('Unknown error occurred, inspect error.serverResponse');
						break;
				}
			},
			async () => {
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
				updateUserProfile(downloadURL, login);
			}
		);
	};

	const updateUserProfile = async (downloadURL, login) => {
		await updateProfile(auth.currentUser, {
			photoURL: downloadURL,
			displayName: login,
		});
		if (auth.currentUser.photoURL) {
			dispatch(
				logIn({
					name: auth.currentUser.displayName,
					email: auth.currentUser.email,
					userAvatar: auth.currentUser.photoURL,
				})
			);

			await setDoc(doc(db, 'users', auth.currentUser.uid), {
				login,
				email: auth.currentUser.email,
				userAvatar: auth.currentUser.photoURL,
			});
		}
	};
	const cameraTurnOn = async () => {
		if (!hasPermission) {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasPermission(cameraStatus.status === 'granted');
		}
		setCameraOn(true);
	};

	handleDeleteImg = () => {
		setImage(null);
		setCameraOn(false);
	};

	const initialValues = { login: '', email: '', password: '' };

	const onSubmit = (values, { resetForm }) => {
		registerDB(values);
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
					<View style={styles.imgBox}>
						{cameraOn && !image && (
							<Camera type={type} ref={cameraRef} style={styles.camera} />
						)}
						{image && <Image source={{ uri: image }} style={styles.camera} />}
						{isLoading && <ActivityIndicator style={styles.loader} />}

						{!image ? (
							<Pressable
								onPress={!cameraOn ? cameraTurnOn : takePicture}
								style={styles.addBtnWrapper}
								disabled={isLoading}
							>
								<AntDesign name="plus" size={18} color="#FF6C00" />
							</Pressable>
						) : (
							<Pressable
								onPress={handleDeleteImg}
								style={[
									styles.addBtnWrapper,
									image && styles.addBtnWrapperGray,
								]}
							>
								<AntDesign name="close" size={18} color="#E8E8E8" />
							</Pressable>
						)}
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
							{errors.password && touched.password && (
								<Text style={styles.errorMessage}>{errors.password}</Text>
							)}
						</View>
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
		justifyContent: 'center',
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
	addBtnWrapperGray: {
		borderColor: '#BDBDBD',
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
		top: 16,
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
	camera: {
		flex: 1,
		borderRadius: 16,
	},
	loader: {
		position: 'absolute',
		alignSelf: 'center',
	},
});
