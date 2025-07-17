
import { Image, StyleSheet, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        style={styles.logo}
        source={require("@/assets/images/ui/logo_name.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#0F092D",
    width: "100%",
    height: 100,
    paddingVertical: 10,
  },
  logo: {
    width: 200,
    resizeMode: "contain",
  },
});
