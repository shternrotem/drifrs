import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

// IMPORTANT: Replace with your actual Firebase config from your project settings
const firebaseConfig = {
  apiKey: "AIzaSyBWzOL7BGBxlSkPZU2JzLr509J_yJbFstA",
  authDomain: "drifrs-9b5bc.firebaseapp.com",
  projectId: "drifrs-9b5bc",
  storageBucket: "drifrs-9b5bc.firebasestorage.app",
  messagingSenderId: "227008258082",
  appId: "1:227008258082:web:e3ba01c498c3e3c079ea7b"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth;
export const firestore = firebase.firestore;