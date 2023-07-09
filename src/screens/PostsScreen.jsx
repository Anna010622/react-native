import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Pressable,
	Image,
} from 'react-native';
import { useUser } from '../hooks/userContext';
import { Feather } from '@expo/vector-icons';

const PostScreen = ({ navigation }) => {
	const { userName, userEmail, userPosts } = useUser();

	return (
		<View style={styles.container}>
			<View style={styles.userWrapper}>
				<View style={styles.userPhoto}></View>
				<View>
					{userName && <Text style={styles.userName}>{userName}</Text>}
					{userEmail && <Text style={styles.userEmail}>{userEmail}</Text>}
				</View>
			</View>
			<FlatList
				data={userPosts}
				renderItem={({ item }) => (
					<View style={styles.item}>
						<View style={styles.imageContainer}>
							<Image source={{ uri: item.image }} style={styles.postImg} />
						</View>
						<Text style={styles.postName}>{item.name}</Text>
						<View style={styles.postInformationContainer}>
							<Pressable
								style={styles.commentsBtn}
								onPress={() => navigation.navigate('CommentsScreen')}
							>
								<Feather
									name="message-circle"
									size={24}
									style={[
										styles.commentsIcon,
										item.comments.length === 0 && styles.inactiveColor,
									]}
								/>
								<Text
									style={[
										styles.commentsSum,
										item.comments.length === 0 && styles.inactiveColor,
									]}
								>
									{item.comments.length}
								</Text>
							</Pressable>
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
								<Text style={styles.location}>{item.location.title}</Text>
							</Pressable>
						</View>
					</View>
				)}
			/>
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
		marginBottom: 32,
	},
	userPhoto: {
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
});

export default PostScreen;
