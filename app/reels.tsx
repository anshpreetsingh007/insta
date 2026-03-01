import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BottomNav from "../components/BottomNav";

const { height: H } = Dimensions.get("window");
const HEADER_H = 56;
const NAV_H = 58;

const reels = [
  { id: "1", image: require("../assets/images/reels1.jpg"), title: "Reels 1" },
  { id: "2", image: require("../assets/images/reels2.jpg"), title: "Reels 2" },
  { id: "3", image: require("../assets/images/reels3.jpg"), title: "Reels 3" },
  { id: "4", image: require("../assets/images/reels4.jpg"), title: "Reels 4" },
  { id: "5", image: require("../assets/images/reels5.jpg"), title: "Reels 5" },
  { id: "6", image: require("../assets/images/reels6.jpg"), title: "Reels 6" },
];

export default function ReelsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reels</Text>
        <Ionicons name="camera-outline" size={22} color="#111" />
      </View>

      <FlatList
        data={reels}
        keyExtractor={(it) => it.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: NAV_H }}
        renderItem={({ item }) => (
          <View style={styles.reel}>
            <Image source={item.image} style={styles.reelImage} />

            {/* Right icons */}
            <View style={styles.rightActions}>
              <Pressable style={styles.actionBtn}>
                <Ionicons name="heart-outline" size={28} color="#fff" />
              </Pressable>

              <Pressable style={styles.actionBtn}>
                <Ionicons name="chatbubble-outline" size={26} color="#fff" />
              </Pressable>

              <Pressable style={styles.actionBtn}>
                <Ionicons name="paper-plane-outline" size={26} color="#fff" />
              </Pressable>
            </View>

            {/* Bottom text */}
            <View style={styles.bottomInfo}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
        )}
      />

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: HEADER_H,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  headerTitle: { fontSize: 24, fontWeight: "800" },

  reel: {
    height: H - HEADER_H,
    width: "100%",
    backgroundColor: "#000",
  },
  reelImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  rightActions: {
    position: "absolute",
    right: 12,
    bottom: 120,
    gap: 16,
    alignItems: "center",
  },
  actionBtn: { alignItems: "center" },

  bottomInfo: {
    position: "absolute",
    left: 12,
    bottom: 90,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
