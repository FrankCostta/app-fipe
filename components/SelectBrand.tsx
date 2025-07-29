
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import imageUri from "../services/image-uri";


type Props = {
	//icon: string;
	label: string;
	onSelect: () => void;
	code: number;
}

export default function SelectBrand({label, code, onSelect}: Props) {
	return (
		<TouchableOpacity style={styles.container} onPress={onSelect}>
			<Image
				style={styles.icon}
				source={imageUri[code] || require("@/assets/images/ui/question.png")}
			/>
			<Text style={styles.label}>{label}</Text>
		</TouchableOpacity>
	);
}


const styles = StyleSheet.create({
	container: {
		height: 80,
		flexDirection: "row",
		padding: 10,
		borderBottomColor: "#c8c8ce",
		borderBottomWidth: 1,
		alignItems: "center"
	},
	icon: {
		resizeMode: "center",
		width: 50,
		height: 50,
		marginHorizontal: 20
	},
	label: {
		fontSize: 18,
		color: "#726a6a",
		marginLeft: 12,
	}
});