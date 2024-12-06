import React, { useState, useEffect } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../config';

export default function DriverHomeScreen({ navigation }) {
  const [availableRides, setAvailableRides] = useState([]);
  const [acceptedRide, setAcceptedRide] = useState(null);

  useEffect(() => {
    const fetchAvailableRides = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_available_rides`);
        const rides = Array.isArray(response.data) ? response.data : [];
        setAvailableRides(rides);
      } catch (error) {
        console.error('Error fetching available rides:', error);
        Alert.alert('Error', 'No se pudieron obtener los viajes disponibles.');
        setAvailableRides([]);
      }
    };

    fetchAvailableRides();
  }, []);

  const handleAcceptRide = (ride) => {
    setAcceptedRide(ride);
    Alert.alert('Viaje aceptado', 'Has aceptado el viaje.');
  };

  return (
    <LinearGradient colors={['#A7C7E7', '#89ABE3']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header con flecha para volver */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Viajes Disponibles</Text>
          <View style={{ width: 28 }} /> {/* Espaciador para alinear */}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Viaje Hardcoded para pruebas */}
          <View style={styles.rideBox}>
            <Text style={styles.label}>Origen: Facultad de Ingeniería</Text>
            <Text style={styles.label}>Destino: Biblioteca Central</Text>
            <Text style={styles.label}>Distancia: 4.5 km</Text>
            <Text style={styles.label}>Tarifa: $50.00 MXN</Text>
            <TouchableOpacity
              style={[
                styles.acceptButton,
                acceptedRide && styles.disabledButton,
              ]}
              onPress={() =>
                handleAcceptRide({
                  origen: 'Facultad de Ingeniería',
                  destino: 'Biblioteca Central',
                  tarifa: '$50.00 MXN',
                })
              }
              disabled={!!acceptedRide}
            >
              <Text style={styles.acceptButtonText}>
                {acceptedRide ? 'Viaje Aceptado' : 'Aceptar Viaje'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Rides from Backend */}
          {availableRides.length === 0 ? (
            <Text style={styles.noRidesText}>No hay viajes disponibles.</Text>
          ) : (
            availableRides.map((ride, index) => (
              <View key={index} style={styles.rideBox}>
                <Text style={styles.label}>Origen: {ride.origen}</Text>
                <Text style={styles.label}>Destino: {ride.destino}</Text>
                <Text style={styles.label}>
                  Distancia: {ride.distancia || 'N/A'}
                </Text>
                <Text style={styles.label}>Tarifa: {ride.tarifa || 'N/A'}</Text>
                <TouchableOpacity
                  style={[
                    styles.acceptButton,
                    acceptedRide && styles.disabledButton,
                  ]}
                  onPress={() => handleAcceptRide(ride)}
                  disabled={!!acceptedRide}
                >
                  <Text style={styles.acceptButtonText}>
                    {acceptedRide ? 'Viaje Aceptado' : 'Aceptar Viaje'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
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
          <TouchableOpacity
            disabled={!acceptedRide}
            onPress={() =>
              acceptedRide && navigation.navigate('DriverScreen', { acceptedRide })
            }
          >
            <Ionicons
              name="briefcase-outline"
              size={28}
              color={acceptedRide ? '#FFFFFF' : '#B0BEC5'}
            />
            <Text
              style={[
                styles.navText,
                { color: acceptedRide ? '#FFFFFF' : '#B0BEC5' },
              ]}
            >
              Viaje
            </Text>
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
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  rideBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  acceptButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
    opacity: 0.8,
  },
  noRidesText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
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
