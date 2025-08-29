
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalDropdown from "./ModalDropdown";
import SelectItem from "./SelectItem";

type Props = {
	data: any;
	enabled: boolean;
	label: string;
	onCodeSelect?: (code: string) => void;
}

export default function Dropdown({ data, enabled, label, onCodeSelect }: Props) {
	const [visible, setVisible] = useState(false);
	const [selectedLabel, setSelectedLabel] = useState("");
	const [search, setSearch] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		setFilteredData(data);
	}, [data]);

	const handleSearch = (text: string) => {
		setSearch(text);

		if (text === "") {
			setFilteredData(data);
		} else {
			const newData = data.filter((item: any) =>
				item.name.toLowerCase().includes(text.toLowerCase())
			);
			setFilteredData(newData);
		}
	}

	if (!enabled) {
		return (
			<View style={[styles.container, {backgroundColor: "#e0e7eb"}]}></View>
		);
	}

	return (
		<View>
			<TouchableOpacity 
				style={[styles.container, {borderColor: "#180f46"}]}
				onPress={() => setVisible(true)}
			>
				<Text style={styles.label}>
					{selectedLabel ? 
					(selectedLabel.includes("32000") ? "Zero Km" : selectedLabel )
					: label}
					</Text>
			</TouchableOpacity>

			<ModalDropdown
				isVisible={visible}
				onClose={() => setVisible(false)}
				title={label}
				onChange={(text: string) => handleSearch(text)}
				inputValue={search}
			>
				<FlatList 
					data={filteredData}
					keyExtractor={(item: any) => item.code.toString()}
					renderItem={({item}) => (
						<SelectItem
							label={item.name}
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
		borderColor: "#e0e7eb",
		borderRadius: 20,
	},
	label: {
		fontSize: 16,
		color: "#180f46",
		fontWeight: 500
	},
});