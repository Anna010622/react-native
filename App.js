import * as React from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import MainNavigation from './src/navigation/MainNavigator';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

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
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<MainNavigation />
			</PersistGate>
		</Provider>
	);
}
