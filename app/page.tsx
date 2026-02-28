// app/index.tsx
import { router } from "expo-router";
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
      {/* Top bar with back arrow and title */}
      <View style={styles.topBar}>
        <Text style={styles.backIcon}>‹</Text>

        <View style={styles.titleWrapper}>
          <Text style={styles.headerUsername}>OOTD_EVERYDAY</Text>
          <Text style={styles.headerTitle}>Posts</Text>
        </View>

        {/* Spacer to keep title centered */}
        <View style={{ width: 24 }} />
      </View>

      {/* Main scroll content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Post header */}
        <View style={styles.postHeader}>
          <View style={styles.postLeft}>
            {/* Profile image */}
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
            <Text style={styles.actionIcon}>♡</Text>
            <Text style={styles.actionIcon}>🗨</Text>
            <Text style={styles.actionIcon}>➢</Text>
          </View>

          <Text style={styles.bookmarkIcon}>🔖</Text>
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

        {/* Comments */}
        <Text style={styles.comments}>View all 12 comments</Text>

        <Text style={styles.comment}>
          <Text style={styles.bold}>lil_wyatt838</Text> Awesome tones
        </Text>

        <Text style={styles.comment}>
          <Text style={styles.bold}>pia.in.a.pod</Text> Love it! ❤️
        </Text>

        <Text style={styles.time}>1 day ago</Text>
      </ScrollView>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <Pressable onPress={() => router.replace("/")}>
          <Text style={styles.navIcon}>⌂</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/search")}>
          <Text style={styles.navIcon}>⌕</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/send")}>
          <Text style={styles.navIcon}>＋</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/reels")}>
          <Text style={styles.navIcon}>▶</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/profile")}>
          <Text style={styles.navIcon}>●</Text>
        </Pressable>
      </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    paddingBottom: 20,
  },

  topBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  backIcon: {
    fontSize: 28,
  },
  titleWrapper: {
    alignItems: "center",
  },
  headerUsername: {
    fontSize: 12,
    color: "#777",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  postLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  postUsername: {
    fontWeight: "600",
  },
  location: {
    fontSize: 12,
    color: "#666",
  },
  postMenu: {
    fontSize: 20,
    letterSpacing: 2,
  },

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
  actionsLeft: {
    flexDirection: "row",
  },
  actionIcon: {
    fontSize: 22,
    marginRight: 14,
  },
  bookmarkIcon: {
    fontSize: 20,
  },

  likesRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  likesAvatars: {
    flexDirection: "row",
    marginRight: 8,
  },
  likeAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  likeAvatarOverlap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: -6,
  },

  likesText: {
    fontSize: 13,
  },

  caption: {
    paddingHorizontal: 12,
    marginTop: 4,
    fontSize: 13,
  },
  comments: {
    paddingHorizontal: 12,
    marginTop: 4,
    color: "#777",
    fontSize: 13,
  },
  comment: {
    paddingHorizontal: 12,
    marginTop: 2,
    fontSize: 13,
  },
  time: {
    paddingHorizontal: 12,
    marginTop: 6,
    fontSize: 11,
    color: "#999",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "600",
  },

  bottomNav: {
    height: 58,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
  },
  navIcon: {
    fontSize: 22,
  },

  alertBtn: {
    height: 50,
    marginHorizontal: 12,
    marginBottom: 6,
    borderRadius: 10,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  alertBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});