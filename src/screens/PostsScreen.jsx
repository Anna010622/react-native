import { StyleSheet, View, FlatList } from 'react-native';
import { useUser } from '../hooks/userContext';
import { useCallback } from 'react';
import Item from '../components/PostScreenItem';
import User from '../components/PostScreenUser';

const PostScreen = ({ navigation }) => {
	const { userName, userEmail, userPosts, userPhoto } = useUser();

	const renderItem = useCallback(
		({ item }) => <Item item={item} navigation={navigation} />,
		[]
	);

	return (
		<View style={styles.container}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={userPosts}
				renderItem={renderItem}
				keyExtractor={item => item.image}
				ListHeaderComponent={
					<User
						userName={userName}
						userEmail={userEmail}
						userPhoto={userPhoto}
					/>
				}
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
});

export default PostScreen;
