import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { AuthContext } from '../context/authContext'; // Contexto para autenticación
import { API_URL } from '../config'; // Dirección del backend

export default function PassengerScreen({ navigation }) {
  const [rideDetails, setRideDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/ride/<ride_id>`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (response.data) {
          setRideDetails(response.data);
        } else {
          Alert.alert('Error', 'No se encontró información del viaje');
        }
      } catch (error) {
        console.error('Error fetching ride details:', error);
        Alert.alert(
          'Error',
          error.response?.data?.msg || 'Error al obtener la información del viaje'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, []);

  const handleCancel = () => {
    Alert.alert(
      'Cancelar Viaje',
      '¿Estás seguro de que deseas cancelar este viaje?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => {
            navigation.navigate('PassengerHomeScreen');
          },
        },
      ]
    );
  };

  return (
    <LinearGradient colors={['#A7C7E7', '#89ABE3']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleCancel()}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalles del Viaje</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Mapa */}
          <View style={styles.mapContainer}>
            <WebView
              source={{
                uri: 'https://www.google.com/maps/embed/v1/place?q=Facultad+de+Ingenieria&key=YOUR_API_KEY',
              }}
              style={styles.map}
            />
          </View>

          {loading ? (
            <Text style={styles.loadingText}>Cargando información del viaje...</Text>
          ) : rideDetails ? (
            <>
              {/* Información del Conductor */}
              <View style={styles.infoBox}>
                <View style={styles.driverInfo}>
                  <Image
                    source={{
                      uri:
                        rideDetails.conductor?.photo ||
                        'https://via.placeholder.com/100',
                    }}
                    style={styles.driverImage}
                  />
                  <View>
                    <Text style={styles.driverName}>
                      {rideDetails.conductor?.username || 'Conductor'}
                    </Text>
                    <Text style={styles.driverRating}>
                      Calificación: {rideDetails.conductor?.rating || 'N/A'}/5
                    </Text>
                  </View>
                </View>
              </View>

              {/* Información del Coche */}
              <View style={styles.infoBox}>
                <Ionicons name="car-sport" size={24} color="#007BFF" style={styles.icon} />
                <Text style={styles.carInfo}>
                  Modelo: {rideDetails.coche?.modelo || 'N/A'}
                </Text>
                <Text style={styles.carInfo}>
                  Color: {rideDetails.coche?.color || 'N/A'}
                </Text>
                <Text style={styles.carInfo}>
                  Placas: {rideDetails.coche?.placas || 'N/A'}
                </Text>
              </View>
            </>
          ) : (
            <Text style={styles.loadingText}>No se encontró el viaje.</Text>
          )}

          {/* Detalles del Viaje */}
          <View style={styles.infoBox}>
            <Ionicons name="location" size={24} color="#007BFF" style={styles.icon} />
            <Text style={styles.tripInfo}>
              Origen: {rideDetails?.origen || 'N/A'}
            </Text>
            <Text style={styles.tripInfo}>
              Destino: {rideDetails?.destino || 'N/A'}
            </Text>
            <Text style={styles.tripInfo}>
              Costo: {rideDetails?.costo || 'N/A'} MXN
            </Text>
          </View>

          {/* Botón Cancelar */}
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Ionicons name="close-circle" size={20} color="#FFFFFF" />
            <Text style={styles.cancelButtonText}>Cancelar Viaje</Text>
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollContainer: {
    padding: 15,
  },
  mapContainer: {
    height: 200,
    borderRadius: 15,
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
    elevation: 2,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  driverRating: {
    fontSize: 14,
    color: '#6C757D',
  },
  carInfo: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 5,
  },
  tripInfo: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4D4D',
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 20,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginBottom: 10,
  },
});
