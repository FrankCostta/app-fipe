








import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalDropdown from "./ModalDropdown";
import SelectBrand from "./SelectBrand";

type Props = {
	options: any;
	enabled: boolean;
	onSelect: (code: string) => void;
	label: string;
}

export default function DropdownBrand({ options, enabled, label, onSelect }: Props) {
	const [visible, setVisible] = useState(false);

	if (!enabled) {
		return (
			<View style={[styles.container, {borderColor: "#a1a9ad", backgroundColor: "#e0e7eb"}]}></View>
		);
	}

	return (
		<View>
			<TouchableOpacity 
				style={styles.container}
				onPress={() => setVisible(true)}
			>
				<Text style={styles.label}>{label}</Text>
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
							onSelect={() => {
								onSelect(item.code);
								setVisible(false);
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
		marginVertical: 14,
		height: 80,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 5,
		borderColor: "#0F092D",
		borderRadius: 20,
	},
	img: {
		width: 30,
		height: 30,
		marginRight: 10,
	},
	label: {
		fontSize: 18,
		color: "#4d4848"
	},
});