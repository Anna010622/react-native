import { Pressable, StyleSheet, Text } from 'react-native';

export const Button = ({ onPressFunction, text }) => {
	return (
		<Pressable
			onPress={onPressFunction}
			style={({ pressed }) => [
				{
					backgroundColor: pressed ? '#FF8C00' : '#FF6C00',
				},
				styles.btn,
			]}
		>
			<Text style={styles.btnText}>{text}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	btn: {
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 100,
	},
	btnText: {
		color: '#ffffff',
		textAlign: 'center',
		fontFamily: 'Roboto-Regular',
	},
});
