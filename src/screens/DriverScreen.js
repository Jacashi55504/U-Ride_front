import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../config';

export default function DriverScreen({ navigation, route }) {
  const [rideDetails, setRideDetails] = useState({
    pasajero: { email: 'No disponible' },
    origen: 'No disponible',
    destino: 'No disponible',
    tarifa: 'No disponible',
  });
  const [loading, setLoading] = useState(true);
  const rideId = route.params?.acceptedRide?.id || null;

  useEffect(() => {
    const fetchRideDetails = async () => {
      if (!rideId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/ride/${rideId}`);
        setRideDetails(response.data);
      } catch (error) {
        console.error('Error fetching ride details:', error);
        Alert.alert(
          'Error',
          'No se pudieron obtener los detalles del viaje. Mostrando datos predeterminados.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, [rideId]);

  const handleEndTrip = () => {
    Alert.alert('Viaje Finalizado', 'Has finalizado el viaje.');
    navigation.navigate('DriverHomeScreen');
  };

  return (
    <LinearGradient colors={['#A7C7E7', '#89ABE3']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('DriverHomeScreen')}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Viaje Actual</Text>
          <View style={{ width: 28 }} /> {/* Espacio para equilibrar */}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Mapa */}
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
            <Text style={styles.passengerName}>
              {rideDetails?.pasajero?.email || 'No disponible'}
            </Text>
          </View>

          {/* Información del Viaje */}
          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Detalles del Viaje</Text>
            <Text style={styles.tripInfo}>Origen: {rideDetails.origen || 'No disponible'}</Text>
            <Text style={styles.tripInfo}>Destino: {rideDetails.destino || 'No disponible'}</Text>
            <Text style={styles.tripInfo}>
              Tarifa: {rideDetails.tarifa || 'No disponible'}
            </Text>
          </View>

          {/* Botón para Finalizar Viaje */}
          <TouchableOpacity style={styles.endTripButton} onPress={handleEndTrip}>
            <Text style={styles.endTripButtonText}>Finalizar Viaje</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Barra de Navegación */}
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.navigate('DriverHomeScreen')}>
            <Ionicons name="home-outline" size={28} color="#FFFFFF" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CarCrudScreen')}>
            <Ionicons name="car-outline" size={28} color="#FFFFFF" />
            <Text style={styles.navText}>Carro</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled>
            <Ionicons name="briefcase-outline" size={28} color="#B0BEC5" />
            <Text style={[styles.navText, { color: '#B0BEC5' }]}>Viaje</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContainer: {
    padding: 20,
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
    marginBottom: 10,
  },
  passengerName: {
    fontSize: 16,
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
  },
  endTripButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    height: 60,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
