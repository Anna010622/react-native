import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
	const coords = route.params.coords;
	const name = route.params.name;

	return (
		<View style={styles.container}>
			<MapView
				style={styles.mapStyle}
				region={{
					latitude: coords.latitude,
					longitude: coords.longitude,
					latitudeDelta: 1,
					longitudeDelta: 1,
				}}
				mapType="standard"
				maxZoomLevel={10}
			>
				<Marker
					title={name}
					coordinate={{
						latitude: coords.latitude,
						longitude: coords.longitude,
					}}
				/>
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	mapStyle: {
		width: '100%',
		height: '100%',
	},
});

export default MapScreen;
