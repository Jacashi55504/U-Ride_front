import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/authContext';
export default function App() {
  return (
    
      <AuthProvider>
        <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator /> {/* Configuración de AppNavigator*/}
      </NavigationContainer>
      </AuthProvider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
