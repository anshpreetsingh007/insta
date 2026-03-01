import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BottomNav from "../components/BottomNav";

type TabKey = "grid" | "reels" | "tagged" | "saved";

const profileImage = require("../assets/images/profile.png");

const postImages = [
  require("../assets/images/reels1.jpg"),
  require("../assets/images/reels2.jpg"),
  require("../assets/images/reels3.jpg"),
  require("../assets/images/reels4.jpg"),
  require("../assets/images/reels5.jpg"),
  require("../assets/images/reels6.jpg"),
];

const highlightImages = [
  require("../assets/images/reels1.jpg"),
  require("../assets/images/reels2.jpg"),
  require("../assets/images/reels3.jpg"),
  require("../assets/images/reels4.jpg"),
  require("../assets/images/reels5.jpg"),
];

const followedByAvatar = require("../assets/images/reels6.jpg");

export default function ProfileScreen() {
  const [isFollowing, setIsFollowing] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("grid");

  const gridData = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: String(i + 1),
      source: postImages[i % postImages.length],
    }));
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* Top header */}
      <View style={styles.header}>
        <Pressable style={styles.headerIcon} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#111" />
        </Pressable>

        <Text style={styles.headerTitle}>karan__pabla</Text>

        <View style={styles.headerRight}>
          <Pressable style={styles.headerIcon} onPress={() => { }}>
            <Ionicons name="notifications-outline" size={22} color="#111" />
          </Pressable>
          <Pressable style={styles.headerIcon} onPress={() => { }}>
            <Ionicons name="ellipsis-horizontal" size={22} color="#111" />
          </Pressable>
        </View>
      </View>

      {/* Profile top block */}
      <View style={styles.topBlock}>
        <View style={styles.row}>
          {/* ✅ Profile photo */}
          <Image source={profileImage} style={styles.profilePhoto} />

          {/* Stats */}
          <View style={styles.stats}>
            <Stat value="2" label="posts" />
            <Stat value="475" label="followers" />
            <Stat value="427" label="following" />
          </View>
        </View>

        {/* Name + bio */}
        <View style={styles.bioBlock}>
          <Text style={styles.displayName}>ਕਰਨਦੀਪ ਸਿੰਘ</Text>

          <Text style={styles.bioLine}>Malwa belt 🚩</Text>
          <Text style={styles.bioLine}>
            Calgary 🇨🇦 <Text style={styles.link}>@sait</Text> 👨🏽‍💻
          </Text>
          <Text style={styles.bioLine}>🎓 PU</Text>
          <Text style={styles.bioLine}>📚 Mgc</Text>

          <Text style={styles.handle}>@ karan__pabla</Text>
        </View>

        {/* Followed by */}
        <View style={styles.followedByRow}>
          {/* ✅ Clickable avatar */}
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/profile",
                params: { user: "sahilpreetsingh__" },
              })
            }
          >
            <Image source={followedByAvatar} style={styles.followedAvatar} />
          </Pressable>

          <Text style={styles.followedText}>
            Followed by <Text style={styles.bold}>sahilpreetsingh__</Text>
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <Pressable
            style={[styles.bigBtn, isFollowing && styles.bigBtnActive]}
            onPress={() => setIsFollowing((v) => !v)}
          >
            <Text style={styles.bigBtnText}>
              {isFollowing ? "Following" : "Follow"}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#111" />
          </Pressable>

          <Pressable style={styles.bigBtn} onPress={() => router.replace("/send")}>
            <Text style={styles.bigBtnText}>Message</Text>
          </Pressable>
        </View>

        {/* Highlights (con imágenes) */}
        <View style={styles.highlightsRow}>
          {[
            { label: "👍🏻", img: highlightImages[0] },
            { label: "💸", img: highlightImages[1] },
            { label: "🇨🇦", img: highlightImages[2] },
            { label: "SAIT", img: highlightImages[3] },
            { label: "🙌🏻", img: highlightImages[4] },
          ].map((h, idx) => (
            <View key={idx} style={styles.highlightItem}>
              <Image source={h.img} style={styles.highlightCircle} />
              <Text style={styles.highlightLabel}>{h.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tabs row */}
      <View style={styles.tabRow}>
        <TabIcon
          active={activeTab === "grid"}
          onPress={() => setActiveTab("grid")}
          name="grid-outline"
        />
        <TabIcon
          active={activeTab === "reels"}
          onPress={() => setActiveTab("reels")}
          name="play-circle-outline"
        />
        <TabIcon
          active={activeTab === "tagged"}
          onPress={() => setActiveTab("tagged")}
          name="repeat-outline"
        />
        <TabIcon
          active={activeTab === "saved"}
          onPress={() => setActiveTab("saved")}
          name="person-outline"
        />
      </View>

      {/* Grid (con imágenes reales) */}
      <FlatList
        data={gridData}
        keyExtractor={(it) => it.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.gridRow}
        renderItem={({ item }) => (
          <Image source={item.source} style={styles.gridItem} />
        )}
      />

      {/* Bottom nav */}
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

function TabIcon({
  active,
  onPress,
  name,
}: {
  active: boolean;
  onPress: () => void;
  name: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <Pressable style={styles.tabBtn} onPress={onPress}>
      <Ionicons name={name} size={24} color={active ? "#111" : "#888"} />
      {active ? <View style={styles.tabUnderline} /> : <View style={styles.tabUnderlineOff} />}
    </Pressable>
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
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 28,
    fontWeight: "900",
    color: "#111",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  topBlock: {
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  profilePhoto: {
    width: 88,
    height: 88,
    borderRadius: 44,
    resizeMode: "cover",
  },

  stats: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: { alignItems: "center", minWidth: 70 },
  statValue: { fontSize: 22, fontWeight: "900", color: "#111" },
  statLabel: { marginTop: 2, fontSize: 16, color: "#111" },

  bioBlock: { marginTop: 10 },
  displayName: { fontSize: 18, fontWeight: "800", color: "#111", marginBottom: 6 },
  bioLine: { fontSize: 18, color: "#111", marginTop: 2 },
  link: { color: "#1D4ED8", fontWeight: "700" },
  handle: { marginTop: 12, fontSize: 22, fontWeight: "900", color: "#111" },

  followedByRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  followedAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    resizeMode: "cover",
  },
  followedText: { fontSize: 18, color: "#111" },
  bold: { fontWeight: "900" },

  btnRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
  },
  bigBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#EFEFEF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  bigBtnActive: { backgroundColor: "#EFEFEF" },
  bigBtnText: { fontSize: 18, fontWeight: "800", color: "#111" },

  highlightsRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  highlightItem: { alignItems: "center", width: 64 },
  highlightCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: "#DADADA",
    backgroundColor: "#F2F2F2",
    resizeMode: "cover",
  },
  highlightLabel: { marginTop: 8, fontSize: 16, color: "#111", fontWeight: "700" },

  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E6E6E6",
  },
  tabBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
  tabUnderline: {
    marginTop: 8,
    height: 2,
    width: 36,
    backgroundColor: "#111",
    borderRadius: 1,
  },
  tabUnderlineOff: {
    marginTop: 8,
    height: 2,
    width: 36,
    backgroundColor: "transparent",
  },

  gridContent: {
    paddingBottom: 58 + 16,
  },
  gridRow: { gap: GAP, paddingHorizontal: GAP },
  gridItem: {
    flex: 1,
    aspectRatio: 1,
    marginBottom: GAP,
    resizeMode: "cover",
  },
});