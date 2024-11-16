import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function RoleSelectionScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>¿Qué quieres hacer hoy?</Text>
            <Button title="Conductor" onPress={() => navigation.navigate('CarManagement')} />
            <Button title="Pasajero" onPress={() => navigation.navigate('PassengerMapScreen')} />
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
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
});
