import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../config';

export default function DriverHomeScreen({ navigation }) {
  const [availableRides, setAvailableRides] = useState([]);
  const [acceptedRide, setAcceptedRide] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAvailableRides = async () => {
    try {
      console.log('Obteniendo viajes disponibles...');
      const response = await axios.get(`${API_URL}/get_available_rides`);
      console.log('Respuesta:', response.data);
      
      if (response.data.success && Array.isArray(response.data.rides)) {
        console.log('Viajes disponibles encontrados:', response.data.rides.length);
        setAvailableRides(response.data.rides);
      } else {
        setAvailableRides([]);
      }
    } catch (error) {
      console.error('Error al obtener viajes:', error);
      Alert.alert('Error', 'No se pudieron obtener los viajes disponibles.');
      setAvailableRides([]);
    }
  };

  useEffect(() => {
    fetchAvailableRides();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchAvailableRides();
    setRefreshing(false);
  }, []);

  const handleAcceptRide = async (ride) => {
    try {
      console.log('Intentando aceptar viaje:', ride._id);
      const response = await axios.post(`${API_URL}/accept_ride/${ride._id}`);
      console.log('Respuesta del servidor:', response.data);
  
      if (response.data.success) {
        Alert.alert('Éxito', 'Viaje aceptado exitosamente');
        // Navegar a la pantalla del conductor con los detalles del viaje
        navigation.navigate('DriverScreen', { ride: response.data.ride });
        // Actualizar la lista de viajes disponibles
        fetchAvailableRides();
      } else {
        Alert.alert('Error', response.data.msg || 'No se pudo aceptar el viaje');
      }
    } catch (error) {
      console.error('Error al aceptar viaje:', error);
      console.error('Detalles del error:', error.response?.data);
      Alert.alert(
        'Error',
        error.response?.data?.msg || 'No se pudo aceptar el viaje'
      );
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <LinearGradient colors={['#A7C7E7', '#89ABE3']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Viajes Disponibles</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {availableRides.length === 0 ? (
            <Text style={styles.noRidesText}>No hay viajes disponibles.</Text>
          ) : (
            availableRides.map((ride) => (
              <View key={ride._id} style={styles.rideBox}>
                <Text style={styles.label}>Origen: {ride.origen}</Text>
                <Text style={styles.label}>Destino: {ride.destino}</Text>
                <Text style={styles.label}>
                  Hora de inicio: {formatDateTime(ride.hora_inicio)}
                </Text>
                <Text style={styles.label}>
                  Pasajero: {ride.pasajero?.nombre || 'No disponible'}
                </Text>
                <Text style={styles.label}>
                  Email: {ride.pasajero?.email || 'No disponible'}
                </Text>
                <Text style={styles.label}>
                  Estado: {ride.estado || 'pendiente'}
                </Text>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAcceptRide(ride)}
                >
                  <Text style={styles.acceptButtonText}>Aceptar Viaje</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContainer: {
    padding: 16,
  },
  rideBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noRidesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 20,
  },
});
