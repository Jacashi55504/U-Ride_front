import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import PassengerScreen from '../screens/PassengerScreen';
import DriverScreen from '../screens/DriverScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import PassengerHomeScreen from '../screens/PassengerHomeScreen';
import DriverHomeScreen from '../screens/DriverHomeScreen';
import SearchingDriverScreen from '../screens/SearchingDriverScreen';
import CarCrudScreen from '../screens/CarCrudScreen'; 

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        animationEnabled: false, // Desactiva animación globalmente
      }}
    >
      <Stack.Screen name="Welcome" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="PassengerHomeScreen" component={PassengerHomeScreen} />
      <Stack.Screen name="DriverHomeScreen" component={DriverHomeScreen} />
      <Stack.Screen name="PassengerScreen" component={PassengerScreen} />
      <Stack.Screen name="DriverScreen" component={DriverScreen} />
      <Stack.Screen name="SearchingDriverScreen" component={SearchingDriverScreen} />
      <Stack.Screen name="CarCrudScreen" component={CarCrudScreen} /> 
    </Stack.Navigator>
  );
}
