import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';

const ChallengeScreen = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [suggestion, setSuggestion] = useState('');

    // Define the email address as a constant
    const recipientEmail = 'shternrotem@gmail.com';

    const handleSend = () => {
        Alert.alert(
            "Email Sent (Simulated)",
            `To: ${recipientEmail}\n\nQuestion: ${question}\nAnswer: ${answer}\nSuggestion: ${suggestion}`,
            [{ text: "OK", onPress: () => {
                setQuestion('');
                setAnswer('');
                setSuggestion('');
            }}]
        );
    };

    return (
        <ImageBackground
          // To use a local image, change the source to: require('../../assets/your-background.png')
          source={require('../../assets/challenge_bg.png')}
          style={styles.container}
          resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>challenge</Text>
                <TextInput style={styles.inputLarge} placeholder="Question" value={question} onChangeText={setQuestion} multiline placeholderTextColor="#DDD" />
                <TextInput style={styles.inputLarge} placeholder="Answer" value={answer} onChangeText={setAnswer} multiline placeholderTextColor="#DDD" />
                <TextInput style={styles.inputLarge} placeholder="Suggested Answer" value={suggestion} onChangeText={setSuggestion} multiline placeholderTextColor="#DDD" />
                <Button title="Send Email" onPress={handleSend} />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent', // Removed the white overlay
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#FFFFFF', // Changed text to white for readability
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Added a shadow for better contrast
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    inputLarge: {
        height: 100,
        borderColor: '#FFFFFF', // Changed border to white
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        paddingTop: 10,
        borderRadius: 8,
        textAlignVertical: 'top',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Added a dark, semi-transparent background for inputs
        color: '#FFFFFF', // Changed text color to white
    },
});

export default ChallengeScreen;