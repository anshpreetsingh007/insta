import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function BottomNav() {
  return (
    <View style={styles.bottomNav}>
      <Pressable onPress={() => router.replace('/')}>
        <Text style={styles.navIcon}>⌂</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/search')}>
        <Text style={styles.navIcon}>⌕</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/send')}>
        <Text style={styles.navIcon}>＋</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/reels')}>
        <Text style={styles.navIcon}>▶</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/profile')}>
        <Text style={styles.navIcon}>●</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    height: 58,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  navIcon: {
    fontSize: 22,
  },
});