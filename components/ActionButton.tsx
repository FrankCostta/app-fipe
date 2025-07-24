import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

type Props = {
  onPress: () => void;
  icon: any;
  size?: number;
};

export default function ActionButton({ icon, onPress, size}: Props) {
  return (
	<TouchableOpacity onPress={onPress}>
	  <AntDesign name={icon} size={size ? size : 34} color="white" />
	</TouchableOpacity>
  );
}
