import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ChallengeScreen = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [suggestion, setSuggestion] = useState('');

    const handleSend = () => {
        Alert.alert(
            "Email Sent (Simulated)",
            `To: baruch1723@gmail.com\n\nQuestion: ${question}\nAnswer: ${answer}\nSuggestion: ${suggestion}`,
            [{ text: "OK", onPress: () => {
                setQuestion('');
                setAnswer('');
                setSuggestion('');
            }}]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>challenge</Text>
            <TextInput style={styles.inputLarge} placeholder="Question" value={question} onChangeText={setQuestion} multiline />
            <TextInput style={styles.inputLarge} placeholder="Answer" value={answer} onChangeText={setAnswer} multiline />
            <TextInput style={styles.inputLarge} placeholder="Suggested Answer" value={suggestion} onChangeText={setSuggestion} multiline />
            <Button title="Send Email" onPress={handleSend} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    inputLarge: { height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8, paddingTop: 8, borderRadius: 5, textAlignVertical: 'top' },
});

export default ChallengeScreen;