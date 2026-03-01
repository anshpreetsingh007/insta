
import React, { useEffect, useMemo, useRef } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { getPosts, Post } from "../lib/postStore";

const { width } = Dimensions.get("window");

export default function Page() {
  const { index } = useLocalSearchParams<{ index?: string }>();
  const startIndex = Math.max(0, Number(index ?? 0) || 0);

  const posts = useMemo(() => getPosts(), []);
  const listRef = useRef<FlatList<Post>>(null);

  useEffect(() => {
    if (posts.length > 0) {
      requestAnimationFrame(() => {
        listRef.current?.scrollToIndex({ index: startIndex, animated: false });
      });
    }
  }, [startIndex, posts.length]);

  if (!posts || posts.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ padding: 16 }}>No posts loaded.</Text>
        <Pressable onPress={() => router.back()} style={{ padding: 16 }}>
          <Text>Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {}
      <View style={styles.topBar}>
        <Pressable style={styles.topBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#111" />
        </Pressable>

        <Text style={styles.topTitle}>Posts</Text>

        <View style={styles.topBtn} />
      </View>

      {}
      <FlatList
        ref={listRef}
        data={posts}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <View style={{ width, backgroundColor: "#fff" }}>
            {}
            <View style={styles.postHeader}>
              <View style={styles.postLeft}>
                <Image
                  source={require("../assets/images/profile.png")}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.postUsername}>
                    {item.username ?? "user"}
                  </Text>
                  <Text style={styles.location}>{item.location ?? " "}</Text>
                </View>
              </View>

              <Ionicons name="ellipsis-horizontal" size={20} color="#111" />
            </View>

            {}
            {item.source ? (
              <Image source={item.source} style={styles.postImage} />
            ) : item.uri ? (
              <Image source={{ uri: item.uri }} style={styles.postImage} />
            ) : (
              <View style={styles.placeholder} />
            )}

            {}
            <View style={styles.actionsRow}>
              <View style={styles.actionsLeft}>
                <Ionicons name="heart-outline" size={26} color="#111" />
                <Ionicons name="chatbubble-outline" size={24} color="#111" />
                <Ionicons name="paper-plane-outline" size={24} color="#111" />
              </View>
              <Ionicons name="bookmark-outline" size={24} color="#111" />
            </View>

            {}
            <Text style={styles.caption}>
              <Text style={styles.bold}>{item.username ?? "user"}</Text>{" "}
              {item.caption ?? ""}
            </Text>

            <View style={{ height: 40 }} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  topBar: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E6E6E6",
  },
  topBtn: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  topTitle: { flex: 1, textAlign: "center", fontSize: 16, fontWeight: "700", color: "#111" },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  postLeft: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  postUsername: { fontWeight: "700", color: "#111" },
  location: { fontSize: 12, color: "#666", marginTop: 1 },

  postImage: {
    width: "100%",
    height: 420,
    resizeMode: "cover",
    backgroundColor: "#eee",
  },
  placeholder: {
    width: "100%",
    height: 420,
    backgroundColor: "#e5e5e5",
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actionsLeft: { flexDirection: "row", gap: 14 },

  caption: { paddingHorizontal: 12, fontSize: 14, color: "#111" },
  bold: { fontWeight: "700" },
});