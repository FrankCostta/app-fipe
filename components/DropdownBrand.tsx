
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalDropdown from "./ModalDropdown";
import SelectBrand from "./SelectBrand";

type Props = {
	label: string;
	options: any;
	enabled: boolean;
	onCodeSelect?: (code: string) => void;
}

export default function DropdownBrand({ label, options, enabled, onCodeSelect }: Props) {
	const [visible, setVisible] = useState(false);
	const [selectedLabel, setSelectedLabel] = useState("");

	if (!enabled) {
		return (
			<View style={[styles.container, {backgroundColor: "#e0e7eb"}]}></View>
		);
	}

	return (
		<View>
			<TouchableOpacity 
				style={styles.container}
				onPress={() => {setVisible(true)}}
			>
				<Text style={styles.label}>{selectedLabel ? selectedLabel : label}</Text>
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
						<SelectBrand 
							label={item.name} 
							code={item.code}
							onSelect={() => {
								setVisible(false);
								setSelectedLabel(item.name);
								onCodeSelect && onCodeSelect(item.code);
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