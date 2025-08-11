import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/bg_01.png')} // Or any other background you want
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.title}>About This App</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>
            You can add your content here.
          </Text>
          {/* Add more Text, Image, or other components as needed */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  contentContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 10,
  },
  contentText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24, // Improves readability
  },
});

export default AboutScreen;
