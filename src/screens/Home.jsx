import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet } from 'react-native';
import PostScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';
import { Feather } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator();

const Home = () => {
	const handleLogOut = () => {
		console.log('Log out');
	};
	return (
		<Tabs.Navigator
			screenOptions={({ route }) => ({
				tabBarStyle: {
					height: 58,
					paddingHorizontal: 81,
				},
				tabBarItemStyle: {
					alignSelf: 'center',
					borderRadius: 50,
					width: 70,
					height: 40,
				},
				tabBarActiveBackgroundColor: '#FF6C00',
				tabBarInactiveTintColor: '#BDBDBD',
				tabBarActiveTintColor: '#FFFFFF',
				tabBarShowLabel: false,
				headerShown: route.name === 'ProfileScreen' ? false : true,
				headerTitleAlign: 'center',
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === 'PostsScreen') {
						iconName = 'grid';
					} else if (route.name === 'CreatePostsScreen') {
						iconName = 'plus';
					} else if (route.name === 'ProfileScreen') {
						iconName = 'user';
					}
					return <Feather name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tabs.Screen
				name="PostsScreen"
				component={PostScreen}
				options={{
					title: 'Публікації',
					headerRight: () => (
						<Pressable onPress={handleLogOut} style={styles.btnLogOut}>
							<Feather name="log-out" size={24} color="#BDBDBD" />
						</Pressable>
					),
				}}
			/>
			<Tabs.Screen
				name="CreatePostsScreen"
				component={CreatePostsScreen}
				options={{
					title: 'Створити публікацію',
				}}
			/>
			<Tabs.Screen name="ProfileScreen" component={ProfileScreen} />
		</Tabs.Navigator>
	);
};

export default Home;

const styles = StyleSheet.create({
	btnLogOut: {
		paddingHorizontal: 10,
	},
});
