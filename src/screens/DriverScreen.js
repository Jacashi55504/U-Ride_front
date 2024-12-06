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

export default function DriverScreen({ route, navigation }) {
  const [ride, setRide] = useState(route.params?.ride || null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRideDetails = async () => {
    try {
      console.log('Obteniendo detalles del viaje:', ride._id);
      const response = await axios.get(`${API_URL}/ride/${ride._id}`);
      console.log('Respuesta del servidor:', response.data);
      
      if (response.data) {
        setRide(response.data);
      }
    } catch (error) {
      console.error('Error al obtener detalles del viaje:', error);
      Alert.alert('Error', 'No se pudieron obtener los detalles del viaje');
    }
  };

  useEffect(() => {
    if (ride?._id) {
      fetchRideDetails();
    }
  }, [ride?._id]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchRideDetails();
    setRefreshing(false);
  }, []);

  const formatDateTime = (dateString) => {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  if (!ride) {
    return (
      <View style={styles.container}>
        <Text>No hay información del viaje disponible</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#A7C7E7', '#89ABE3']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalles del Viaje</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.rideDetails}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Estado del Viaje</Text>
              <Text style={styles.statusText}>{ride.estado?.toUpperCase()}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ubicaciones</Text>
              <Text style={styles.label}>Origen: {ride.origen}</Text>
              <Text style={styles.label}>Destino: {ride.destino}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Horarios</Text>
              <Text style={styles.label}>
                Inicio: {formatDateTime(ride.hora_inicio)}
              </Text>
              <Text style={styles.label}>
                Aceptado: {formatDateTime(ride.fecha_aceptacion)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Información del Pasajero</Text>
              <Text style={styles.label}>
                Nombre: {ride.pasajero?.nombre || 'No disponible'}
              </Text>
              <Text style={styles.label}>
                Email: {ride.pasajero?.email || 'No disponible'}
              </Text>
            </View>
          </View>
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
    flexGrow: 1,
    padding: 16,
  },
  rideDetails: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 8,
  },
});