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
import { useCallback } from 'react';

const PostScreen = ({ navigation }) => {
	const { userName, userEmail, userPosts, userPhoto } = useUser();

	const renderItem = useCallback(
		({ item }) => <Item item={item} navigation={navigation} />,
		[]
	);

	const headerList = () => (
		<User userName={userName} userEmail={userEmail} userPhoto={userPhoto} />
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={userPosts}
				renderItem={renderItem}
				keyExtractor={item => item.image}
				ListHeaderComponent={headerList}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: '#FFFFFF',
	},
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
	locationBtn: {
		flexDirection: 'row',
		gap: 5,
		maxWidth: 200,
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

const Item = ({ item, navigation }) => (
	<View style={styles.item}>
		<View style={styles.imageContainer}>
			<Image source={{ uri: item.image }} style={styles.postImg} />
		</View>
		{item.name && <Text style={styles.postName}>{item.name}</Text>}
		<View style={styles.postInformationContainer}>
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
				style={styles.locationBtn}
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
				<Feather name="map-pin" size={24} style={styles.inactiveColor} />
				<Text numberOfLines={1} style={styles.location}>
					{item.location.title}
				</Text>
			</Pressable>
		</View>
	</View>
);

const User = ({ userPhoto, userName, userEmail }) => (
	<View style={styles.userWrapper}>
		<View style={styles.userPhotoContainer}>
			{userPhoto && (
				<Image source={{ uri: userPhoto }} style={styles.userPhoto} />
			)}
		</View>
		<View>
			{userName && <Text style={styles.userName}>{userName}</Text>}
			{userEmail && <Text style={styles.userEmail}>{userEmail}</Text>}
		</View>
	</View>
);
