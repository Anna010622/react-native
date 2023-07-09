import { useState } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const CommentsScreen = ({ route }) => {
	const [comment, setComment] = useState('');
	const comments = route.params.comments;
	const img = route.params.img;

	const handleComment = () => {
		if (!comment) {
			return;
		}
		console.log(comment);

		setComment('');
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image source={{ uri: img }} style={styles.postImg} />
			</View>

			<View style={styles.listContainer}>
				<FlatList
					data={comments}
					renderItem={({ item }) => (
						<View style={styles.commentContainer}>
							<View style={styles.userImgContainer}></View>
							<View style={styles.commentTextContainer}>
								<Text style={styles.commentText}>Коментар</Text>
								<Text style={styles.commentDate}>Дата</Text>
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
	userImgContainer: {
		width: 28,
		height: 28,
		borderRadius: 50,
		backgroundColor: '#E8E8E8',
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
});

export default CommentsScreen;
