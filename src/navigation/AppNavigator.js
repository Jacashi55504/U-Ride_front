import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import CarManagementScreen from '../screens/CarManagementScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
                <Stack.Screen name="CarManagement" component={CarManagementScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
