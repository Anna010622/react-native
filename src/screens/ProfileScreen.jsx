import {
	StyleSheet,
	ImageBackground,
	SafeAreaView,
	Text,
	View,
	Pressable,
} from 'react-native';
import { useUser } from '../hooks/userContext';
import { AntDesign, Feather } from '@expo/vector-icons';

const ProfileScreen = () => {
	const { userName, logOut } = useUser();

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
							<Pressable onPress={handleAddImg} style={styles.addBtnWrapper}>
								<AntDesign name="plus" size={18} color="#FF6C00" />
							</Pressable>
						</View>
						<Pressable onPress={() => logOut()} style={styles.btnLogOut}>
							<Feather name="log-out" size={24} color="#BDBDBD" />
						</Pressable>
						<Text style={styles.userName}>{userName ? 'Name' : userName}</Text>
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
});

export default ProfileScreen;
