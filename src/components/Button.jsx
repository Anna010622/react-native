import { Pressable, StyleSheet, Text } from 'react-native';

export const Button = ({ onPressFunction, text, disabled }) => {
	return (
		<Pressable
			onPress={onPressFunction}
			disabled={disabled}
			style={({ pressed }) => [
				{
					backgroundColor: pressed ? '#FF8C00' : '#FF6C00',
				},
				styles.btn,
				disabled && styles.btnDisabled,
			]}
		>
			<Text style={[styles.btnText, disabled && styles.btnTextDisabled]}>
				{text}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	btn: {
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 100,
	},
	btnDisabled: {
		backgroundColor: '#F6F6F6',
	},
	btnText: {
		color: '#ffffff',
		textAlign: 'center',
		fontFamily: 'Roboto-Regular',
	},
	btnTextDisabled: {
		color: '#BDBDBD',
	},
});
