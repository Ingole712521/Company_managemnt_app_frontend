import React, { useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';

const logo = require('../../assets/images/splash-icon.png');

export default function ProfileScreen() {
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
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>[User info here]</Text>
      <Button title="Edit Profile" onPress={() => {}} />
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
  info: {
    fontSize: 16,
    color: '#444',
    marginBottom: 16,
  },
}); 