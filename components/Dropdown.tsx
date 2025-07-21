
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalDropdown from "./ModalDropdown";
import SelectItem from "./SelectItem";

type Props = {
	options: any;
	enabled: boolean;
	label: string;
	onCodeSelect?: (code: string) => void;
}

export default function Dropdown({ options, enabled, label, onCodeSelect }: Props) {
	const [visible, setVisible] = useState(false);
<<<<<<< HEAD
	const [lb, setLb] = useState(label);
=======
	const [lb, setLB] = useState(label);
>>>>>>> d175deb (.)

	if (!enabled) {
		return (
			<View style={[styles.container, {backgroundColor: "#e0e7eb"}]}></View>
		);
	}

	return (
		<View>
			<TouchableOpacity 
				style={styles.container}
				onPress={() => setVisible(true)}
			>
				<Text style={styles.label}>{lb}</Text>
			</TouchableOpacity>

			<ModalDropdown
				isVisible={visible}
				onClose={() => setVisible(false)}
				title={label}
			>
				<FlatList 
					data={options}
					keyExtractor={(item: any) => item.code}
					renderItem={({item}) => (
						<SelectItem
							label={item.name}
							onSelect={() => {
								setVisible(false);
								onCodeSelect && onCodeSelect(item.code);
<<<<<<< HEAD
								setLb(item.name);
=======
								setLB(item.name);
>>>>>>> d175deb (.)
							}}
						/>
					)}
				/>

			</ModalDropdown>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		height: 70,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 5,
		borderColor: "#a1a9ad",
		borderRadius: 20,
	},
	label: {
		fontSize: 18,
		color: "#4d4848",
	},
});