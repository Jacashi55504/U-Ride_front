import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../config';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/authContext';

export default function MyRidesScreen({ navigation }) {
  const [rides, setRides] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { userToken } = useContext(AuthContext);

  const fetchMyRides = async () => {
    try {
      console.log('Obteniendo mis viajes...');
      const response = await axios.get(`${API_URL}/get_user_rides`, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      console.log('Respuesta:', response.data);
      
      if (response.data.success && Array.isArray(response.data.rides)) {
        setRides(response.data.rides);
      } else {
        console.log('No se encontraron viajes o formato incorrecto:', response.data);
        setRides([]);
      }
    } catch (error) {
      console.error('Error al obtener viajes:', error.response || error);
      Alert.alert('Error', 'No se pudieron obtener tus viajes.');
      setRides([]);
    }
  };

  useEffect(() => {
    fetchMyRides();
  }, [userToken]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchMyRides();
    setRefreshing(false);
  }, [userToken]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#A7C7E7', '#89ABE3']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Mis Viajes</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {rides.length === 0 ? (
              <Text style={styles.noRidesText}>No tienes viajes registrados.</Text>
            ) : (
              rides.map((ride) => (
                <TouchableOpacity
                  key={ride.id}
                  style={styles.rideBox}
                  onPress={() => navigation.navigate('DriverScreen', { ride })}
                >
                  <Text style={styles.label}>Origen: {ride.origen}</Text>
                  <Text style={styles.label}>Destino: {ride.destino}</Text>
                  <Text style={styles.label}>
                    Hora de inicio: {formatDateTime(ride.hora_inicio)}
                  </Text>
                  <Text style={styles.label}>
                    Estado: {ride.estado || 'pendiente'}
                  </Text>
                  {ride.conductor && (
                    <Text style={styles.label}>
                      Conductor: {ride.conductor.nombre || ride.conductor.email || 'No asignado'}
                    </Text>
                  )}
                  {ride.pasajero && (
                    <Text style={styles.label}>
                      Pasajero: {ride.pasajero.nombre || ride.pasajero.email || 'No disponible'}
                    </Text>
                  )}
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
      <Navbar />
    </View>
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
  rideBox: {
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
  label: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 4,
  },
  noRidesText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
});
