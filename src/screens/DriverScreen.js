import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // SafeArea para el notch
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';

export default function DriverScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#A7C7E7', '#89ABE3']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Título */}
          <Text style={styles.title}>Viaje Actual</Text>

          {/* Mapa Temporal */}
          <View style={styles.mapContainer}>
            <WebView
              source={{
                uri: 'https://www.google.com/maps/embed/v1/place?q=Facultad+de+Derecho&key=YOUR_API_KEY',
              }}
              style={styles.map}
            />
          </View>

          {/* Información del Pasajero */}
          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Pasajero</Text>
            <Text style={styles.passengerName}>Carlos López</Text>
            <Text style={styles.passengerContact}>Contacto: 55-1234-5678</Text>
          </View>

          {/* Información del Viaje */}
          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Detalles del Viaje</Text>
            <Text style={styles.tripInfo}>Origen: Facultad de Derecho</Text>
            <Text style={styles.tripInfo}>Destino: Cafetería Central</Text>
            <Text style={styles.tripInfo}>Distancia: 3.5 km</Text>
            <Text style={styles.tripInfo}>Tarifa: $40.00 MXN</Text>
          </View>

          {/* Botón para Finalizar Viaje */}
          <TouchableOpacity style={styles.endTripButton}>
            <Text style={styles.endTripButtonText}>Finalizar Viaje</Text>
          </TouchableOpacity>

          {/* Botón para Volver */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('RoleSelection')}
          >
            <Text style={styles.backButtonText}>Volver a Roles</Text>
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
  infoBox: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  passengerContact: {
    fontSize: 14,
    color: '#888',
  },
  tripInfo: {
    fontSize: 16,
    color: '#555',
  },
  endTripButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  endTripButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
