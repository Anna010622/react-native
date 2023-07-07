import * as React from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import MainNavigation from './src/navigation/MainNavigator';

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
				<MainNavigation />
			</View>
		</TouchableWithoutFeedback>
	);
}
