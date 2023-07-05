import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';
import { useFonts } from 'expo-font';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import Home from './src/screens/Home';

const MainStack = createStackNavigator();

export default function App() {
	const [fontsLoaded] = useFonts({
		'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
		'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
		'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={{ flex: 1 }}>
				<NavigationContainer>
					<MainStack.Navigator
						screenOptions={{ headerShown: false }}
						initialRouteName="Login"
					>
						<MainStack.Screen
							name="Registration"
							component={RegistrationScreen}
						/>
						<MainStack.Screen name="Login" component={LoginScreen} />
						<MainStack.Screen name="Home" component={Home} />
					</MainStack.Navigator>
				</NavigationContainer>
			</View>
		</TouchableWithoutFeedback>
	);
}
