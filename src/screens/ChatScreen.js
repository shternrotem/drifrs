import React from 'react';
import { WebView } from 'react-native-webview';

const ChatScreen = () => {
  const chatUrl = "https://chatwith.tools/embed/1e1ec1da-0f28-4e9d-ad6d-7adae0a7d98f";
  const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36";

  return <WebView source={{ uri: chatUrl }} userAgent={userAgent} style={{ flex: 1 }} />;
};

export default ChatScreen;