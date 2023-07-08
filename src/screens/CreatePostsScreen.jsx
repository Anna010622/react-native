import { Image, Pressable } from 'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react';
import { Button } from '../components/Button';
import { Camera } from 'expo-camera';

const CreatePostsScreen = () => {
	const [isName, setIsName] = useState(false);
	const [isLocation, setIsLocation] = useState(false);

	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const cameraRef = useRef(null);
	const [image, setImage] = useState(null);

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasPermission(cameraStatus.status === 'granted');
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

	const handlePublish = () => {
		console.log('publish');
	};

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
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
				onChangeText={text =>
					text.length === 0 ? setIsName(false) : setIsName(true)
				}
				style={[styles.input, !isName && styles.textPlaceholder]}
			/>
			<View style={styles.inputField}>
				<Feather name="map-pin" size={24} style={styles.inputIcon} />
				<TextInput
					placeholder="Місцевість..."
					ref={input => {
						secondTextInput = input;
					}}
					placeholderTextColor="#BDBDBD"
					onChangeText={text =>
						text.length === 0 ? setIsLocation(false) : setIsLocation(true)
					}
					style={[
						styles.input,
						!isLocation && styles.textPlaceholder,
						styles.inputTextWithIconLeft,
					]}
				/>
			</View>
			<Button
				text="Опубліковати"
				onPressFunction={handlePublish}
				disabled={true}
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
});
