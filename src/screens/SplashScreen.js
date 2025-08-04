import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen = () => {
  // This useEffect hook will run once when the component is first rendered.
  useEffect(() => {
    console.log("LOG: Splash Screen has loaded.");
  }, []);

  return (
    <View style={styles.container}>
      {/* 1. Create an 'assets' folder in the root of your project.
        2. Place your logo image file (e.g., 'logo.png') inside it.
        3. The 'require' path below should point to that image.
      */}
      <Image
        source={require('../../assets/logo.png')} // <-- UPDATED LINE
        style={styles.logo}
      />
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 200, height: 200, marginBottom: 20, resizeMode: 'contain' }, // Added resizeMode
});

export default SplashScreen;
