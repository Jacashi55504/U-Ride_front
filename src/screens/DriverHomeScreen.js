import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Manejo del notch
import { LinearGradient } from 'expo-linear-gradient'; // Fondo con degradado
import { WebView } from 'react-native-webview'; // Mapa temporal

export default function DriverHomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#A7C7E7', '#89ABE3']} // Fondo degradado
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Título */}
          <Text style={styles.title}>Viajes Disponibles</Text>

          {/* Mapa Estático */}
          <View style={styles.mapContainer}>
            <WebView
              source={{
                uri: 'https://www.google.com/maps/embed/v1/place?q=Facultad+de+Ingenieria&key=YOUR_API_KEY',
              }}
              style={styles.map}
              scrollEnabled={false} // Desactiva el scroll en el mapa
              bounces={false} // Evita el rebote en iOS
            />
          </View>

          {/* Información del Viaje */}
          <View style={styles.tripInfoBox}>
            <Text style={styles.label}>Origen: Facultad de Ingeniería</Text>
            <Text style={styles.label}>Destino: Biblioteca Central</Text>
            <Text style={styles.label}>Distancia: 4.5 km</Text>
            <Text style={styles.label}>Tarifa: $50.00 MXN</Text>
          </View>

          {/* Botón para Aceptar Viaje */}
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => navigation.navigate('DriverScreen')}
          >
            <Text style={styles.acceptButtonText}>Aceptar Viaje</Text>
          </TouchableOpacity>

          {/* Botón para Cancelar */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.navigate('RoleSelection')}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  tripInfoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  acceptButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
