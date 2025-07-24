



import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { RobotoCondensed_900Black } from "@expo-google-fonts/roboto-condensed/900Black";
import { useFonts } from "@expo-google-fonts/roboto-condensed/useFonts";

type Props = {
  label: string;
  onSelect: () => void;
  selected: boolean;
  icon: number;
};

export default function CategoryRadioButton({
  onSelect,
  selected,
  label,
  icon
}: Props) {

  let [fontsLoaded] = useFonts({
    RobotoCondensed_900Black,
  });
  if (!fontsLoaded) {
    return null;
  }

  const iconPath = [
    [
      require("@/assets/images/ui/motorcycles.png"),
      require("@/assets/images/ui/motorcycles-on.png")
    ],
    [
      require("@/assets/images/ui/cars.png"),
      require("@/assets/images/ui/cars-on.png")
    ],
    [
      require("@/assets/images/ui/trucks.png"),
      require("@/assets/images/ui/trucks-on.png")
    ],
  ]

  return (
    <TouchableOpacity onPress={onSelect} style={styles.container}>
      <View style={selected ? [styles.circle, {borderColor: "#0F092D"}]  : styles.circle}>
        <Image 
          source={selected ? iconPath[icon][1] : iconPath[icon][0]}
          style={styles.imgIcon}
        />
      </View>
      <Text style={selected ? [styles.label, {color: "#0F092D"}] : styles.label}>{label}</Text>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 130,
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 8,
    borderColor: "#a1a9ad",
    width: 90,
    height: 90,
    borderRadius: "50%",
  },
  imgIcon: {
    width: 64, 
    height: 64,
  },
  label: {
    fontSize: 16,
    fontWeight: "900",
    fontFamily: "RobotoCondensed_900Black",
    color: "#7E8589",
  },
});
