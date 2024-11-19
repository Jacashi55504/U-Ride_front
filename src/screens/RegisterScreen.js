import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RegisterScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#A7C7E7', '#89ABE3']} // Fondo degradado pastel
      style={styles.container}
    >
      <Text style={styles.title}>Crear Cuenta</Text>

      {/* Campos de Registro */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={[styles.input, { marginBottom: 10 }]}
          placeholder="Ingresa tu correo"
          placeholderTextColor="#FFFFFF"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={[styles.input, { marginBottom: 10 }]}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#FFFFFF"
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirma tu contraseña"
          placeholderTextColor="#FFFFFF"
          secureTextEntry
        />
      </View>

      {/* Botón de Registrarse */}
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Crear Cuenta</Text>
      </TouchableOpacity>

      {/* Referencia a Iniciar Sesión */}
      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.backToLogin}>
          ¿Ya tienes una cuenta? <Text style={styles.backToLoginHighlight}>Inicia sesión</Text>
        </Text>
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
    marginBottom: 60, // Mayor separación del título
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fondo transparente
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: '#FFFFFF',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 20, // Aumentado para una mayor separación vertical
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40, // Más espacio debajo del botón
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLogin: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
  },
  backToLoginHighlight: {
    color: '#FFD700', // Amarillo pastel para resaltar
    fontWeight: 'bold',
  },
});
