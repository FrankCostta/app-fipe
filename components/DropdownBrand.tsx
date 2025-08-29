
import imageUri from "@/services/image-uri";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalDropdown from "./ModalDropdown";
import SelectBrand from "./SelectBrand";

type Props = {
	data: any;
	label: string;
	enabled: boolean;
	onCodeSelect?: (code: string) => void;
}

export default function DropdownBrand({data, label, enabled, onCodeSelect }: Props) {
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
				onPress={() => {setVisible(true)}}
			>
				{ (selectedLabel) ? (
					<>
						<Image
							style={styles.icon}
							source={ 
								imageUri[data.find((item: any) => item.name === selectedLabel)?.code] || require("@/assets/images/ui/question.png")}
						/>
						<Text style={styles.label}>{selectedLabel}</Text>
					</>
				) : (
					<Text style={styles.label}>{label}</Text>
				)}
				
			</TouchableOpacity>

			<ModalDropdown
				isVisible={visible}
				onClose={() => setVisible(false)}
				title={label}
				inputValue={search}
				onChange={(text: any) => handleSearch(text)}
			>
				<FlatList 
					data={filteredData}
					keyExtractor={(item: any) => item.code.toString()}
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
		borderColor: "#e0e7eb",
		borderRadius: 20,
	},
	label: {
		fontSize: 18,
		color: "#180f46",
		fontWeight: 500,
	},
	icon: {
		resizeMode: "center",
		width: 50,
		height: 50,
		marginRight: 10,
	}
});