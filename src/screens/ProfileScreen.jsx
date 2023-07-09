import {
	StyleSheet,
	ImageBackground,
	SafeAreaView,
	Text,
	View,
	Image,
	Pressable,
	FlatList,
} from 'react-native';
import { useUser } from '../hooks/userContext';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';

const ProfileScreen = ({ navigation }) => {
	const [hasPermission, setHasPermission] = useState(null);
	const cameraRef = useRef(null);
	const [cameraOn, setCameraOn] = useState(false);
	const [type, setType] = useState(Camera.Constants.Type.back);

	const { userName, logOut, userPosts, userPhoto, addUserPhoto } = useUser();

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
				addUserPhoto(data.uri);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const cameraTurnOn = () => {
		setCameraOn(true);
	};

	handleDeleteImg = () => {
		addUserPhoto(null);
		setCameraOn(false);
	};

	const handleAddImg = () => {
		console.log('add img');
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/images/bg.jpg')}
				resizeMode="cover"
				style={styles.backgroundImg}
			>
				<SafeAreaView style={styles.container}>
					<View style={styles.inner}>
						<View style={styles.imgBox}>
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
						<Pressable onPress={() => logOut()} style={styles.btnLogOut}>
							<Feather name="log-out" size={24} color="#BDBDBD" />
						</Pressable>
						<Text style={styles.userName}>{!userName ? 'Name' : userName}</Text>

						<View style={styles.container}>
							<FlatList
								data={userPosts}
								renderItem={({ item }) => (
									<View style={styles.item}>
										<View style={styles.imageContainer}>
											<Image
												source={{ uri: item.image }}
												style={styles.postImg}
											/>
										</View>
										<Text style={styles.postName}>{item.name}</Text>
										<View style={styles.postInformationContainer}>
											<View style={styles.containerBtn}>
												<Pressable
													style={styles.commentsBtn}
													onPress={() =>
														navigation.navigate('CommentsScreen', {
															comments: item.comments,
															img: item.image,
														})
													}
												>
													<Feather
														name="message-circle"
														size={24}
														style={[
															styles.commentsIcon,
															item.comments.length === 0 &&
																styles.inactiveColor,
														]}
													/>
													<Text
														style={[
															styles.commentsSum,
															item.comments.length === 0 &&
																styles.inactiveColor,
														]}
													>
														{item.comments.length}
													</Text>
												</Pressable>

												<Pressable
													style={styles.commentsBtn}
													onPress={() => console.log('like')}
												>
													<Feather
														name="thumbs-up"
														size={24}
														style={[
															styles.commentsIcon,
															item.likes === 0 && styles.inactiveColor,
														]}
													/>
													<Text
														style={[
															styles.commentsSum,
															item.likes === 0 && styles.inactiveColor,
														]}
													>
														{item.comments.length}
													</Text>
												</Pressable>
											</View>
											<Pressable
												style={styles.commentsBtn}
												onPress={() => {
													if (typeof item.location.coords === 'object') {
														navigation.navigate('MapScreen', {
															coords: item.location.coords,
															name: item.name,
														});
													} else {
														alert('No information');
													}
												}}
											>
												<Feather
													name="map-pin"
													size={24}
													style={styles.inactiveColor}
												/>
												<Text style={styles.location}>
													{item.location.title}
												</Text>
											</Pressable>
										</View>
									</View>
								)}
							/>
						</View>
					</View>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundImg: {
		flex: 1,
	},
	inner: {
		flex: 1,
		marginTop: 147,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingHorizontal: 16,
		paddingTop: 92,
		backgroundColor: '#FFFFFF',
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

	item: {
		marginBottom: 32,
	},
	imageContainer: {
		marginBottom: 8,
		height: 240,
		borderRadius: 8,
		overflow: 'hidden',
		backgroundColor: '#E8E8E8',
		justifyContent: 'center',
	},
	postImg: {
		flex: 1,
	},
	postName: {
		flex: 1,
		marginBottom: 10,
		color: '#212121',
		fontFamily: 'Roboto-Medium',
		fontSize: 16,
	},
	postInformationContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	containerBtn: {
		flexDirection: 'row',
		gap: 24,
	},
	commentsBtn: {
		flexDirection: 'row',
		gap: 5,
	},
	commentsIcon: {
		color: '#FF6C00',
	},
	inactiveColor: {
		color: '#BDBDBD',
	},
	commentsSum: {
		color: '#212121',
		fontFamily: 'Roboto-Regular',
		fontSize: 16,
	},
	location: {
		color: '#212121',
		fontFamily: 'Roboto-Regular',
		fontSize: 16,
		textDecorationLine: 'underline',
	},
	camera: {
		flex: 1,
		borderRadius: 16,
	},
});

export default ProfileScreen;
