
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionButton from "./ActionButton";
import ModalDescriptions from "./ModalDescriptions";
import WebModal from "./WebModal";

type Props = {
	data: any;
	enabled: boolean;
}

export default function ContentView({ data, enabled }: Props) {
	const [modalWebVisible, setModalWebVisible] = useState(false);
	const [modalDescVisible, setModalDescVisible] = useState(false);
	const [url, setUrl] = useState("");

	const setQuery = () => {
		let query = `${data.brand} ${data.model} ${data.modelYear}`.replaceAll(" ", "+");
		setUrl(`https://duckduckgo.com/?q=${query}&ia=images&iax=images`);
		setModalWebVisible(true);
	};
  
  if (!enabled) {
	return (
	  <View style={styles.container}>
		<View style={styles.disabled}></View>
	  </View>
	);
  }
  
  return (
	<View style={styles.container}>
		
		<View style={styles.priceArea}>
			<Text style={styles.price}>{data.price}</Text>
		</View>

		<View style={styles.optionsBar}>
			<ActionButton 
				icon="search1" 
				onPress={()=> setQuery()}
			/>
			<ActionButton icon="infocirlceo" onPress={()=> setModalDescVisible(true)} size={60} />
			<ActionButton icon="github" onPress={()=> alert("Indisponível")}/>
		</View>

		<ModalDescriptions 
			isVisible={modalDescVisible} 
			onClose={() => setModalDescVisible(false)}
		/>

		{/* Visualizador de pagina web para imagens do veículo selecionado */}
		<WebModal 
			 url={url}
			 visible={modalWebVisible}
			onClose={() => setModalWebVisible(false)} 
		/>

	</View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginHorizontal: 16,
  },
  disabled: {
    height: "70%",
	backgroundColor: "#e0e7eb",
	marginVertical: 16,
	borderRadius: 25,
  },
  priceArea: {
	height: "70%",
	justifyContent: "center",
	alignItems: "center",
	borderWidth: 8,
	borderColor: "#0f092d",
	marginVertical: 10,
	borderRadius: 20,
  },
  price: {
	fontSize: 34,
	fontWeight: 900,
	color: "#0fad0a",
  },
  optionsBar: {
	height: "30%",
	flexDirection: "row",
	justifyContent: "space-evenly",
	alignItems: "center",
	backgroundColor: "#160e3b",
	borderRadius: 20,
  },
});