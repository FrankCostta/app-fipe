
import { StyleSheet, Text, View } from "react-native";
import ActionButton from "./ActionButton";

type Props = {
	data: any;
	enabled: boolean;
}

export default function ContentView({ data, enabled }: Props) {
  
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
			<ActionButton icon="picture" onPress={()=> alert("Indisponível")}/>
			<ActionButton icon="exclamationcircleo" onPress={()=> alert("Indisponível")} size={60} />
			<ActionButton icon="github" onPress={()=> alert("Indisponível")}/>
		</View>
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
	backgroundColor: "#a4a0ee",
	marginVertical: 16,
	borderRadius: 25,
  },
  price: {
	fontSize: 30,
	fontWeight: "bold",
	color: "#0f092d",
  },
  optionsBar: {
	height: "30%",
	flexDirection: "row",
	justifyContent: "space-evenly",
	alignItems: "center",
	backgroundColor: "#160e3b",
	borderRadius: 30,
  },
});