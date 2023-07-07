import { Pressable } from 'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Button } from '../components/Button';

const CreatePostsScreen = () => {
	const [isName, setIsName] = useState(false);
	const [isLocation, setIsLocation] = useState(false);

	const handlePublish = () => {
		console.log('publish');
	};

	return (
		<View style={styles.container}>
			<Pressable style={styles.imgContainer}>
				<View style={styles.iconContainer}>
					<MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
				</View>
			</Pressable>
			<Text style={styles.text}>Завантажте фото</Text>
			<TextInput
				placeholder="Назва"
				returnKeyType="next"
				onSubmitEditing={() => {
					secondTextInput.focus();
				}}
				blurOnSubmit={false}
				placeholderTextColor="#BDBDBD"
				onChangeText={text =>
					text.length === 0 ? setIsName(false) : setIsName(true)
				}
				style={[styles.input, !isName && styles.textPlaceholder]}
			/>
			<View style={styles.inputField}>
				<Feather name="map-pin" size={24} style={styles.inputIcon} />
				<TextInput
					placeholder="Місцевість..."
					ref={input => {
						secondTextInput = input;
					}}
					placeholderTextColor="#BDBDBD"
					onChangeText={text =>
						text.length === 0 ? setIsLocation(false) : setIsLocation(true)
					}
					style={[
						styles.input,
						!isLocation && styles.textPlaceholder,
						styles.inputTextWithIconLeft,
					]}
				/>
			</View>
			<Button
				text="Опубліковати"
				onPressFunction={handlePublish}
				disabled={true}
			/>
			<Pressable
				style={[styles.btnDelete, styles.btnDeleteDisable]}
				onPress={handlePublish}
				disabled={true}
			>
				<Feather
					name="trash-2"
					size={24}
					style={[styles.iconDeleteActive, styles.iconDeleteDisable]}
				/>
			</Pressable>
		</View>
	);
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 32,
		paddingBottom: 22,
		backgroundColor: '#FFFFFF',
	},
	imgContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 8,
		height: 240,
		backgroundColor: '#E8E8E8',
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 60,
		backgroundColor: '#FFFFFF',
		borderRadius: 50,
	},
	text: {
		marginBottom: 32,
		color: '#BDBDBD',
		fontFamily: 'Roboto-Regular',
		fontSize: 16,
	},
	input: {
		color: '#212121',
		fontFamily: 'Roboto-Medium',
		fontSize: 16,
		paddingTop: 16,
		paddingBottom: 15,
		borderBottomColor: '#E8E8E8',
		borderBottomWidth: 1,
	},
	inputField: {
		justifyContent: 'center',
		marginBottom: 32,
	},
	inputTextWithIconLeft: {
		paddingLeft: 28,
	},
	textPlaceholder: {
		fontFamily: 'Roboto-Regular',
	},
	inputIcon: {
		color: '#BDBDBD',
		position: 'absolute',
	},
	btnDelete: {
		marginTop: 'auto',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: 70,
		height: 40,
		borderRadius: 50,
		backgroundColor: '#FF6C00',
	},
	btnDeleteDisable: {
		backgroundColor: '#F6F6F6',
	},
	iconDeleteActive: {
		color: '#FFFFFF',
	},
	iconDeleteDisable: {
		color: '#BDBDBD',
	},
});
