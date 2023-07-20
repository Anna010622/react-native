import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../../config';

const Item = ({ item, navigation }) => {
	const [addedLike, setAddedLike] = useState(false);

	const handleLike = async (postCreatedBy, postId) => {
		const likesRef = doc(db, 'posts', postCreatedBy, 'userPosts', postId);
		if (!addedLike) {
			await updateDoc(likesRef, {
				likes: increment(1),
			});
			setAddedLike(true);
		} else {
			await updateDoc(likesRef, {
				likes: increment(-1),
			});
			setAddedLike(false);
		}
	};

	return (
		<View style={styles.item}>
			<View style={styles.imageContainer}>
				<Image source={{ uri: item.imageUri }} style={styles.postImg} />
			</View>
			{item.name && <Text style={styles.postName}>{item.name}</Text>}
			<View style={styles.postInformationContainer}>
				<View style={styles.containerBtn}>
					<Pressable
						style={styles.commentsBtn}
						onPress={() =>
							navigation.navigate('CommentsScreen', {
								img: item.imageUri,
								postId: item.id,
								postCreatedBy: item.createdBy,
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
						style={styles.commentsBtn}
						onPress={() => {
							handleLike(item.createdBy, item.id);
						}}
					>
						<Feather
							name="thumbs-up"
							size={24}
							style={[styles.commentsIcon, !addedLike && styles.inactiveColor]}
						/>
						<Text
							style={[styles.commentsSum, !addedLike && styles.inactiveColor]}
						>
							{item.likes}
						</Text>
					</Pressable>
				</View>

				<Pressable
					style={styles.locationBtn}
					onPress={() => {
						if (typeof item.location.coords === 'object') {
							navigation.navigate('MapScreen', {
								coords: item.location.coords,
								name: item.title,
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
};

const styles = StyleSheet.create({
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

export default Item;
