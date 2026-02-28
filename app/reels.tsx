import { Text, View } from "react-native";
import BottomNav from "../components/BottomNav";

export default function ReelsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Reels (Coming soon)</Text>
      </View>
      <BottomNav />
    </View>
  );
}