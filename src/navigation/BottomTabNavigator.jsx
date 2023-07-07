import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet } from 'react-native';
import PostsScreen from '../screens/PostsScreen';
import CreatePostsScreen from '../screens/CreatePostsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Feather } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
	return (
		<Tabs.Navigator
			initialRouteName="PostsScreen"
			screenOptions={({ route }) => ({
				tabBarStyle: styles.tabBarStyle,
				tabBarItemStyle: styles.tabBarItemStyle,
				tabBarActiveBackgroundColor: '#FF6C00',
				tabBarInactiveTintColor: '#BDBDBD',
				tabBarActiveTintColor: '#FFFFFF',
				tabBarShowLabel: false,
				headerShown: route.name === 'ProfileScreen' ? false : true,
				headerTitleAlign: 'center',
				headerTitleStyle: styles.headerTitleStyle,
				tabBarIcon: ({ color, size }) => {
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
				component={PostsScreen}
				options={{
					title: 'Публікації',
					headerRight: () => (
						<Pressable
							onPress={() => navigation.navigate('Login')}
							style={styles.btnLogOut}
						>
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
					tabBarStyle: { display: 'none' },
					headerLeft: () => (
						<Pressable
							onPress={() => navigation.navigate('PostsScreen')}
							style={styles.btnBack}
						>
							<Feather
								name="arrow-left"
								size={24}
								color="rgba(33, 33, 33, 0.8)"
							/>
						</Pressable>
					),
				}}
			/>
			<Tabs.Screen name="ProfileScreen" component={ProfileScreen} />
		</Tabs.Navigator>
	);
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
	tabBarStyle: {
		height: 58,
		paddingHorizontal: 81,
		backgroundColor: '#FFFFFF',
		boxShadow: '0px -0.5px 0px 0px rgba(0, 0, 0, 0.30)',
		backdropFilter: 'blur(13.591408729553223)',
	},
	tabBarItemStyle: {
		alignSelf: 'center',
		borderRadius: 50,
		width: 70,
		height: 40,
	},
	headerTitleStyle: {
		color: '#212121',
		fontFamily: 'Roboto-Medium',
		fontSize: 17,
		lineHeight: 22,
		letterSpacing: -0.408,
	},
	btnBack: {
		paddingLeft: 16,
	},
	btnLogOut: {
		paddingHorizontal: 10,
	},
});
