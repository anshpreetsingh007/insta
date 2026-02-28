import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View
} from "react-native";
import BottomNav from "../components/BottomNav";

type GridItem = { id: string; uri: string };

export default function SearchScreen() {
  const data: GridItem[] = useMemo(
    () =>
      Array.from({ length: 45 }).map((_, i) => ({
        id: String(i + 1),
        uri: `https://picsum.photos/seed/explore-${i + 1}/700/700`,
      })),
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Search bar */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color="#666" />
        <TextInput
          placeholder="Search with Meta AI"
          placeholderTextColor="#777"
          style={styles.searchInput}
        />
      </View>

      {/* Explore grid */}
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        renderItem={({ item }) => (
          <Pressable style={styles.gridItem}>
            <Image source={{ uri: item.uri }} style={styles.gridImage} />
          </Pressable>
        )}
      />

      <BottomNav />
    </SafeAreaView>
  );
}

const GAP = 2;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  searchWrap: {
    margin: 12,
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 22,
    backgroundColor: "#F2F2F2",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14, color: "#111" },

  gridContent: { paddingBottom: 58 + 16 },
  gridRow: { gap: GAP, paddingHorizontal: GAP },
  gridItem: {
    flex: 1,
    aspectRatio: 1,
    marginBottom: GAP,
    backgroundColor: "#ddd",
  },
  gridImage: { width: "100%", height: "100%" },
});