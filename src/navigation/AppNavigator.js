import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Using Ionicons, a popular icon set

// Import Screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ChatScreen from '../screens/ChatScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

// This replaces the old AppDrawerNavigator
const AppTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, // Hides the header at the top
      tabBarHideOnKeyboard:true,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Chat') {
          iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
        } else if (route.name === 'Challenge') {
          iconName = focused ? 'mail' : 'mail-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person-circle' : 'person-circle-outline';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#fff', // Or any color you prefer
      },
    })}
  >
    <Tab.Screen name="Chat" component={ChatScreen} />
    <Tab.Screen name="Challenge" component={ChallengeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// We now export AppTabNavigator instead of AppDrawerNavigator
export { AuthNavigator, AppTabNavigator };
