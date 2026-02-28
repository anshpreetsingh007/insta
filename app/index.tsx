import BottomNav from "@/components/BottomNav";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.topIcon} onPress={() => {}}>
          <Ionicons name="add" size={26} color="#111" />
        </Pressable>

        <Text style={styles.logo}>Instagram</Text>

        <Pressable style={styles.topIcon} onPress={() => {}}>
          <Ionicons name="heart-outline" size={26} color="#111" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesRow}
        >
          <Story
            label="Your story"
            img={require("../assets/images/profile.png")}
            showPlus
          />
          <Story label="randhawa_22" img={require("../assets/images/like1.jpg")} />
          <Story label="isa.sait.calgary" img={require("../assets/images/like2.jpg")} />
          <Story label="kirpal_sanghe" img={require("../assets/images/like3.jpg")} />
        </ScrollView>

        {/* Post header */}
        <View style={styles.postHeader}>
          <View style={styles.postLeft}>
            <Image
              source={require("../assets/images/profile.png")}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.postUsername}>ootd_everyday</Text>
              <Text style={styles.location}>via frenchie_fry39</Text>
            </View>
          </View>
          <Text style={styles.postMenu}>•••</Text>
        </View>

        {/* Post image */}
        <Image
          source={require("../assets/images/webdeb.png")}
          style={styles.postImage}
        />

        {/* Actions row */}
        <View style={styles.actionsRow}>
          <View style={styles.actionsLeft}>
            <Ionicons name="heart-outline" size={26} color="#111" />
            <Ionicons name="chatbubble-outline" size={24} color="#111" />
            <Ionicons name="paper-plane-outline" size={24} color="#111" />
          </View>

          <Ionicons name="bookmark-outline" size={24} color="#111" />
        </View>

        {/* Likes */}
        <View style={styles.likesRow}>
          <View style={styles.likesAvatars}>
            <Image
              source={require("../assets/images/like1.jpg")}
              style={styles.likeAvatar}
            />
            <Image
              source={require("../assets/images/like2.jpg")}
              style={styles.likeAvatarOverlap}
            />
            <Image
              source={require("../assets/images/like3.jpg")}
              style={styles.likeAvatarOverlap}
            />
          </View>

          <Text style={styles.likesText}>
            Liked by <Text style={styles.bold}>paisley.print.48</Text> and{" "}
            <Text style={styles.bold}>7 others</Text>
          </Text>
        </View>

        {/* Caption */}
        <Text style={styles.caption}>
          <Text style={styles.bold}>frenchie_fry39</Text> Fresh shot on a sunny
          day! ✨
        </Text>

        <Text style={styles.comments}>View all 12 comments</Text>

        <Text style={styles.comment}>
          <Text style={styles.bold}>lil_wyatt838</Text> Awesome tones
        </Text>

        <Text style={styles.comment}>
          <Text style={styles.bold}>pia.in.a.pod</Text> Love it! ❤️
        </Text>

        <Text style={styles.time}>1 day ago</Text>

        {/* Alert Button */}
        <Pressable
          style={styles.alertBtn}
          onPress={() =>
            Platform.OS === "web"
              ? window.alert("Alert Button pressed")
              : Alert.alert("Alert", "Alert Button pressed")
          }
        >
          <Text style={styles.alertBtnText}>Alert</Text>
        </Pressable>

        {/* Spacer so content doesn't hide behind nav */}
        <View style={{ height: 16 }} />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

function Story({
  label,
  img,
  showPlus,
}: {
  label: string;
  img: any;
  showPlus?: boolean;
}) {
  return (
    <View style={styles.story}>
      <View style={styles.storyRing}>
        <Image source={img} style={styles.storyImg} />
        {showPlus ? (
          <View style={styles.storyPlus}>
            <Ionicons name="add" size={14} color="#fff" />
          </View>
        ) : null}
      </View>
      <Text style={styles.storyLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  topBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  topIcon: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  logo: { fontSize: 26, fontWeight: "700" },

  scrollContent: { paddingBottom: 0 },

  storiesRow: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 12,
  },
  story: { width: 82, alignItems: "center" },
  storyRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: "#d62976",
    alignItems: "center",
    justifyContent: "center",
  },
  storyImg: { width: 56, height: 56, borderRadius: 28 },
  storyLabel: { marginTop: 6, fontSize: 12, maxWidth: 78 },
  storyPlus: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  postLeft: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postUsername: { fontWeight: "600" },
  location: { fontSize: 12, color: "#666" },
  postMenu: { fontSize: 20, letterSpacing: 2 },

  postImage: {
    width: "100%",
    height: 380,
    resizeMode: "cover",
    backgroundColor: "#e0e0e0",
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actionsLeft: { flexDirection: "row", gap: 14 },

  likesRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  likesAvatars: { flexDirection: "row", marginRight: 8 },
  likeAvatar: { width: 20, height: 20, borderRadius: 10 },
  likeAvatarOverlap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: -6,
  },
  likesText: { fontSize: 13 },

  caption: { paddingHorizontal: 12, marginTop: 4, fontSize: 13 },
  comments: { paddingHorizontal: 12, marginTop: 4, color: "#777", fontSize: 13 },
  comment: { paddingHorizontal: 12, marginTop: 2, fontSize: 13 },
  time: {
    paddingHorizontal: 12,
    marginTop: 6,
    fontSize: 11,
    color: "#999",
    marginBottom: 10,
  },
  bold: { fontWeight: "600" },

  alertBtn: {
    height: 50,
    marginHorizontal: 12,
    marginBottom: 6,
    borderRadius: 10,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  alertBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});