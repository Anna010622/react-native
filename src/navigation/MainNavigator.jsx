import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import BottomTabNavigator from './BottomTabNavigator';
import { useUser } from '../hooks/userContext';

const MainStack = createStackNavigator();

const MainNavigation = () => {
	const { isLoggedIn } = useUser();

	return (
		<NavigationContainer>
			<MainStack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName="Login"
			>
				{!isLoggedIn ? (
					<MainStack.Group>
						<MainStack.Screen
							name="Registration"
							component={RegistrationScreen}
						/>
						<MainStack.Screen name="Login" component={LoginScreen} />
					</MainStack.Group>
				) : (
					<MainStack.Screen
						name="BottomTabNavigator"
						component={BottomTabNavigator}
					/>
				)}
			</MainStack.Navigator>
		</NavigationContainer>
	);
};

export default MainNavigation;
