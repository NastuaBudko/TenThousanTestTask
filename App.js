import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationScreen from './screens/AuthenticationScreen';
import LoadingScreen from './screens/LoadingScreen';
import PostsPage from './screens/PostsPage';
import PostScreen from './screens/PostScreen';
import ProfileScreen from './screens/ProfileScreen';
import LanguageSelectionScreen from './screens/LanguageSelectionScreen';
import PostsSearchScreen from './screens/PostsSearchScreen';

import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require('./assets/fonts/Inter-Bold.ttf'),
    "Inter-Light": require('./assets/fonts/Inter-Light.ttf'),
    "Inter-Medium": require('./assets/fonts/Inter-Medium.ttf'),
    "Inter-Regular": require('./assets/fonts/Inter-Regular.ttf'),
})

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []); // Імітація завантаження протягом 1 секунди

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Authentication"
              component={AuthenticationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Posts"
              component={PostsPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PostScreen"
              component={PostScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LanguageSelection"
              component={LanguageSelectionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PostsSearchScreen"
              component={PostsSearchScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
