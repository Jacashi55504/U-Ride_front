import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function PassengerMapScreen() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.7749, // Cambiar por coordenadas reales
                    longitude: -122.4194,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* Marcadores de ejemplo */}
                <Marker coordinate={{ latitude: 37.7749, longitude: -122.4194 }} title="Conductor A" />
                <Marker coordinate={{ latitude: 37.7849, longitude: -122.4294 }} title="Conductor B" />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});
