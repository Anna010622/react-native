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
				tabBarShowLabel: false,
				headerShown: route.name === 'ProfileScreen' ? false : true,
				headerTitleAlign: 'center',
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === 'PostsScreen') {
						iconName = 'grid';
					} else if (route.name === 'CreatePostsScreen') {
						iconName = focused ? 'plus' : 'plus';
					} else if (route.name === 'ProfileScreen') {
						iconName = 'user';
					}
					return <Feather name={iconName} size={size} color={color} />;
				},
			})}
			tabBarOptions={{
				activeTintColor: '#FF6C00',
				inactiveTintColor: 'rgba(33, 33, 33, 0.8)',
			}}
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
				options={{ title: 'Створити публікацію' }}
			/>
			<Tabs.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{ title: '' }}
			/>
		</Tabs.Navigator>
	);
};

export default Home;

const styles = StyleSheet.create({
	btnLogOut: {
		paddingHorizontal: 10,
	},
});
