

import { AntDesign } from "@expo/vector-icons";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
	isVisible: boolean;
	onClose: () => void;
}

export default function ModalDescriptions({isVisible, onClose}: Props) {
	return (
		<Modal
			visible={isVisible}
			transparent={true}
			onRequestClose={onClose}
		>
			<View style={styles.marginModal}>
				<View style={styles.container}>

				</View>
				<TouchableOpacity onPress={onClose} style={styles.buttonClose}>
					<AntDesign name="close" size={40} color="white" />
				</TouchableOpacity>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	marginModal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0029"
	},
	container: {
		width: '90%',
		height: "70%",
		backgroundColor: '#fff',
		borderRadius: 16,
	},
	buttonClose: {
		marginTop: 20,
		width: 60,
		height: 60,
		borderRadius: "50%",
		backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
	},

});