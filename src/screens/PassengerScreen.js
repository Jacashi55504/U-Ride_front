import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Asegura áreas seguras
import { LinearGradient } from 'expo-linear-gradient'; // Fondo con degradado
import { WebView } from 'react-native-webview'; // Mapa temporal

export default function PassengerScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#A7C7E7', '#89ABE3']} // Fondo degradado
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Título */}
          <Text style={styles.title}>Detalles del Viaje</Text>

          {/* Mapa Temporal */}
          <View style={styles.mapContainer}>
            <WebView
              source={{
                uri: 'https://www.google.com/maps/embed/v1/place?q=Facultad+de+Ingenieria&key=YOUR_API_KEY',
              }}
              style={styles.map}
            />
          </View>

          {/* Información del Conductor */}
          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Conductor</Text>
            <View style={styles.driverInfo}>
              <Image
                source={{ uri: 'https://via.placeholder.com/100' }} // Imagen de ejemplo
                style={styles.driverImage}
              />
              <View>
                <Text style={styles.driverName}>Juan Pérez</Text>
                <Text style={styles.driverRating}>Calificación: 4.8/5</Text>
              </View>
            </View>
          </View>

          {/* Información del Coche */}
          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Coche</Text>
            <Text style={styles.carInfo}>Modelo: Toyota Corolla 2020</Text>
            <Text style={styles.carInfo}>Color: Blanco</Text>
            <Text style={styles.carInfo}>Placas: XYZ-123</Text>
          </View>

          {/* Detalles del Viaje */}
          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Detalles del Viaje</Text>
            <Text style={styles.tripInfo}>Origen: Facultad de Ingeniería</Text>
            <Text style={styles.tripInfo}>Destino: Biblioteca Central</Text>
            <Text style={styles.tripInfo}>Costo: $50.00 MXN</Text>
          </View>

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
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  driverRating: {
    fontSize: 14,
    color: '#888',
  },
  carInfo: {
    fontSize: 16,
    color: '#555',
  },
  tripInfo: {
    fontSize: 16,
    color: '#555',
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
