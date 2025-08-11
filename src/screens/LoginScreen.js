import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase/config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }
    auth().signInWithEmailAndPassword(email, password)
      .catch(error => Alert.alert("Login Failed", error.message));
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address to reset your password.");
      return;
    }

    auth().sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Password Reset Email Sent", "Please check your inbox to reset your password.");
      })
      .catch(error => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8, borderRadius: 5 },
  linkText: { color: '#007bff', marginTop: 15, textAlign: 'center' },
  linksContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LoginScreen;
