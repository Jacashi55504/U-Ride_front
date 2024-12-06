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
      // Validar campos requeridos
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


      const response = await axios.post(`${API_URL}/create_ride`, rideData);

      console.log('Respuesta del servidor:', response.data);
      Alert.alert('Éxito', 'Viaje solicitado correctamente');
      navigation.navigate('PassengerScreen');
      
    } catch (error) {
      console.error('Error al solicitar viaje:', error);
      Alert.alert(
        'Error',
        error.response?.data?.msg || 'Error al solicitar el viaje'
      );
    }
  };

  return (
    <LinearGradient
      colors={['#A7C7E7', '#89ABE3']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Solicitar un Viaje</Text>

        {/* Contenedor Estático */}
        <View style={styles.contentContainer}>
          {/* Campos para Origen y Destino */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Origen</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu ubicación"
              placeholderTextColor="#FFFFFF"
              value={origen}
              onChangeText={setOrigen}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Destino</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu destino"
              placeholderTextColor="#FFFFFF"
              value={destino}
              onChangeText={setDestino}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora de Inicio</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {date.toLocaleTimeString()}
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

          {/* Botón para Pedir Viaje */}
          <TouchableOpacity
            style={styles.requestButton}
            onPress={handleRequestRide}
          >
            <Text style={styles.requestButtonText}>Pedir Viaje</Text>
          </TouchableOpacity>

          {/* Botón para Cancelar */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.navigate('RoleSelection')}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        {/* Mapa Desplazable */}
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  contentContainer: {
    marginBottom: 20, // Espaciado entre el contenido estático y el mapa
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: '#FFFFFF',
    fontSize: 14,
  },
  requestButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1, // Permite al mapa ocupar el espacio restante
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  dateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
  },
  dateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
