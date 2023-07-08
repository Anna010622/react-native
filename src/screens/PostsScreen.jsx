import { StyleSheet, Text, View } from 'react-native';
import { useUser } from '../hooks/userContext';

const PostScreen = () => {
	const { userName, userEmail } = useUser();

	return (
		<View style={styles.container}>
			<View style={styles.userWrapper}>
				<View style={styles.imageContainer}></View>
				<View>
					{userName && <Text style={styles.userName}>{userName}</Text>}
					{userEmail && <Text style={styles.userEmail}>{userEmail}</Text>}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 32,
		backgroundColor: '#FFFFFF',
	},
	userWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 8,
	},
	imageContainer: {
		width: 60,
		height: 60,
		borderRadius: 16,
		backgroundColor: '#E8E8E8',
	},
	userName: {
		color: '#212121',
		fontFamily: 'Roboto-Bold',
		fontSize: 13,
	},
	userEmail: {
		color: 'rgba(33, 33, 33, 0.80)',
		fontFamily: 'Roboto-Regular',
		fontSize: 11,
	},
});

export default PostScreen;
