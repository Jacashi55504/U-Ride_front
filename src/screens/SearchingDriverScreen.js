import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function SearchingDriverScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simular la navegación a la pantalla del pasajero después de 3 segundos
      navigation.replace('PassengerScreen');
    }, 3000);

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#A7C7E7', '#89ABE3']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Buscando a Conductor...</Text>
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
        <Text style={styles.subtitle}>
          Por favor espera mientras encontramos un conductor para ti.
        </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  loader: {
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
