import React, { useMemo } from "react";
import { View, StyleSheet, SafeAreaView, TextInput, FlatList, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { router } from "expo-router";
import { setPosts } from "../lib/postStore";

type GridItem = { id: string; uri: string };

export default function SearchScreen() {
  const data: GridItem[] = useMemo(
    () =>
      Array.from({ length: 45 }).map((_, i) => ({
        id: String(i + 1),
        uri: `https://picsum.photos/seed/explore-${i + 1}/800/800`,
      })),
    []
  );

  const posts = useMemo(
    () =>
      data.map((x) => ({
        id: x.id,
        uri: x.uri,
        username: "ootd_everyday",
        location: "Explore",
        caption: "Explore post ✨",
      })),
    [data]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color="#666" />
        <TextInput placeholder="Search with Meta AI" placeholderTextColor="#777" style={styles.searchInput} />
      </View>

      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.gridItem}
            onPress={() => {
              setPosts(posts);
              router.push({ pathname: "/page", params: { index: String(index) } });
            }}
          >
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
  gridItem: { flex: 1, aspectRatio: 1, marginBottom: GAP, backgroundColor: "#ddd" },
  gridImage: { width: "100%", height: "100%" },
});