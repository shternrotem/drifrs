import React, { useState } from 'react';
import { Text, TouchableOpacity, SafeAreaView, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, firestore } from '../firebase/config';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(''); // <-- Add new state for phone number
    const [work, setWork] = useState('');
    const [education, setEducation] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        if (!email || !password || !name) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            Alert.alert(
                "Weak Password",
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            );
            return;
        }

        auth().createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                const uid = user.uid;

                // Send verification email
                user.sendEmailVerification();

                // Create user document in Firestore, including the phone number
                return firestore().collection('users').doc(uid).set({
                    name,
                    email,
                    phone, // <-- Add phone to the user data
                    work,
                    education
                });
            })
            .then(() => {
                // Log the user out and show a confirmation message
                auth().signOut();
                Alert.alert(
                    "Verification Email Sent",
                    "Please check your inbox and verify your email address before logging in."
                );
            })
            .catch(error => Alert.alert("Sign Up Failed", error.message));
    };

    // New handler to allow only numeric input for the phone number
    const handlePhoneChange = (text) => {
        const numericText = text.replace(/[^0-9]/g, '');
        setPhone(numericText);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            {/* Updated TextInput for phone number */}
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phone}
                onChangeText={handlePhoneChange} // Use the new handler
                keyboardType="phone-pad"
            />
            <TextInput style={styles.input} placeholder="Place of Work" value={work} onChangeText={setWork} />
            <TextInput style={styles.input} placeholder="Education Institute" value={education} onChangeText={setEducation} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Sign Up" onPress={handleSignUp} />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Have an account? Log In</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8, borderRadius: 5 },
    linkText: { color: '#007bff', marginTop: 15, textAlign: 'center' },
});

export default SignUpScreen;