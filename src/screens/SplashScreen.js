import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

// The component now accepts a prop called 'onVideoReady'
const SplashScreen = ({ onVideoReady }) => {
  useEffect(() => {
    console.log("LOG: Video Splash Screen has loaded.");
  }, []);

  return (
    <View style={styles.container}>
      {/* This View acts as the circular mask */}
      <View style={styles.videoContainer}>
        <Video
          source={require('../../assets/splash.mp4')}
          style={styles.video}
          resizeMode="cover"
          repeat={true}
          muted={true}
          // This function is called when the video is loaded and ready to play
          onLoad={onVideoReady}
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
    backgroundColor: '#fff', // Background for the whole screen
  },
  videoContainer: {
    width: 300, // The width of your circle
    height: 300, // The height of your circle
    borderRadius: 250, // This should be half of the width/height to make it a perfect circle
    overflow: 'hidden', // This is what clips the video into the circle shape
    backgroundColor: 'black', // Prevents a flash of color before the video loads
  },
  video: {
    width: '150%', // Makes the video fill the circular container
    height: '150%',
    left: '-25%',
    top: '-25%',
  },
});

export default SplashScreen;