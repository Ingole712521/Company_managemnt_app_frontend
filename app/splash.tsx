import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';

const logo = require('../assets/images/splash-icon.png'); // Use your provided logo

export default function SplashScreen() {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        router.replace('/login');
      }, 1200);
    });
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logo}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
}); 