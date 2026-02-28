import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import BottomNav from "../components/BottomNav";

type Thread = {
  id: string;
  name: string;
  status: string;
  avatar: string;
};

export default function SendScreen() {
  const [tab, setTab] = useState<"Primary" | "Requests" | "General">("Primary");

  const threads: Thread[] = useMemo(
    () =>
      [
        { name: "Karamdeep Singh", status: "Sent 56m ago" },
        { name: "Joti 🍁", status: "Active 7h ago" },
        { name: "infinity_pc_games", status: "Ok · 1w" },
        { name: "Mariano", status: "Sent last week" },
        { name: "Kuldeep Sanghera", status: "Active 3h ago" },
        { name: "Royal Enfield Exclusives ⚡", status: "On the road · 2w" },
      ].map((t, i) => ({
        id: String(i + 1),
        name: t.name,
        status: t.status,
        avatar: `https://picsum.photos/seed/dm-${i + 1}/200/200`,
      })),
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ansh__khaira</Text>
        <View style={styles.headerRight}>
          <Ionicons name="ellipsis-horizontal" size={22} color="#111" />
          <Ionicons name="create-outline" size={22} color="#111" />
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color="#666" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#777"
          style={styles.searchInput}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TabBtn label="Primary" active={tab === "Primary"} onPress={() => setTab("Primary")} />
        <TabBtn label="Requests" active={tab === "Requests"} onPress={() => setTab("Requests")} />
        <TabBtn label="General" active={tab === "General"} onPress={() => setTab("General")} />
      </View>

      {/* Threads */}
      <FlatList
        data={threads}
        keyExtractor={(it) => it.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 58 + 16 }}
        renderItem={({ item }) => (
          <Pressable style={styles.thread}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
            <Ionicons name="camera-outline" size={26} color="#777" />
          </Pressable>
        )}
      />

      <BottomNav />
    </SafeAreaView>
  );
}

function TabBtn({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabBtn, active && styles.tabBtnActive]}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 56,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 24, fontWeight: "800" },
  headerRight: { flexDirection: "row", gap: 16, alignItems: "center" },

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

  tabs: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#F2F2F2",
  },
  tabBtnActive: { backgroundColor: "#EDEDED" },
  tabText: { color: "#555", fontWeight: "700" },
  tabTextActive: { color: "#111" },

  thread: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  avatar: { width: 54, height: 54, borderRadius: 27, backgroundColor: "#ddd" },
  name: { fontSize: 16, fontWeight: "700" },
  status: { marginTop: 2, color: "#777" },
});