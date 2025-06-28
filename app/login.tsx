import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const logo = require('../assets/images/splash-icon.png');

export default function LoginScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

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
      <Text style={styles.title}>Kshan Tech Soft</Text>
      <Text style={styles.subtitle}>every MOMENT matters</Text>
      <TextInput style={styles.input} placeholder="Username or Email" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={() => router.replace('/(tabs)')} />
      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    color: '#0a7ea4',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  link: {
    color: '#0a7ea4',
    marginTop: 16,
    textAlign: 'center',
  },
}); 