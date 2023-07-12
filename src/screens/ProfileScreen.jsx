import {
	StyleSheet,
	ImageBackground,
	Text,
	View,
	FlatList,
	Dimensions,
} from 'react-native';
import { useUser } from '../hooks/userContext';
import { useCallback } from 'react';
import User from '../components/ProfileScreenUser';
import Item from '../components/ProfileScreenItem';

const ProfileScreen = ({ navigation }) => {
	const { userPosts } = useUser();

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
					keyExtractor={item => item.image}
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
