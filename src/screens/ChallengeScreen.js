import React, { useState } from 'react';
import {TouchableOpacity, Image, View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { openComposer } from 'react-native-email-link';

const ChallengeScreen = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const recipientEmail = 'shternrotem@gmail.com';

    const handleSend = async () => {
        const emailBody = `
            Question:
            ${question}

            Answer:
            ${answer}

            Suggested Answer:
            ${suggestion}
        `;

        try {
            await openComposer({
                to: recipientEmail,
                subject: 'App Challenge Feedback',
                body: emailBody,
            });

            setQuestion('');
            setAnswer('');
            setSuggestion('');
            setEmailSent(true);

        } catch (error) {
            Alert.alert("Error", "Could not open email client. Please make sure you have an email app installed.");
            console.error('Failed to open email client:', error);
        }
    };

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
                        <Image
                            source={require('../../assets/challenge_title.png')}
                            style={styles.titleImage}
                        />
                        <Text style={styles.subtitle}>Think the answer was incorrect?</Text>
                        <Text style={styles.underline}>Suggest a solution and we'll get back to you</Text>
                        <TextInput style={styles.inputLarge} placeholder="Question" value={question} onChangeText={setQuestion} multiline placeholderTextColor="#DDD" />
                        <TextInput style={styles.inputLarge} placeholder="Answer" value={answer} onChangeText={setAnswer} multiline placeholderTextColor="#DDD" />
                        <TextInput style={styles.inputLarge} placeholder="Suggested Answer" value={suggestion} onChangeText={setSuggestion} multiline placeholderTextColor="#DDD" />
                        <TouchableOpacity style={styles.customButton} onPress={handleSend}>
                            <Text style={styles.customButtonText}>Send Email</Text>
                        </TouchableOpacity>
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
        justifyContent: 'flex-start',
    },
    titleImage: {
        width: '100%',
        height: 198,
        marginBottom: -45,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    underline: {
        fontSize: 16,
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    inputLarge: {
        height: 132,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
        borderRadius: 22,
        textAlignVertical: 'top',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        color: '#000000ff',
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
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    buttonContainer: {
        width: 100,
        alignSelf: 'center',
        marginTop: 10,
        color: '#FFFFFF'
    },
    customButton: {
        backgroundColor: '#FFFFFF', // White background
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 22, // Makes it rounded
        alignSelf: 'center',
        marginTop: 10,
    },
    customButtonText: {
        color: '#000000', // Black text
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default ChallengeScreen;
