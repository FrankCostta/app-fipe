import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
	title: string;
	isVisible: boolean;
	onClose: () => void;
	inputValue: string;
	onChange: any;
	children: React.ReactNode ;
}

export default function ModalDropdown({
	title,
	isVisible, 
	onClose, 
	inputValue = "",
	onChange, 
	children}: Props) {

	return (
		<Modal
			visible={isVisible}
			transparent={true}
			onRequestClose={onClose}
		>
			<View style={styles.container}>
				<View style={styles.content}>
					
					<View style={styles.header}>
						<Text style={styles.title}>{title}</Text>

						<View style={styles.searchBar}>
							<AntDesign name="search1" size={22} color="#666" />
							<TextInput
								style={styles.input}
								value={inputValue}
								onChangeText={onChange}
							/>
						</View>
					</View>

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
		backgroundColor: "#ffffff",
	},
	header: {
		alignItems: "center",
	},
	title: {
		color: "#524c4c",
		fontSize: 22,
		fontWeight: "bold",
		textAlign: "center",
		alignContent: "center"
	},
	searchBar: {
		width: "80%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: "#aaa",
		width: "100%",
		marginHorizontal: 6,
		fontSize: 16,
		color: "#888"
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
		height: "82%",
	}
});