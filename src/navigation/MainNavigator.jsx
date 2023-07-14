import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CommentsScreen from '../screens/CommentsScreen';
import MapScreen from '../screens/MapScreen';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config';
import { useState } from 'react';
import { useEffect } from 'react';

const MainStack = createStackNavigator();

const MainNavigation = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setIsLoggedIn(true);
				setLoaded(true);
				// const uid = user.uid;
			} else {
				setIsLoggedIn(false);
				setLoaded(true);
			}
		});
	}, []);

	return (
		<>
			{!loaded ? (
				<View style={styles.loaderContainer}>
					<ActivityIndicator color="#FF6C00" size="large" />
				</View>
			) : (
				<NavigationContainer>
					<MainStack.Navigator initialRouteName="Login">
						{!isLoggedIn ? (
							<MainStack.Group screenOptions={{ headerShown: false }}>
								<MainStack.Screen
									name="Registration"
									component={RegistrationScreen}
								/>
								<MainStack.Screen name="Login" component={LoginScreen} />
							</MainStack.Group>
						) : (
							<>
								<MainStack.Group screenOptions={{ headerShown: false }}>
									<MainStack.Screen
										name="BottomTabNavigator"
										component={BottomTabNavigator}
									/>
								</MainStack.Group>

								<MainStack.Group
									screenOptions={{
										headerShown: true,
										headerTitleStyle: styles.headerTitleStyle,
										headerTitleAlign: 'center',
										headerLeftContainerStyle: {
											opacity: 0.8,
										},
									}}
								>
									<MainStack.Screen
										name="CommentsScreen"
										component={CommentsScreen}
										screenOptions={{ headerShown: true }}
									/>
									<MainStack.Screen name="MapScreen" component={MapScreen} />
								</MainStack.Group>
							</>
						)}
					</MainStack.Navigator>
				</NavigationContainer>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	headerTitleStyle: {
		color: '#212121',
		fontFamily: 'Roboto-Medium',
		fontSize: 17,
		lineHeight: 22,
		letterSpacing: -0.408,
	},
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
	},
});

export default MainNavigation;
