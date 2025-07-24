





import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
	label: string;
	onSelect: () => void;

}

export default function SelectItem({label, onSelect}: Props) {
	return (
		<TouchableOpacity style={styles.container} onPress={onSelect}>
			<Text style={styles.label}>{label !== "32000" ? label : "Zero KM"}</Text>
		</TouchableOpacity>
	);
}


const styles = StyleSheet.create({
	container: {
		height: 70,
		flexDirection: "row",
		padding: 16,
		borderBottomColor: "#c8c8ce",
		borderBottomWidth: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	label: {
		fontSize: 14,
		color: "#6e6666"
	}
});