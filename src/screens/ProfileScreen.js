import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { auth, firestore } from '../firebase/config';

const ProfileScreen = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const user = auth().currentUser;
        if (user) {
            const subscriber = firestore().collection('users').doc(user.uid)
                .onSnapshot(documentSnapshot => {
                    setUserData(documentSnapshot.data());
                });
            
            // Stop listening for updates when no longer required
            return () => subscriber();
        }
    }, []);

    if (!userData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ImageBackground
          // To use a local image, change the source to: require('../../assets/your-background.png')
          source={require('../../assets/challenge_bg.png')}
          style={styles.container}
          resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Profile</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.profileText}>Name: {userData.name}</Text>
                    <Text style={styles.profileText}>Email: {userData.email}</Text>
                    <Text style={styles.profileText}>Place of Work: {userData.work}</Text>
                    <Text style={styles.profileText}>Position: {userData.position}</Text>
                    <Text style={styles.profileText}>Education: {userData.education}</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent', // Darker overlay for better text contrast
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    infoContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
        borderRadius: 10,
    },
    profileText: {
        fontSize: 18,
        marginBottom: 12,
        color: '#FFFFFF', // White text for readability
    },
});

export default ProfileScreen;