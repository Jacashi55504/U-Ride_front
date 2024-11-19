import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Para fondo degradado
import { FontAwesome5 } from '@expo/vector-icons'; // Para íconos

export default function RoleSelectionScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#A7C7E7', '#89ABE3']} // Fondo degradado pastel
      style={styles.container}
    >
      <Text style={styles.title}>Selecciona tu rol</Text>

      {/* División de Roles */}
      <View style={styles.rolesContainer}>
        {/* Conductor */}
        <TouchableOpacity
          style={[styles.roleBox, styles.driverBox]}
          onPress={() => navigation.navigate('DriverRequest')} // Reemplaza con la pantalla de Conductor
        >
          <FontAwesome5 name="car" size={48} color="#007BFF" style={styles.icon} />
          <Text style={styles.roleText}>Conductor</Text>
        </TouchableOpacity>

        {/* Pasajero */}
        <TouchableOpacity
          style={[styles.roleBox, styles.passengerBox]}
          onPress={() => navigation.navigate('PassengerRequest')} 
        >
          <FontAwesome5 name="user" size={48} color="#007BFF" style={styles.icon} />
          <Text style={styles.roleText}>Pasajero</Text>
        </TouchableOpacity>
      </View>

      {/* Cerrar Sesión */}
      <TouchableOpacity
        style={styles.logoutContainer}
        onPress={() => navigation.navigate('Welcome')} // Redirige a la pantalla de inicio de sesión
      >
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 50,
  },
  rolesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espaciado uniforme entre las mitades
  },
  roleBox: {
    flex: 1, // Cada rol ocupa la mitad del ancho disponible
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10, // Espaciado entre los cuadros
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Para Android
  },
  icon: {
    marginBottom: 10, // Espaciado entre el ícono y el texto
  },
  roleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  driverBox: {
    backgroundColor: '#E0F7FA', // Fondo pastel para conductor
  },
  passengerBox: {
    backgroundColor: '#E8EAF6', // Fondo pastel para pasajero
  },
  logoutContainer: {
    marginTop: 40, // Espaciado desde los roles
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#FFD700', // Amarillo pastel para resaltar
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
