import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, ImageBackground, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { auth, firestore } from '../firebase/config';

const ProfileScreen = () => {
    const [userData, setUserData] = useState(null);
    const [editableData, setEditableData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = auth().currentUser;
        if (user) {
            const subscriber = firestore().collection('users').doc(user.uid)
                .onSnapshot(documentSnapshot => {
                    const data = documentSnapshot.data();
                    setUserData(data);
                    setEditableData(data);
                    setIsLoading(false);
                });

            return () => subscriber();
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            setIsEditMode(false);
            setEditableData(userData);
        }, [userData])
    );

    const handleSave = () => {
        const user = auth().currentUser;
        if (user && editableData) {
            firestore().collection('users').doc(user.uid).update(editableData)
                .then(() => {
                    Alert.alert("Success", "Profile updated successfully!");
                    setIsEditMode(false);
                })
                .catch(error => {
                    Alert.alert("Error", "Could not update profile. " + error.message);
                });
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('../../assets/bg_01.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.overlay}>
                <Text style={styles.title}>Profile</Text>

                {isEditMode ? (
                    // EDIT MODE VIEW
                    <View style={styles.infoContainer}>
                        <View style={styles.profileFieldContainer}>
                            <Text style={styles.profileLabel}>Name:</Text>
                            <View style={styles.profileValueContainer}>
                                <TextInput style={styles.editInput} value={editableData?.name} onChangeText={(text) => setEditableData({ ...editableData, name: text })} />
                            </View>
                        </View>
                        <View style={styles.profileFieldContainer}>
                            <Text style={styles.profileLabel}>Email:</Text>
                            <View style={styles.profileValueContainer}>
                                <TextInput style={styles.editInput} value={editableData?.email} onChangeText={(text) => setEditableData({ ...editableData, email: text })} keyboardType="email-address" />
                            </View>
                        </View>
                        <View style={styles.profileFieldContainer}>
                            <Text style={styles.profileLabel}>Place of Work:</Text>
                            <View style={styles.profileValueContainer}>
                                <TextInput style={styles.editInput} value={editableData?.work} onChangeText={(text) => setEditableData({ ...editableData, work: text })} />
                            </View>
                        </View>
                        <View style={styles.profileFieldContainer}>
                            <Text style={styles.profileLabel}>Position:</Text>
                            <View style={styles.profileValueContainer}>
                                <TextInput style={styles.editInput} value={editableData?.position} onChangeText={(text) => setEditableData({ ...editableData, position: text })} />
                            </View>
                        </View>
                        <View style={styles.profileFieldContainer}>
                            <Text style={styles.profileLabel}>Education:</Text>
                            <View style={styles.profileValueContainer}>
                                <TextInput style={styles.editInput} value={editableData?.education} onChangeText={(text) => setEditableData({ ...editableData, education: text })} />
                            </View>
                        </View>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.customButton} onPress={handleSave}>
                                <Text style={styles.customButtonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logOutButton} onPress={() => setIsEditMode(false)}>
                                <Text style={styles.logOutButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.infoContainer}>
                        <View style={styles.profileFieldContainer}>
                            <Text style={styles.profileLabel}>Name:</Text>
                            <View style={styles.profileValueContainer}>
                                <Text style={styles.profileValue}>{userData?.name}</Text>
                            </View>
                        </View>
                        <View style={styles.profileFieldContainer}>
                            <Text style={styles.profileLabel}>Email:</Text>
                            <View style={styles.profileValueContainer}>
                                <Text style={styles.profileValue}>{userData?.email}</Text>
                            </View>
                        </View>
                        <View style={styles.profileFieldContainer}>
                            <Text style={styles.profileLabel}>Place of Work:</Text>
                            <View style={styles.profileValueContainer}>
                                <Text style={styles.profileValue}>{userData?.work}</Text>
                            </View>
                        </View>
                        <View style={styles.profileFieldContainer}>
                            <Text style={styles.profileLabel}>Position:</Text>
                            <View style={styles.profileValueContainer}>
                                <Text style={styles.profileValue}>{userData?.position}</Text>
                            </View>
                        </View>
                        <View style={styles.profileFieldContainer}>
                            <Text style={styles.profileLabel}>Education:</Text>
                            <View style={styles.profileValueContainer}>
                                <Text style={styles.profileValue}>{userData?.education}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.customButton} onPress={() => setIsEditMode(true)}>
                            <Text style={styles.customButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logOutButton} onPress={() => auth().signOut()}>
                            <Text style={styles.logOutButtonText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    overlay: { flexGrow: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 16 },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#FFFFFF', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 },
    infoContainer: { backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 20, borderRadius: 10 },
    profileFieldContainer: {
        marginBottom: 15,
    },
    profileLabel: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    profileValueContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 12,
        borderRadius: 22,
    },
    profileValue: {
        fontSize: 16,
        color: '#000',
        paddingVertical: 12,
    },
    editInput: {
        fontSize: 16,
        color: '#000',
        paddingVertical: 12,
    },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
    customButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 22,
        alignSelf: 'center',
        marginTop: 20,
    },
    logOutButton: {
        backgroundColor: '#ff0000ff',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 22,
        alignSelf: 'center',
        marginTop: 20,
    },
    customButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logOutButtonText: {
        color: '#ffffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default ProfileScreen;