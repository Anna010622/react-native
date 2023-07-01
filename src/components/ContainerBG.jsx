import { ImageBackground, StyleSheet, View } from 'react-native';
export const ContainerBG = ({ children }) => {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/bg.jpg')}
				resizeMode="cover"
				style={styles.backgroundImg}
			>
				{children}
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundImg: {
		flex: 1,
		justifyContent: 'flex-end',
	},
});
