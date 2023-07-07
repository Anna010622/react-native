import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import BottomTabNavigator from './BottomTabNavigator';
import { useState } from 'react';

const MainStack = createStackNavigator();

const MainNavigation = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
							initialParams={{ setIsLoggedIn }}
						/>
						<MainStack.Screen
							name="Login"
							component={LoginScreen}
							initialParams={{ setIsLoggedIn }}
						/>
					</MainStack.Group>
				) : (
					<MainStack.Screen
						name="BottomTabNavigator"
						component={BottomTabNavigator}
						initialParams={{ setIsLoggedIn }}
					/>
				)}
			</MainStack.Navigator>
		</NavigationContainer>
	);
};

export default MainNavigation;
