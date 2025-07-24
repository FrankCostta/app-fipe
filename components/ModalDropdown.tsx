import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
	title: string;
	isVisible: boolean;
	onClose: () => void;
	children: React.ReactNode ;
}

export default function ModalDropdown({title, isVisible, onClose, children}: Props) {
	return (
		<Modal
			visible={isVisible}
			transparent={true}
			onRequestClose={onClose}
		>
			<View style={styles.container}>
				<View style={styles.content}>
					
					<Text style={styles.title}>{title}</Text>

					<View style={styles.scroll}>
						{children}
					</View>

					<View style={styles.closeButtonArea}>
						<TouchableOpacity onPress={onClose}>
							<Text style={styles.closeButton}>FECHAR</Text>
						</TouchableOpacity>
					</View>
				</View>	
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		backgroundColor: "#000a",
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		height: "95%",
		width: "90%",
		padding: 10,
		backgroundColor: "#ffffff"
	},
	title: {
		color: "#524c4c",
		borderBottomColor: "#c8c8ce",
		paddingTop: 6,
		borderBottomWidth: 3,
		fontSize: 22,
		fontWeight: "bold",
		height: 60,
		textAlign: "center",
		alignContent: "center"
	},
	closeButtonArea: {
		marginTop: 20,
		marginBottom: 10,
		alignItems: "flex-end"
	},
	closeButton: {
		width: 100,
		fontSize: 18,
		fontWeight: 'bold',
		color: '#df1414',
	},
	scroll: {
		overflow: "hidden",
		height: "85%",
	}
});