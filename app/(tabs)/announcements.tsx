import React, { useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated, FlatList } from 'react-native';

const logo = require('../../assets/images/splash-icon.png');

export default function AnnouncementsScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image source={logo} style={[styles.logo, { opacity: fadeAnim }]} resizeMode="contain" />
      <Text style={styles.title}>Announcements</Text>
      <Button title="Create Announcement" onPress={() => {}} />
      <FlatList
        data={[]}
        renderItem={() => <Text style={styles.announcementItem}>[Announcement item]</Text>}
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={<Text style={styles.announcementItem}>No announcements yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 32,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  announcementItem: {
    fontSize: 15,
    color: '#444',
    marginVertical: 4,
  },
}); 