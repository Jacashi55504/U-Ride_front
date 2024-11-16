import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function WelcomeScreen({ navigation, Icon }) {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>U-Ride</Text>

            <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
            <Button title="Iniciar Sesión" onPress={() => navigation.navigate('Login')} />

            {Icon && <View style={styles.iconContainer}>{Icon}</View>}

            <Text style={styles.footerText}>Chad PUTO</Text>
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
    iconContainer: {
        marginTop: 20,
    },
    footerText: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF0000', // Color resaltado
    },
});
