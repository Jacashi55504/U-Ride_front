import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../config';

export default function CarCrudScreen({ navigation }) {
  const [cars, setCars] = useState([]);
  const [carDetails, setCarDetails] = useState({
    modelo: '',
    año: '',
    color: '',
    placas: '',
  });
  const [editCarId, setEditCarId] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_cars`);
      setCars(response.data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
      Alert.alert('Error', 'No se pudieron obtener los datos de los carros.');
    }
  };

  const handleAddCar = async () => {
    if (!carDetails.modelo || !carDetails.año || !carDetails.color || !carDetails.placas) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      if (editCarId) {
        await axios.put(`${API_URL}/update_car/${editCarId}`, carDetails);
        Alert.alert('Éxito', 'Carro actualizado correctamente.');
        setEditCarId(null);
      } else {
        await axios.post(`${API_URL}/add_car`, carDetails);
        Alert.alert('Éxito', 'Carro agregado correctamente.');
      }

      setCarDetails({ modelo: '', año: '', color: '', placas: '' });
      fetchCars();
    } catch (error) {
      console.error('Error managing car:', error);
      Alert.alert('Error', 'No se pudo agregar o actualizar el carro.');
    }
  };

  const handleEditCar = (car) => {
    setEditCarId(car._id);
    setCarDetails({
      modelo: car.modelo,
      año: car.año,
      color: car.color,
      placas: car.placas,
    });
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axios.delete(`${API_URL}/delete_car/${carId}`);
      Alert.alert('Éxito', 'Carro eliminado correctamente.');
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
      Alert.alert('Error', 'No se pudo eliminar el carro.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con flecha para volver */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestión de Carros</Text>
        <View style={{ width: 28 }} /> {/* Espaciador para centrar el título */}
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          placeholderTextColor="#CCCCCC"
          value={carDetails.modelo}
          onChangeText={(text) => setCarDetails({ ...carDetails, modelo: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Año"
          placeholderTextColor="#CCCCCC"
          keyboardType="numeric"
          value={carDetails.año}
          onChangeText={(text) => setCarDetails({ ...carDetails, año: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Color"
          placeholderTextColor="#CCCCCC"
          value={carDetails.color}
          onChangeText={(text) => setCarDetails({ ...carDetails, color: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Placas"
          placeholderTextColor="#CCCCCC"
          value={carDetails.placas}
          onChangeText={(text) => setCarDetails({ ...carDetails, placas: text })}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleAddCar}>
          <Text style={styles.saveButtonText}>
            {editCarId ? 'Actualizar Carro' : 'Agregar Carro'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cars}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.carItem}>
            <View>
              <Text style={styles.carText}>Modelo: {item.modelo}</Text>
              <Text style={styles.carText}>Año: {item.año}</Text>
              <Text style={styles.carText}>Color: {item.color}</Text>
              <Text style={styles.carText}>Placas: {item.placas}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditCar(item)}>
                <Ionicons name="pencil-outline" size={24} color="#007BFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteCar(item._id)}>
                <Ionicons name="trash-outline" size={24} color="#FF4D4D" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Barra de Navegación */}
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DriverHomeScreen')}
        >
          <Ionicons name="home-outline" size={28} color="#FFFFFF" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="car-outline" size={28} color="#FFFFFF" />
          <Text style={styles.navText}>Carro</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="briefcase-outline" size={28} color="#B0BEC5" />
          <Text style={[styles.navText, { color: '#B0BEC5' }]}>Viaje</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007BFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  form: {
    padding: 15,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carText: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    height: 60,
    paddingBottom: 10,
    paddingTop: 10,
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
