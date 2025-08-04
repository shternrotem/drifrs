import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, firestore } from '../firebase/config';

const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [work, setWork] = useState('');
    const [position, setPosition] = useState('');
    const [education, setEducation] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        if (!email || !password || !name) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }
        auth().createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const uid = userCredentials.user.uid;
                return firestore().collection('users').doc(uid).set({
                    name, email, work, position, education
                });
            })
            .catch(error => Alert.alert("Sign Up Failed", error.message));
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Place of Work" value={work} onChangeText={setWork} />
            <TextInput style={styles.input} placeholder="Position" value={position} onChangeText={setPosition} />
            <TextInput style={styles.input} placeholder="Education Institute" value={education} onChangeText={setEducation} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Sign Up" onPress={handleSignUp} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8, borderRadius: 5 },
});

export default SignUpScreen;