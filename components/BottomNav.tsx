import React from "react";
import { View, StyleSheet, Pressable, Image, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useColorScheme } from "react-native";

type Tab = {
  path: "/" | "/reels" | "/send" | "/search";
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
};

const tabs: Tab[] = [
  { path: "/", icon: "home-outline", iconActive: "home" },
  { path: "/reels", icon: "play-outline", iconActive: "play" },
  { path: "/send", icon: "paper-plane-outline", iconActive: "paper-plane" },
  { path: "/search", icon: "search-outline", iconActive: "search" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const bg = isDark ? "#000" : "#fff";
  const border = isDark ? "#111" : "#e5e5e5";
  const iconColor = isDark ? "#fff" : "#111";

  const isProfile = pathname === "/profile";

  return (
    <View style={[styles.bottomNav, { backgroundColor: bg, borderTopColor: border }]}>
      {tabs.map((t) => {
        const active = pathname === t.path;

        return (
          <Pressable
            key={t.path}
            style={styles.navBtn}
            onPress={() => router.replace(t.path)}
          >
            <Ionicons
              name={active ? t.iconActive : t.icon}
              size={30}
              color={iconColor}
            />
          </Pressable>
        );
      })}

      {/* Profile photo icon like Instagram */}
      <Pressable style={styles.navBtn} onPress={() => router.replace("/profile")}>
        <View
          style={[
            styles.profileWrap,
            {
              borderColor: iconColor,
              borderWidth: isProfile ? 2 : 0, // ring only when active
            },
          ]}
        >
          <Image
            source={require("../assets/images/profile.png")}
            style={styles.profileImg}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    height: 58,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: Platform.OS === "ios" ? 0 : 0,
  },
  navBtn: {
    width: 70,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
  },

  profileWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImg: {
    width: "100%",
    height: "100%",
  },
});