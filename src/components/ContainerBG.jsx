import { Image, ImageBackground, ScrollView, View } from 'react-native';
export const ContainerBG = ({ children }) => {
	return (
		<View style={{ flex: 1 }}>
			<ImageBackground
				source={require('../assets/bg.jpg')}
				resizeMode="cover"
				style={{
					flex: 1,
					justifyContent: 'flex-end',
				}}
			>
				{children}
			</ImageBackground>
		</View>
	);
};
