import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen'; 
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreens';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import PassengerMapScreen from '../screens/PassengerMapScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="PassengerMap" component={PassengerMapScreen} />
    </Stack.Navigator>
  );
}
