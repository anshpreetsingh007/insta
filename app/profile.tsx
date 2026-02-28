import React, { useMemo, useState } from "react";
import { FlatList, Image, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { router } from "expo-router";
import { setPosts } from "../lib/postStore";

type GridItem = { id: string; uri: string };

export default function ProfileScreen() {
  const [role, setRole] = useState<"Member" | "Admin">("Member");

  const data: GridItem[] = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: String(i + 1),
        uri: `https://picsum.photos/seed/profile-${i + 1}/800/800`,
      })),
    []
  );

  const posts = useMemo(
    () =>
      data.map((x) => ({
        id: x.id,
        uri: x.uri,
        username: "ootd_everyday",
        location: "OOTD Everyday",
        caption: "Fit check! 🧢 You know we’ll hype you up.",
      })),
    [data]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Pressable style={styles.headerIcon} onPress={() => router.replace("/")}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>

        <Text style={styles.headerTitle}>Group Profile</Text>

        <Pressable style={styles.headerIcon} onPress={() => {}}>
          <Ionicons name="add" size={24} color="#111" />
        </Pressable>
      </View>

      <View style={styles.topBlock}>
        <View style={styles.row}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>OOTD</Text>
          </View>

          <View style={styles.stats}>
            <Stat label="Posts" value="53" />
            <Stat label="Members" value="12" />
            <Stat label="Admins" value="1" />
          </View>
        </View>

        <View style={styles.nameBlock}>
          <Text style={styles.groupName}>OOTD Everyday</Text>
          <Text style={styles.tagline}>Fit check! 🧢</Text>
          <Text style={styles.subTagline}>You know we’ll hype you up.</Text>
        </View>

        <Pressable
          style={styles.roleButton}
          onPress={() => setRole(role === "Member" ? "Admin" : "Member")}
        >
          <Text style={styles.roleButtonText}>{role}</Text>
          <Ionicons name="chevron-down" size={16} color="#111" />
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        numColumns={3}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const GAP = 2;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E6E6E6",
  },
  headerIcon: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: 22 },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 16, fontWeight: "700", color: "#111" },

  topBlock: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 10 },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },

  avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 3,
    borderColor: "#2F7BFF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF1FF",
  },
  avatarText: { fontWeight: "800", color: "#2F7BFF", fontSize: 14, letterSpacing: 0.5 },

  stats: { flex: 1, flexDirection: "row", justifyContent: "space-around" },
  stat: { alignItems: "center", minWidth: 70 },
  statValue: { fontSize: 16, fontWeight: "800", color: "#111" },
  statLabel: { fontSize: 12, color: "#6B6B6B", marginTop: 2 },

  nameBlock: { marginTop: 10 },
  groupName: { fontSize: 16, fontWeight: "800", color: "#111" },
  tagline: { marginTop: 4, fontSize: 13, fontWeight: "600", color: "#111" },
  subTagline: { marginTop: 2, fontSize: 13, color: "#444" },

  roleButton: {
    marginTop: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#fff",
  },
  roleButtonText: { fontSize: 13, fontWeight: "700", color: "#111" },

  gridContent: { paddingBottom: 58 + 16 },
  gridRow: { gap: GAP, paddingHorizontal: GAP },
  gridItem: { flex: 1, aspectRatio: 1, marginBottom: GAP, borderRadius: 2, overflow: "hidden", backgroundColor: "#F2F2F2" },
  gridImage: { width: "100%", height: "100%" },
});