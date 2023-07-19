import {
	StyleSheet,
	ImageBackground,
	Text,
	View,
	FlatList,
	Dimensions,
} from 'react-native';
import { useCallback, useEffect } from 'react';
import User from '../components/ProfileScreenUser';
import Item from '../components/ProfileScreenItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserPosts } from '../redux/selectors';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../config';
import { setPosts } from '../redux/userSlice';

const ProfileScreen = ({ navigation }) => {
	const userPosts = useSelector(selectUserPosts);
	const dispatch = useDispatch();

	useEffect(() => {
		const userId = auth.currentUser.uid;
		const q = query(
			collection(db, 'posts', userId, 'userPosts'),
			orderBy('time', 'desc')
		);

		const unsubscribe = onSnapshot(q, querySnapshot => {
			const posts = [];
			querySnapshot.forEach(doc => {
				const data = doc.data();
				const id = doc.id;
				const post = { id, ...data };
				posts.push(post);
			});
			dispatch(setPosts(posts));
		});

		return () => unsubscribe();
	}, []);

	const renderItem = useCallback(
		({ item }) => <Item item={item} navigation={navigation} />,
		[]
	);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/images/bg.jpg')}
				resizeMode="cover"
				style={styles.backgroundImg}
			>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={userPosts}
					renderItem={renderItem}
					keyExtractor={item => item.id}
					ListHeaderComponent={<User />}
					ListEmptyComponent={
						<View style={styles.listEmptyComponent}>
							<Text style={styles.emptyText}>У вас ще немає публікацій</Text>
						</View>
					}
				/>
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
	listEmptyComponent: {
		backgroundColor: '#FFFFFF',
		width: '100%',
		height: Dimensions.get('window').height - 327,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyText: {
		fontFamily: 'Roboto-Medium',
		fontSize: 20,
	},
});

export default ProfileScreen;
