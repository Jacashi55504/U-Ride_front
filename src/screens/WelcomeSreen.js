import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>U-Ride</Text>
            <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
            <Button title="Iniciar Sesión" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007BFF',
    },
    title: {
        fontSize: 32,
        color: '#fff',
        marginBottom: 20,
    },
});
