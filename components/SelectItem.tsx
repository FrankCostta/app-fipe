





import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
	label: string;
	onSelect: () => void;

}

export default function SelectItem({label, onSelect}: Props) {
	return (
		<TouchableOpacity style={styles.container} onPress={onSelect}>
			<Text style={styles.label}>{label.includes("32000") ? "Zero Km" : label}</Text>
		</TouchableOpacity>
	);
}


const styles = StyleSheet.create({
	container: {
		marginHorizontal: 8,
		height: 70,
		flexDirection: "row",
		padding: 16,
		borderBottomColor: "#e7e7ee",
		borderBottomWidth: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	label: {
		fontSize: 14,
		color: "#545457"
	}
});