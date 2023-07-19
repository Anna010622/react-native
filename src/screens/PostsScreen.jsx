import { StyleSheet, View, FlatList } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import Item from '../components/PostScreenItem';
import User from '../components/PostScreenUser';
import {
	collectionGroup,
	query,
	orderBy,
	onSnapshot,
} from 'firebase/firestore';
import { db } from '../../config';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading } from '../redux/selectors';
import { setLoading } from '../redux/userSlice';

const PostScreen = ({ navigation }) => {
	const [userPosts, setUserPosts] = useState([]);
	const loading = useSelector(selectLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		const q = query(collectionGroup(db, 'userPosts'), orderBy('time', 'desc'));

		dispatch(setLoading(true));
		const unsubscribe = onSnapshot(q, querySnapshot => {
			const posts = [];
			querySnapshot.forEach(doc => {
				const data = doc.data();
				const id = doc.id;
				const post = { id, ...data };
				posts.push(post);
			});
			setUserPosts(posts);
		});
		dispatch(setLoading(false));
		return () => unsubscribe();
	}, []);

	const renderItem = useCallback(
		({ item }) => <Item item={item} navigation={navigation} />,
		[]
	);

	return (
		<View style={styles.container}>
			{loading && (
				<View style={styles.loaderContainer}>
					<ActivityIndicator color="#FF6C00" size="large" />
				</View>
			)}
			<FlatList
				showsVerticalScrollIndicator={false}
				data={userPosts}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				ListHeaderComponent={<User />}
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
	loaderContainer: {
		position: 'absolute',
		zIndex: 2,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
});

export default PostScreen;
