import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen = () => {
  useEffect(() => {
    console.log("LOG: Splash Screen has loaded.");
  }, []);

  return (
    <View style={styles.container}>
      {}
      <Image
        source={require('../../assets/logo.png')}
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
