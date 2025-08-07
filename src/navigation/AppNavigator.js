import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { auth } from '../firebase/config';

// Import Screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ChatScreen from '../screens/ChatScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

const CustomDrawerContent = (props) => {
  return (
    <ImageBackground
      // Make sure the path to your image is correct
      source={require('../../assets/menu_bg.png')}
      style={styles.drawerBackground}
      resizeMode="cover"
    >
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Log Out"
          onPress={() => auth().signOut()}
          labelStyle={styles.drawerLabel}
          inactiveTintColor="#fff" // Ensures the icon color is also white
        />
      </DrawerContentScrollView>
    </ImageBackground>
  );
};

const AppDrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Chat"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerTransparent: false,
      headerTintColor: '#000000ff',
      headerStyle: {
        height: 100 // <-- Set your desired height here
    },
      drawerLabelStyle: styles.drawerLabel,
      drawerInactiveTintColor: '#ffffff', // Color for inactive item text and icon
      drawerActiveTintColor: '#000000', // Color for active item text and icon
      drawerActiveBackgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background for the active item
    }}
  >
    <Drawer.Screen name="Chat" component={ChatScreen} />
    <Drawer.Screen name="Challenge" component={ChallengeScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  drawerBackground: {
    flex: 1,
  },
  drawerLabel: {
    color: '#FFFFFF', // Set the text color of all drawer items to white
    fontWeight: 'bold',
  },
});

export { AuthNavigator, AppDrawerNavigator };