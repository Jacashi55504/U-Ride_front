import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../config';
import { AuthContext } from '../context/authContext';

export default function PassengerScreen({ route, navigation }) {
  const [rideDetails, setRideDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userToken } = useContext(AuthContext);
  const [ride, setRide] = useState(null);
  
  const { ride: initialRide } = route.params || {};
  const ride_id = initialRide?.id;

  console.log('Parámetros recibidos:', { 
    initialRide, 
    ride_id,
    routeParams: route.params 
  });

  useEffect(() => {
    console.log('useEffect ejecutándose, ride_id:', ride_id);
    if (ride_id) {
      fetchRideDetails();
    } else {
      console.log('No hay ride_id disponible');
      setLoading(false);
    }
  }, [ride_id]);

  const fetchRideDetails = async () => {
    console.log('Iniciando fetchRideDetails');
    try {
      console.log('Haciendo petición a:', `${API_URL}/ride/${ride_id}`);
      const response = await axios.get(`${API_URL}/ride/${ride_id}`);
      console.log('Respuesta del servidor:', response.data);
      
      if (response.data.ride) {
        console.log('Ride data recibida:', response.data.ride);
        setRide(response.data.ride);
      } else {
        console.log('No se recibió información del ride en la respuesta');
        // Si no hay datos del ride, usamos los datos iniciales
        if (initialRide) {
          console.log('Usando datos iniciales del ride:', initialRide);
          setRide(initialRide);
        }
      }
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      // Si hay un error al obtener los datos actualizados, usamos los datos iniciales
      if (initialRide) {
        console.log('Usando datos iniciales del ride debido al error:', initialRide);
        setRide(initialRide);
      }
      Alert.alert('Error', 'No se pudo obtener la información del viaje');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancelar Viaje',
      '¿Estás seguro que deseas cancelar el viaje?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: async () => {
            try {
              const response = await axios.delete(`${API_URL}/delete_ride/${ride_id}`);
              Alert.alert('Éxito', 'Viaje cancelado correctamente');
              navigation.goBack();
            } catch (error) {
              console.error('Error al cancelar el viaje:', error);
              Alert.alert('Error', 'No se pudo cancelar el viaje');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
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
        </View>

        <ScrollView style={styles.content}>
          {ride ? (
            <View style={styles.rideContainer}>
              <View style={styles.rideInfo}>
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.infoText}>Origen: {ride.origen}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Ionicons name="flag-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.infoText}>Destino: {ride.destino}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.infoText}>
                    Hora de inicio: {new Date(ride.hora_inicio).toLocaleString()}
                  </Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Ionicons name="alert-circle-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.infoText}>Estado: {ride.estado}</Text>
                </View>

                {ride.conductor_id && (
                  <View style={styles.driverSection}>
                    <Text style={styles.sectionTitle}>Información del Conductor</Text>
                    <Text style={styles.infoText}>ID Conductor: {ride.conductor_id}</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancelar Viaje</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.noRideContainer}>
              <Text style={styles.noRideText}>No hay información del viaje disponible</Text>
            </View>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  rideContainer: {
    flex: 1,
  },
  rideInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  driverSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#FF4444',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noRideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noRideText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
