import { StyleSheet, Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/selectors';

const User = () => {
	const user = useSelector(selectUser);

	return (
		<View style={styles.userWrapper}>
			<View style={styles.userPhotoContainer}>
				{user?.userAvatar && (
					<Image source={{ uri: user?.userAvatar }} style={styles.userPhoto} />
				)}
			</View>
			<View>
				{user?.name && <Text style={styles.userName}>{user.name}</Text>}
				{user?.email && <Text style={styles.userEmail}>{user.email}</Text>}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	userWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 8,
		marginVertical: 32,
	},
	userPhotoContainer: {
		width: 60,
		height: 60,
		borderRadius: 16,
		backgroundColor: '#E8E8E8',
		overflow: 'hidden',
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
	userPhoto: {
		flex: 1,
	},
});

export default User;
