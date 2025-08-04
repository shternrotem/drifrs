import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
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
            
            return () => subscriber();
        }
    }, []);

    if (!userData) {
        return <View style={styles.container}><ActivityIndicator /></View>;
    }

    return (
        <View style={styles.profileContainer}>
            <Text style={styles.profileText}>Name: {userData.name}</Text>
            <Text style={styles.profileText}>Email: {userData.email}</Text>
            <Text style={styles.profileText}>Place of Work: {userData.work}</Text>
            <Text style={styles.profileText}>Position: {userData.position}</Text>
            <Text style={styles.profileText}>Education: {userData.education}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    profileContainer: { flex: 1, padding: 20 },
    profileText: { fontSize: 18, marginBottom: 10 },
});

export default ProfileScreen;