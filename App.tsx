import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import RNBootSplash from 'react-native-bootsplash';

import SplashScreen from './src/screens/SplashScreen';
import { AuthNavigator, AppDrawerNavigator } from './src/navigation/AppNavigator';

const RootStack = createNativeStackNavigator();

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    // This listener will set the user's auth state in the background.
    const subscriber = auth().onAuthStateChanged(userState => {
      setUser(userState);
    });
    return subscriber;
  }, []);

  // This function will be called by the SplashScreen when the video is ready.
  const handleVideoReady = () => {
    // Hide the native splash screen, revealing the video splash screen.
    RNBootSplash.hide({ fade: true });

    // Set a timer to transition from the video splash to the main app.
    setTimeout(() => {
      setIsAppReady(true);
    }, 2500); // Let the video play for 2.5 seconds after it loads.
  };

  // The native splash screen is visible initially. Then this component
  // shows until isAppReady is true.
  if (!isAppReady) {
    return <SplashScreen onVideoReady={handleVideoReady} />;
  }

  // After the video has played, show the main app.
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name="AppDrawer" component={AppDrawerNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;