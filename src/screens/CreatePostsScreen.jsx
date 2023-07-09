import { Image, Pressable } from 'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react';
import { Button } from '../components/Button';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { useUser } from '../hooks/userContext';

const CreatePostsScreen = ({ navigation }) => {
	const [location, setLocation] = useState('');
	const [image, setImage] = useState(null);
	const [name, setName] = useState('');

	const [hasPermission, setHasPermission] = useState(null);
	const [hasLocationPermission, setHasLocationPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const cameraRef = useRef(null);
	const { addPost } = useUser();

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasPermission(cameraStatus.status === 'granted');
			let locationStatus = await Location.requestForegroundPermissionsAsync();
			setHasLocationPermission(locationStatus.status === 'granted');
		})();
	}, []);

	const takePicture = async () => {
		if (cameraRef) {
			try {
				const data = await cameraRef.current.takePictureAsync();
				setImage(data.uri);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const editPicture = () => setImage(null);

	const createPost = async () => {
		if (hasLocationPermission) {
			let loc = await Location.getCurrentPositionAsync({});
			const coords = {
				latitude: loc.coords.latitude,
				longitude: loc.coords.longitude,
			};
			return {
				image,
				name,
				location: { title: location, coords },
				comments: [],
				likes: 0,
			};
		} else {
			return {
				image,
				name,
				location: { title: location, coords: 'No information' },
				comments: [],
				likes: 0,
			};
		}
	};

	const handlePublish = async () => {
		const post = await createPost();
		addPost(post);
		navigation.navigate('PostsScreen');
		setImage(null);
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
		<View style={styles.container}>
			<View style={styles.imgContainer}>
				<Pressable
					style={[styles.cameraBtn, image && styles.opacity]}
					onPress={!image ? takePicture : editPicture}
				>
					<MaterialIcons
						name="camera-alt"
						size={24}
						color={!image ? '#BDBDBD' : '#FFFFFF'}
					/>
				</Pressable>

				{image ? (
					<Image source={{ uri: image }} style={styles.camera} />
				) : (
					<Camera type={type} ref={cameraRef} style={styles.camera} />
				)}
			</View>
			<Text style={styles.text}>
				{!image ? 'Завантажте фото' : 'Редагувати фото'}
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
				disabled={(!image || !name || !location) && true}
			/>
			<Pressable
				style={[styles.btnDelete, styles.btnDeleteDisable]}
				onPress={handlePublish}
				disabled={true}
			>
				<Feather
					name="trash-2"
					size={24}
					style={[styles.iconDeleteActive, styles.iconDeleteDisable]}
				/>
			</Pressable>
		</View>
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
});
