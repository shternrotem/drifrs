import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import RNBootSplash from 'react-native-bootsplash';

import SplashScreen from './src/screens/SplashScreen';
import { AuthNavigator, AppTabNavigator } from './src/navigation/AppNavigator';

const RootStack = createNativeStackNavigator();

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    // This listener will set the user's auth state in the background.
    const subscriber = auth().onAuthStateChanged(userState => {
      setUser(userState);

      // 1. The logic to transition is now here, happening after the first auth check.
      // We no longer need to wait for a video.
      if (!isAppReady) {
        RNBootSplash.hide({ fade: true });
        setIsAppReady(true);
      }
    });

    return subscriber;
    // 2. The empty dependency array ensures this runs only once on mount.
  }, []);

  // 3. The handleVideoReady function and its setTimeout have been removed.

  // The native splash screen is visible initially. Then this JS splash
  // shows briefly until isAppReady is true.
  if (!isAppReady) {
    // 4. SplashScreen is now called without the onVideoReady prop.
    return <SplashScreen />;
  }

  // After the app is ready, show the main navigation.
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name="AppTabs" component={AppTabNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;