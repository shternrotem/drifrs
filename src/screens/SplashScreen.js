// 1. Import the Image component from react-native
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

// 2. Remove the 'onVideoReady' prop as it's no longer needed for a static image
const SplashScreen = () => {
  useEffect(() => {
    // 3. Update the log message for clarity
    console.log("LOG: Image Splash Screen has loaded.");
  }, []);

  return (
    <View style={styles.container}>
      {/* This View still acts as the circular mask */}
      <View style={styles.imageContainer}>
        {/* 4. Replace the Video component with an Image component */}
        <Image
          // 5. Update the asset to an image file (e.g., .png or .jpg)
          source={require('../../assets/logo.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  // 6. Rename styles for clarity (optional but good practice)
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150, // Half of width/height for a perfect circle
    overflow: 'hidden', // Clips the image into the circle shape
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%', // Makes the image fill the circular container
    height: '100%',
  },
});

export default SplashScreen;