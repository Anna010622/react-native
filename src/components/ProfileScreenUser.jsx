import {
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
	ActivityIndicator,
} from 'react-native';
import { useUser } from '../hooks/userContext';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';

const User = () => {
	const [hasPermission, setHasPermission] = useState(null);
	const cameraRef = useRef(null);
	const [cameraOn, setCameraOn] = useState(false);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [isLoading, setIsLoading] = useState(false);

	const { userName, logOut, userPhoto, addUserPhoto } = useUser();

	const takePicture = async () => {
		if (cameraRef) {
			setIsLoading(true);
			try {
				const data = await cameraRef.current.takePictureAsync();
				addUserPhoto(data.uri);
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
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
		addUserPhoto(null);
		setCameraOn(false);
	};

	return (
		<>
			<View>
				<View style={styles.imgBox}>
					{isLoading && <ActivityIndicator style={styles.loader} />}
					{cameraOn && !userPhoto && (
						<Camera type={type} ref={cameraRef} style={styles.camera} />
					)}
					{userPhoto && (
						<Image source={{ uri: userPhoto }} style={styles.userPhoto} />
					)}
					{!userPhoto ? (
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
								userPhoto && styles.addBtnWrapperGray,
							]}
						>
							<AntDesign name="close" size={18} color="#E8E8E8" />
						</Pressable>
					)}
				</View>
				<View style={styles.listHeaderTop}></View>
				<View style={styles.listHeaderBottom}>
					<Pressable onPress={() => logOut()} style={styles.btnLogOut}>
						<Feather name="log-out" size={24} color="#BDBDBD" />
					</Pressable>
					<Text style={styles.userName}>{!userName ? 'Name' : userName}</Text>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	listHeaderTop: {
		height: 187,
		with: '100%',
		backgroundColor: 'transparent',
	},
	listHeaderBottom: {
		paddingTop: 60,
		with: '100%',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		backgroundColor: '#FFFFFF',
	},
	imgBox: {
		position: 'absolute',
		zIndex: 1,
		top: 127,
		width: 120,
		height: 120,
		borderRadius: 16,
		alignSelf: 'center',
		backgroundColor: '#F6F6F6',
		justifyContent: 'center',
	},
	userPhoto: {
		flex: 1,
		borderRadius: 16,
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
	btnLogOut: {
		position: 'absolute',
		top: 22,
		right: 16,
	},
	userName: {
		marginBottom: 33,
		color: '#212121',
		textAlign: 'center',
		fontFamily: 'Roboto-Medium',
		fontSize: 30,
		letterSpacing: 0.3,
	},
	camera: {
		flex: 1,
		borderRadius: 16,
	},
	loader: {
		position: 'absolute',
		zIndex: 1,
		alignSelf: 'center',
	},
});

export default User;
