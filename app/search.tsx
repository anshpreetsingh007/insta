import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import BottomNav from "../components/BottomNav";
import { setPosts } from "../lib/postStore";
import { imageMap } from "../lib/images";

type GridItem = { id: string; key?: string };

export default function SearchScreen() {
  const keys = ["reels1", "reels2", "reels3", "reels4", "reels5", "reels6"];

  
  const data: GridItem[] = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: String(i + 1),
        key: keys[i] ?? undefined,
      })),
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      {}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color="#666" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#777"
          style={styles.searchInput}
        />
      </View>

      {}
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
              setPosts(
                data.map((d) => ({
                  uri: d.key ? imageMap[d.key] : null,
                  id: d.id,
                  key: d.key,
                  source: d.key ? imageMap[d.key] : null,
                  username: "explore",
                  location: "",
                  caption: "",
                }))
              );
              router.push({ pathname: "/page", params: { index: String(index) } });
            }}
          >
            {item.key ? (
              <Image source={imageMap[item.key]} style={styles.gridImage} />
            ) : (
              <View style={styles.gridEmpty} />
            )}
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
  gridEmpty: { width: "100%", height: "100%", backgroundColor: "#e5e5e5" },
});