import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { API_URL } from '../config';

export default function PassengerHomeScreen({ navigation }) {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const { userToken } = useContext(AuthContext);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleRequestRide = async () => {
    try {
      if (!origen || !destino) {
        Alert.alert('Error', 'Por favor ingresa origen y destino');
        return;
      }
      const rideData = {
        origen: origen,
        destino: destino,
        hora_inicio: date.toISOString(),
      };
      console.log('Datos a enviar:', rideData);

      await axios.post(`${API_URL}/create_ride`, rideData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      console.log('Viaje solicitado');
      navigation.navigate('SearchingDriverScreen'); // Navegar a la pantalla de carga
    } catch (error) {
      console.error('Error al solicitar viaje:', error);
      Alert.alert(
        'Error',
        error.response?.data?.msg || 'Error al solicitar el viaje'
      );
    }
  };

  return (
    <LinearGradient colors={['#A7C7E7', '#89ABE3']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Encabezado con flecha de volver */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Solicitar un Viaje</Text>
        </View>

        <View style={styles.contentContainer}>
          {/* Campo Origen */}
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#FFFFFF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu ubicación"
              placeholderTextColor="#FFFFFF"
              value={origen}
              onChangeText={setOrigen}
            />
          </View>

          {/* Campo Destino */}
          <View style={styles.inputContainer}>
            <Ionicons name="flag-outline" size={20} color="#FFFFFF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu destino"
              placeholderTextColor="#FFFFFF"
              value={destino}
              onChangeText={setDestino}
            />
          </View>

          {/* Selector de Hora */}
          <View style={styles.inputContainer}>
            <Ionicons name="time-outline" size={20} color="#FFFFFF" style={styles.icon} />
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
              <Text style={styles.dateButtonText}>
                {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
          </View>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}

          {/* Botón para Solicitar */}
          <TouchableOpacity style={styles.requestButton} onPress={handleRequestRide}>
            <Ionicons name="car-sport-outline" size={20} color="#FFFFFF" />
            <Text style={styles.requestButtonText}>Solicitar Viaje</Text>
          </TouchableOpacity>
        </View>

        {/* Mapa */}
        <View style={styles.mapContainer}>
          <WebView
            source={{
              uri: 'https://www.google.com/maps/embed/v1/place?q=Facultad+de+Ingenieria&key=YOUR_API_KEY',
            }}
            style={styles.map}
          />
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
  contentContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  dateButton: {
    flex: 1,
    paddingVertical: 10,
  },
  dateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  requestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 10,
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  mapContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
