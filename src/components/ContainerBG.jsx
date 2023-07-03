import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
export const ContainerBG = ({ children }) => {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/bg.jpg')}
				resizeMode="cover"
				style={styles.backgroundImg}
			>
				<SafeAreaView style={styles.container}>
					<View style={styles.inner}>{children}</View>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inner: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	backgroundImg: {
		flex: 1,
	},
});
