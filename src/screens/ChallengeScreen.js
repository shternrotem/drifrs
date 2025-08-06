import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { openComposer } from 'react-native-email-link';

const ChallengeScreen = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [emailSent, setEmailSent] = useState(false); // State to track if email was sent

    // Define the email address as a constant
    const recipientEmail = 'shternrotem@gmail.com';

    const handleSend = async () => {
        // Construct the email body
        const emailBody = `
            Question:
            ${question}

            Answer:
            ${answer}

            Suggested Answer:
            ${suggestion}
        `;

        try {
            // Open the user's default email app
            await openComposer({
                to: recipientEmail,
                subject: 'App Challenge Feedback',
                body: emailBody,
            });
            
            // Clear the fields and show the thank you message
            setQuestion('');
            setAnswer('');
            setSuggestion('');
            setEmailSent(true);

        } catch (error) {
            // Handle cases where the user has no email app installed
            Alert.alert("Error", "Could not open email client. Please make sure you have an email app installed.");
            console.error('Failed to open email client:', error);
        }
    };

    // Function to reset the form
    const handleSendAnother = () => {
        setEmailSent(false);
    };

    return (
        <ImageBackground
          source={require('../../assets/challenge_bg.png')}
          style={styles.container}
          resizeMode="cover"
        >
            <View style={styles.overlay}>
                {emailSent ? (
                    <View style={styles.thankYouContainer}>
                        <Text style={styles.thankYouText}>Thank you for your feedback!</Text>
                        <Button title="Send Another" onPress={handleSendAnother} />
                    </View>
                ) : (
                    <>
                        <Text style={styles.title}>challenge</Text>
                        <TextInput style={styles.inputLarge} placeholder="Question" value={question} onChangeText={setQuestion} multiline placeholderTextColor="#DDD" />
                        <TextInput style={styles.inputLarge} placeholder="Answer" value={answer} onChangeText={setAnswer} multiline placeholderTextColor="#DDD" />
                        <TextInput style={styles.inputLarge} placeholder="Suggested Answer" value={suggestion} onChangeText={setSuggestion} multiline placeholderTextColor="#DDD" />
                        <View style={styles.buttonContainer}>
                          <Button title="Send Email" onPress={handleSend} />
                        </View>
                    </>
                )}
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
        backgroundColor: 'transparent',
        padding: 16,
        justifyContent: 'center', // Center content for the thank you message
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        fontFamily: 'Happy School'
    },
    inputLarge: {
        height: 100,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        paddingTop: 10,
        borderRadius: 8,
        textAlignVertical: 'top',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#FFFFFF',
    },
    thankYouContainer: {
        alignItems: 'center',
    },
    thankYouText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    buttonContainer: {
      width: 200,
      alignSelf: 'center',
      marginTop: 10,
    }
});

export default ChallengeScreen;
