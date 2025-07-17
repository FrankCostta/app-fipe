




import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
	//icon: string;
	label: string;
	onSelect: () => void;

}

export default function SelectBrand({label, onSelect}: Props) {
	return (
		<TouchableOpacity style={styles.container} onPress={onSelect}>
			<Image
				style={styles.icon}
				source={require("@/assets/images/ui/question.png")}
			/>
			<Text style={styles.label}>{label}</Text>
		</TouchableOpacity>
	);
}


const styles = StyleSheet.create({
	container: {
		height: 80,
		flexDirection: "row",
		padding: 16,
		borderBottomColor: "#c8c8ce",
		borderBottomWidth: 1,
		alignItems: "center"
	},
	icon: {
		width: 40,
		height: 40,
		marginHorizontal: 20
	},
	label: {
		fontSize: 20,
		fontWeight: 400,
		color: "#6b6262"
	}
});