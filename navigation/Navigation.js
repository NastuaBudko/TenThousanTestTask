import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import SignIn from '../components/SignIn';
import PostsPage from '../screens/PostsPage';
import PostScreen from '../screens/PostScreen';
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import PostsSearchScreen from '../screens/PostsSearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleConnectivityChange = isConnected => {
      setIsOnline(isConnected);
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    checkCachedData();
  }, []);

  const checkCachedData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('cachedData');
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
      }
    } catch (error) {
      console.error('Error checking cached data:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostScreen"
          component={PostScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Posts"
          component={PostsPage}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
