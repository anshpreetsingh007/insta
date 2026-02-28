import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getPosts, Post } from "../lib/postStore";

const { width } = Dimensions.get("window");

export default function PostViewer() {
  const { index } = useLocalSearchParams<{ index?: string }>();
  const startIndex = Math.max(0, Number(index ?? 0) || 0);

  const posts = useMemo(() => getPosts(), []);
  const listRef = useRef<FlatList<Post>>(null);

  const [activeIndex, setActiveIndex] = useState(startIndex);

  useEffect(() => {
    // Jump to tapped image
    if (posts.length > 0) {
      requestAnimationFrame(() => {
        listRef.current?.scrollToIndex({ index: startIndex, animated: false });
      });
    }
  }, [startIndex, posts.length]);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(newIndex);
  };

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

      {/* Top bar (Instagram-style) */}
      <View style={styles.topBar}>
        <Pressable style={styles.topBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#111" />
        </Pressable>

        <Text style={styles.topTitle}>Posts</Text>

        <View style={styles.topBtn} />
      </View>

      {/* Swipeable posts */}
      <FlatList
        ref={listRef}
        data={posts}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => <PostCard post={item} />}
      />

      {/* Optional: dots indicator */}
      <View style={styles.dots}>
        {posts.slice(0, 12).map((_, i) => (
          <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
        ))}
      </View>
    </SafeAreaView>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <View style={{ width, backgroundColor: "#fff" }}>
      {/* Post header */}
      <View style={styles.postHeader}>
        <View style={styles.postLeft}>
          <Image
            source={require("../assets/images/profile.png")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.postUsername}>{post.username ?? "ootd_everyday"}</Text>
            <Text style={styles.location}>{post.location ?? "via frenchie_fry39"}</Text>
          </View>
        </View>
        <Ionicons name="ellipsis-horizontal" size={20} color="#111" />
      </View>

      {/* Post image */}
      <Image source={{ uri: post.uri }} style={styles.postImage} />

      {/* Actions */}
      <View style={styles.actionsRow}>
        <View style={styles.actionsLeft}>
          <Ionicons name="heart-outline" size={26} color="#111" />
          <Ionicons name="chatbubble-outline" size={24} color="#111" />
          <Ionicons name="paper-plane-outline" size={24} color="#111" />
        </View>
        <Ionicons name="bookmark-outline" size={24} color="#111" />
      </View>

      {/* Caption */}
      <Text style={styles.caption}>
        <Text style={styles.bold}>{post.username ?? "frenchie_fry39"}</Text>{" "}
        {post.caption ?? "Fresh shot on a sunny day! ✨"}
      </Text>

      <View style={{ height: 40 }} />
    </View>
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
  topBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  topTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

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

  dots: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D0D0D0",
  },
  dotActive: {
    backgroundColor: "#111",
  },
});