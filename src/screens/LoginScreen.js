import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Para el fondo con degradado
import { FontAwesome5 } from '@expo/vector-icons'; // Iconos de FontAwesome

export default function LoginScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#A7C7E7', '#89ABE3']} // Fondo con colores pastel degradados
      style={styles.container}
    >
      {/* Logo y Nombre */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/logo.png')} // Cambia la ruta si es necesario
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>U-Ride</Text>
      </View>

      {/* Botón de Login con Google */}
      <TouchableOpacity style={styles.googleButton}>
      <FontAwesome5
        name="google"
        size={24}
        color="#007BFF"
        style={styles.googleIcon} // Estilo para posicionar el logo
      />
      <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
    </TouchableOpacity>


      {/* Separador */}
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>o inicia sesión con correo</Text>
        <View style={styles.separatorLine} />
      </View>

      {/* Campos de Entrada */}
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
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#FFFFFF"
          secureTextEntry
        />
      </View>

      {/* Olvidé mi contraseña */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.forgotPassword}
      >
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Botón de Iniciar Sesión */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('RoleSelection')}
        style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Apartado para registro (ubicado abajo) */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>¿No tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row', // Alinear horizontalmente
    alignItems: 'center', // Centrar verticalmente
    justifyContent: 'center', // Centrar en el ancho
    marginBottom: 50, // Espaciado debajo del logo y texto
  },
  logo: {
    width: 100, // Tamaño del logo
    height: 100,
    marginRight: 10, // Espaciado entre el logo y el texto
  },
  appName: {
    fontSize: 48, // Tamaño del texto
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center', // Centra el contenido verticalmente
    justifyContent: 'center', // Centra el texto en el botón
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 50,
    paddingHorizontal: 20, // Espaciado interno
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Para Android
    position: 'relative', // Permite posicionar el icono con `absolute`
  },
  googleIcon: {
    position: 'absolute', // El logo se posiciona de manera independiente
    left: 20, // Espaciado desde el lado izquierdo del botón
  },
  googleButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Asegura que el texto esté centrado
  },  
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40, // Más separación con los campos de entrada
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#FFFFFF',
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20, 
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8, // Espaciado entre el texto y el campo
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fondo transparente
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    color: '#FFFFFF',
    fontSize: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30, // Más espacio antes del botón de inicio de sesión
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20, // Más espacio con el texto de registro
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 40, // Colocar el texto al final de la pantalla
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  registerText: {
    color: '#FFD700', // Amarillo pastel
    fontSize: 14,
    fontWeight: 'bold',
  },
});
