import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import BottomNav from "../components/BottomNav";

const { height: H, width: W } = Dimensions.get("window");

const NAV_H = 58;

const REEL_H = H - NAV_H;

type Reel = {
  id: string;
  image: any;
  username: string;
  caption: string;
  audio: string;
};

const reelsSeed: Reel[] = [
  {
    id: "1",
    image: require("../assets/images/reels1.jpg"),
    username: "karan__pabla",
    caption: "Fresh fit check 🔥",
    audio: "Original audio • karan__pabla",
  },
  {
    id: "2",
    image: require("../assets/images/reels2.jpg"),
    username: "ootd_everyday",
    caption: "the goat 🐐",
    audio: "Original audio • ootd_everyday",
  },
  {
    id: "3",
    image: require("../assets/images/reels3.jpg"),
    username: "sahilpreetsingh__",
    caption: "perfect dunk 🏀",
    audio: "Original audio • sahilpreetsingh__",
  },
  {
    id: "4",
    image: require("../assets/images/reels4.jpg"),
    username: "joti🍁",
    caption: "messi ⚽",
    audio: "Original audio • joti🍁",
  },
  {
    id: "5",
    image: require("../assets/images/reels5.jpg"),
    username: "infinity_pc_games",
    caption: "fast 😎",
    audio: "Original audio • infinity_pc_games",
  },
  {
    id: "6",
    image: require("../assets/images/reels6.jpg"),
    username: "royal_enfield",
    caption: "hitting the road ⚡",
    audio: "Original audio • royal_enfield",
  },
];

export default function ReelsScreen() {
  const listRef = useRef<FlatList<Reel>>(null);

  const reels = useMemo(() => reelsSeed, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(false);

  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [likeCount, setLikeCount] = useState<Record<string, number>>(() =>
    Object.fromEntries(reels.map((r, i) => [r.id, 1200 + i * 137]))
  );

  
  const [paused, setPaused] = useState<Record<string, boolean>>({});

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (!viewableItems?.length) return;
      const first = viewableItems[0];
      if (first?.index != null) setActiveIndex(first.index);
    }
  ).current;

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = !prev[id];
      setLikeCount((c) => ({
        ...c,
        [id]: Math.max(0, (c[id] ?? 0) + (next ? 1 : -1)),
      }));
      return { ...prev, [id]: next };
    });
  };

  const togglePause = (id: string) => {
    setPaused((p) => ({ ...p, [id]: !p[id] }));
  };

  return (
    <SafeAreaView style={styles.safe}>
      {}
      <View style={styles.overlayHeader}>
        <Text style={styles.overlayTitle}>Reels</Text>

        <View style={styles.overlayRight}>
          <Pressable
            onPress={() => setMuted((m) => !m)}
            style={styles.iconBtn}
          >
            <Ionicons
              name={muted ? "volume-mute-outline" : "volume-high-outline"}
              size={22}
              color="#fff"
            />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Camera", "Camera pressed")}
            style={styles.iconBtn}
          >
            <Ionicons name="camera-outline" size={22} color="#fff" />
          </Pressable>
        </View>
      </View>

      <FlatList
        ref={listRef}
        data={reels}
        keyExtractor={(it) => it.id}
        showsVerticalScrollIndicator={false}
        snapToInterval={REEL_H}
        decelerationRate="fast"
        disableIntervalMomentum
        snapToAlignment="start"
        contentContainerStyle={{ paddingBottom: NAV_H }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => {
          const isLiked = !!liked[item.id];
          const isPaused = !!paused[item.id];
          const count = likeCount[item.id] ?? 0;

          return (
            <View style={[styles.reel, { height: REEL_H }]}>
              {}
              <Pressable
                style={StyleSheet.absoluteFill}
                onPress={() => togglePause(item.id)}
              >
                <Image source={item.image} style={styles.reelImage} />
              </Pressable>

              {}
              {isPaused ? (
                <View style={styles.pauseOverlay}>
                  <Ionicons name="pause" size={44} color="#fff" />
                </View>
              ) : null}

              {}
              <View style={styles.rightActions}>
                <Pressable
                  style={styles.actionBtn}
                  onPress={() => toggleLike(item.id)}
                >
                  <Ionicons
                    name={isLiked ? "heart" : "heart-outline"}
                    size={34}
                    color={isLiked ? "#ff2d55" : "#fff"}
                  />
                  <Text style={styles.actionText}>{count.toLocaleString()}</Text>
                </Pressable>

                <Pressable
                  style={styles.actionBtn}
                  onPress={() => Alert.alert("Comments", "Open comments")}
                >
                  <Ionicons name="chatbubble-outline" size={32} color="#fff" />
                  <Text style={styles.actionText}>Comment</Text>
                </Pressable>

                <Pressable
                  style={styles.actionBtn}
                  onPress={() => Alert.alert("Share", "Share pressed")}
                >
                  <Ionicons name="paper-plane-outline" size={32} color="#fff" />
                  <Text style={styles.actionText}>Share</Text>
                </Pressable>

                <Pressable
                  style={styles.actionBtn}
                  onPress={() => Alert.alert("More", "More options")}
                >
                  <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
                </Pressable>
              </View>

              {/* Bottom info like IG */}
              <View style={styles.bottomInfo}>
                <View style={styles.userRow}>
                  <View style={styles.smallAvatar} />
                  <Text style={styles.username}>{item.username}</Text>

                  <FollowBtn />
                </View>

                <Text style={styles.caption} numberOfLines={2}>
                  {item.caption}
                </Text>

                <View style={styles.audioRow}>
                  <Ionicons name="musical-notes" size={14} color="#fff" />
                  <Text style={styles.audioText} numberOfLines={1}>
                    {muted ? "Muted" : item.audio}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />

      <BottomNav />
    </SafeAreaView>
  );
}

function FollowBtn() {
  const [following, setFollowing] = useState(false);

  return (
    <Pressable
      onPress={() => setFollowing((v) => !v)}
      style={[styles.followBtn, following && styles.followBtnFollowing]}
    >
      <Text style={[styles.followText, following && styles.followTextFollowing]}>
        {following ? "Following" : "Follow"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },

  overlayHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    zIndex: 50,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  overlayTitle: { fontSize: 22, fontWeight: "900", color: "#fff" },
  overlayRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  reel: {
    width: "100%",
    backgroundColor: "#000",
  },
  reelImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  pauseOverlay: {
    position: "absolute",
    top: "45%",
    alignSelf: "center",
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  rightActions: {
    position: "absolute",
    right: 12,
    bottom: 130,
    gap: 18,
    alignItems: "center",
  },
  actionBtn: { alignItems: "center" },
  actionText: {
    marginTop: 4,
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  bottomInfo: {
    position: "absolute",
    left: 12,
    right: 90,
    bottom: 90,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  username: { color: "#fff", fontSize: 14, fontWeight: "800" },

  followBtn: {
    marginLeft: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#fff",
  },
  followBtnFollowing: {
    borderColor: "rgba(255,255,255,0.5)",
  },
  followText: { color: "#fff", fontWeight: "800", fontSize: 12 },
  followTextFollowing: { color: "rgba(255,255,255,0.85)" },

  caption: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },

  audioRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  audioText: { color: "#fff", fontSize: 12, fontWeight: "600" },
});