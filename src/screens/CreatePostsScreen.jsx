import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState, useRef } from 'react';
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
	TextInput,
	ActivityIndicator,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native';
import { Button } from '../components/Button';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, auth, db } from '../../config';

const CreatePostsScreen = ({ navigation }) => {
	const [location, setLocation] = useState('');
	const [uri, setUri] = useState(null);
	const [name, setName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [hasPermission, setHasPermission] = useState(null);
	const [hasLocationPermission, setHasLocationPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const cameraRef = useRef(null);
	const isFocused = useIsFocused();

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasPermission(cameraStatus.status === 'granted');
			let locationStatus = await Location.requestForegroundPermissionsAsync();
			setHasLocationPermission(locationStatus.status === 'granted');
		})();
	}, []);

	useEffect(() => {
		if (!isFocused) {
			reset();
		}
	});

	const takePicture = async () => {
		if (cameraRef) {
			setIsLoading(true);
			try {
				const data = await cameraRef.current.takePictureAsync();
				setUri(data.uri);
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		}
	};

	const editPicture = () => setUri(null);

	const uploadImage = async () => {
		setIsLoading(true);
		const response = await fetch(uri);
		const blob = await response.blob();
		const id = blob._data.name;
		const storageRef = ref(storage, `images/${auth.currentUser.uid}/posts/id`);
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
				savePost(downloadURL);
			}
		);
	};
	const savePost = async downloadURL => {
		const coords = await getLocationCoords();
		const userPost = {
			createdBy: auth.currentUser.uid,
			name,
			location: { title: location, coords: coords },
			comments: [],
			likes: 0,
			imageUri: downloadURL,
			time: Date.now(),
		};

		try {
			await addDoc(
				collection(db, 'posts', auth.currentUser.uid, 'userPosts'),
				userPost
			);
			setIsLoading(false);
			navigation.navigate('PostsScreen');
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			throw error;
		}
	};
	const getLocationCoords = async () => {
		if (hasLocationPermission) {
			let loc = await Location.getCurrentPositionAsync({});
			const coords = {
				latitude: loc.coords.latitude,
				longitude: loc.coords.longitude,
			};
			return coords;
		} else {
			return 'No information';
		}
	};

	const handlePublish = async () => {
		await uploadImage();
	};

	const reset = () => {
		setUri(null);
		setName('');
		setLocation('');
	};

	if (hasPermission === false) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorMessage}>No access to camera</Text>
			</View>
		);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<View style={styles.imgContainer}>
					{isLoading ? (
						<ActivityIndicator style={styles.loader} size="large" />
					) : (
						<Pressable
							style={[styles.cameraBtn, uri && styles.opacity]}
							onPress={!uri ? takePicture : editPicture}
						>
							<MaterialIcons
								name="camera-alt"
								size={24}
								color={!uri ? '#BDBDBD' : '#FFFFFF'}
							/>
						</Pressable>
					)}

					{uri ? (
						<Image source={{ uri: uri }} style={styles.camera} />
					) : (
						<Camera type={type} ref={cameraRef} style={styles.camera} />
					)}
				</View>
				<Text style={styles.text}>
					{!uri ? 'Завантажте фото' : 'Редагувати фото'}
				</Text>
				<TextInput
					placeholder="Назва"
					returnKeyType="next"
					onSubmitEditing={() => {
						secondTextInput.focus();
					}}
					blurOnSubmit={false}
					placeholderTextColor="#BDBDBD"
					value={name}
					onChangeText={setName}
					style={[styles.input, !name && styles.textPlaceholder]}
				/>
				<View style={styles.inputField}>
					<Feather name="map-pin" size={24} style={styles.inputIcon} />
					<TextInput
						placeholder="Місцевість..."
						ref={input => {
							secondTextInput = input;
						}}
						placeholderTextColor="#BDBDBD"
						value={location}
						onChangeText={setLocation}
						style={[
							styles.input,
							!location && styles.textPlaceholder,
							styles.inputTextWithIconLeft,
						]}
					/>
				</View>
				<Button
					text="Опубліковати"
					onPressFunction={handlePublish}
					disabled={!uri || (isLoading && true)}
				/>
				{!isLoading && (
					<Pressable
						style={[
							styles.btnDelete,
							!uri && !name && !location && styles.btnDeleteDisable,
						]}
						onPress={reset}
						disabled={!uri && !name && !location && true}
					>
						<Feather
							name="trash-2"
							size={24}
							style={[
								styles.iconDeleteActive,
								!uri && !name && !location && styles.iconDeleteDisable,
							]}
						/>
					</Pressable>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 32,
		paddingBottom: 22,
		backgroundColor: '#FFFFFF',
	},
	imgContainer: {
		marginBottom: 8,
		height: 240,
		borderRadius: 8,
		overflow: 'hidden',
		backgroundColor: '#E8E8E8',
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
	},
	cameraBtn: {
		position: 'absolute',
		zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 60,
		backgroundColor: '#FFFFFF',
		borderRadius: 50,
		alignSelf: 'center',
	},
	opacity: {
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
	},
	text: {
		marginBottom: 32,
		color: '#BDBDBD',
		fontFamily: 'Roboto-Regular',
		fontSize: 16,
	},
	input: {
		color: '#212121',
		fontFamily: 'Roboto-Medium',
		fontSize: 16,
		paddingTop: 16,
		paddingBottom: 15,
		borderBottomColor: '#E8E8E8',
		borderBottomWidth: 1,
	},
	inputField: {
		justifyContent: 'center',
		marginBottom: 32,
	},
	inputTextWithIconLeft: {
		paddingLeft: 28,
	},
	textPlaceholder: {
		fontFamily: 'Roboto-Regular',
	},
	inputIcon: {
		color: '#BDBDBD',
		position: 'absolute',
	},
	btnDelete: {
		marginTop: 'auto',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: 70,
		height: 40,
		borderRadius: 50,
		backgroundColor: '#FF6C00',
	},
	btnDeleteDisable: {
		backgroundColor: '#F6F6F6',
	},
	iconDeleteActive: {
		color: '#FFFFFF',
	},
	iconDeleteDisable: {
		color: '#BDBDBD',
	},
	errorContainer: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorMessage: {
		color: '#212121',
		textAlign: 'center',
		fontFamily: 'Roboto-Medium',
		fontSize: 17,
		letterSpacing: 0.3,
	},
	loader: {
		position: 'absolute',
		zIndex: 1,
		alignSelf: 'center',
	},
});
