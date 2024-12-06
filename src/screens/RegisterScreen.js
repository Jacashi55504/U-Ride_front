import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/authContext';


export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      // Validaciones
      if (!email || !password || !confirmPassword) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }

      const result = await register(email, password);
      if (result.success) {
        navigation.navigate('RoleSelection');
      } else {
        Alert.alert('Error', result.message || 'Error en el registro');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error durante el registro');
    }
  };

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
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={[styles.input, { marginBottom: 10 }]}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#FFFFFF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirma tu contraseña"
          placeholderTextColor="#FFFFFF"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Botón de Registrarse */}
      <TouchableOpacity style={styles.registerButton}
      onPress={handleRegister}>
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
