import { useEffect, useState } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Pressable,
	ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db, auth } from '../../config';
import { nanoid } from '@reduxjs/toolkit';

const CommentsScreen = ({ route }) => {
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState();
	const img = route.params.img;
	const postId = route.params.postId;
	const postCreatedBy = route.params.postCreatedBy;
	const [isLoading, setIsLoading] = useState(false);
	const currentUser = auth.currentUser.uid;

	useEffect(() => {
		getCommentsFromStore();
	}, []);

	const handleComment = async () => {
		if (!comment) {
			return;
		}
		await setCommentToStore();
		await getCommentsFromStore();

		setComment('');
	};

	const setCommentToStore = async () => {
		const postRef = doc(db, 'posts', postCreatedBy, 'userPosts', postId);

		const newComment = {
			id: nanoid(),
			createdBy: currentUser,
			text: comment,
			createdAt: Date.now(),
		};
		setIsLoading(true);
		try {
			await updateDoc(postRef, {
				comments: arrayUnion(newComment),
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
		setIsLoading(false);
	};

	const timeFormat = number => {
		let options = {
			day: 'numeric',
			month: 'long',
		};
		let options2 = {
			year: 'numeric',
		};
		let options3 = {
			hour: 'numeric',
			minute: 'numeric',
		};
		const firstPart = new Intl.DateTimeFormat('uk', options).format(number);
		const secondPart = new Intl.DateTimeFormat('uk', options2).format(number);
		const thirdPart = new Intl.DateTimeFormat('uk', options3).format(number);
		return `${firstPart}, ${secondPart} | ${thirdPart}`;
	};
	const getCommentsFromStore = async () => {
		const postRef = doc(db, 'posts', postCreatedBy, 'userPosts', postId);
		const postSnap = await getDoc(postRef);

		if (postSnap.exists()) {
			const commentsWithAvatars = await Promise.all(
				postSnap.data().comments.map(async comment => {
					const avatarUrl = await getAvatarUrl(comment.createdBy);
					return {
						...comment,
						avatar: avatarUrl,
					};
				})
			);
			setComments(commentsWithAvatars);
		} else {
			console.log('No such document!');
		}
	};
	const getAvatarUrl = async userId => {
		const userRef = doc(db, 'users', userId);
		const userSnap = await getDoc(userRef);
		return userSnap.exists() ? userSnap.data().userAvatar : '';
	};

	return (
		<>
			<View style={styles.container}>
				{isLoading && (
					<View style={styles.loaderContainer}>
						<ActivityIndicator color="#FF6C00" size="large" />
					</View>
				)}

				<View style={styles.imageContainer}>
					<Image source={{ uri: img }} style={styles.postImg} />
				</View>

				<View style={styles.listContainer}>
					<FlatList
						data={comments}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<View
								style={[
									styles.commentContainer,
									currentUser === item.createdBy &&
										styles.commentContainerReverse,
								]}
							>
								<View style={styles.userImgContainer}>
									<Image source={{ uri: item.avatar }} style={styles.avatar} />
								</View>
								<View style={styles.commentTextContainer}>
									<Text style={styles.commentText}>{item.text}</Text>
									<Text style={styles.commentDate}>
										{timeFormat(item.createdAt)}
									</Text>
								</View>
							</View>
						)}
					/>
					<View style={styles.inputField}>
						<TextInput
							placeholder="Коментувати..."
							placeholderTextColor="#BDBDBD"
							value={comment}
							onChangeText={setComment}
							style={[styles.input, !comment && styles.textPlaceholder]}
						/>
						<Pressable style={styles.btnComment} onPress={handleComment}>
							<Feather name="arrow-up" size={24} style={styles.iconComment} />
						</Pressable>
					</View>
				</View>
			</View>
		</>
	);
};

styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 32,
		backgroundColor: '#FFFFFF',
	},
	imageContainer: {
		marginBottom: 32,
		height: 240,
		borderRadius: 8,
		overflow: 'hidden',
		backgroundColor: '#E8E8E8',
		justifyContent: 'center',
	},
	postImg: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
	},
	commentContainer: {
		flexDirection: 'row',
		gap: 16,
		marginBottom: 24,
	},
	commentContainerReverse: {
		flexDirection: 'row-reverse',
	},
	userImgContainer: {
		width: 28,
		height: 28,
		borderRadius: 50,
		backgroundColor: '#E8E8E8',
		overflow: 'hidden',
	},
	commentTextContainer: {
		flexGrow: 1,
		padding: 16,
		borderRadius: 6,
		backgroundColor: 'rgba(0, 0, 0, 0.03)',
	},
	commentText: {
		marginBottom: 8,
		color: '#212121',
		fontFamily: 'Roboto-Regular',
		fontSize: 13,
		lineHeight: 18,
	},
	commentDate: {
		color: '#BDBDBD',
		textAlign: 'right',
		fontFamily: 'Roboto-Regular',
		fontSize: 10,
	},
	inputField: {
		bottom: 16,
		justifyContent: 'center',
		marginTop: 31,
	},
	input: {
		backgroundColor: '#F6F6F6',
		color: '#212121',
		fontFamily: 'Roboto-Medium',
		fontSize: 16,
		paddingTop: 16,
		paddingBottom: 15,
		paddingHorizontal: 16,
		borderRadius: 50,
		borderColor: '#E8E8E8',
		borderWidth: 1,
	},
	textPlaceholder: {
		fontFamily: 'Roboto-Regular',
	},
	btnComment: {
		position: 'absolute',
		right: 16,
		justifyContent: 'center',
		alignItems: 'center',
		width: 34,
		height: 34,
		borderRadius: 50,
		backgroundColor: '#FF6C00',
	},
	iconComment: {
		color: '#FFFFFF',
	},
	loaderContainer: {
		position: 'absolute',
		// zIndex: 2,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	avatar: {
		flex: 1,
	},
});

export default CommentsScreen;
