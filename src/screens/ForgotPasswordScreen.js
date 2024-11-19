import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#A7C7E7', '#89ABE3']} // Fondo degradado pastel
      style={styles.container}
    >
      <Text style={styles.title}>Recuperar Contraseña</Text>
      <Text style={styles.subtitle}>
        Ingresa tu correo para recibir un enlace de recuperación.
      </Text>

      {/* Campo para Correo */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo"
          placeholderTextColor="#FFFFFF"
        />
      </View>

      {/* Botón de Enviar */}
      <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Enviar Enlace</Text>
      </TouchableOpacity>

      {/* Opción para volver al Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.backToLogin}>Volver al inicio de sesión</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
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
  sendButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLogin: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
