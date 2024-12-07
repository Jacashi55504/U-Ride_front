import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  const navigateToRides = () => {
    navigation.navigate('MyRides');
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={navigateToRides}
      >
        <Ionicons name="car" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.navButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#89ABE3',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#A7C7E7',
  },
  navButton: {
    padding: 10,
  },
});

export default Navbar;