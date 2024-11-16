import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import { getCars, addCar } from '../services/carService';

export default function CarManagementScreen() {
    const [cars, setCars] = useState([]);
    const [newCar, setNewCar] = useState({
        modelo: '',
        año: '',
        color: '',
        placas: '',
    });

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await getCars();
            setCars(response);
        } catch (error) {
            alert('Error al obtener los autos.');
        }
    };

    const handleAddCar = async () => {
        try {
            await addCar(newCar);
            alert('Auto agregado correctamente.');
            fetchCars();
        } catch (error) {
            alert('Error al agregar el auto.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Autos</Text>
            <FlatList
                data={cars}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.carItem}>
                        <Text>{`${item.modelo} - ${item.año} - ${item.color}`}</Text>
                    </View>
                )}
            />
            <View style={styles.addCarContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Modelo"
                    value={newCar.modelo}
                    onChangeText={(text) => setNewCar({ ...newCar, modelo: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Año"
                    value={newCar.año}
                    onChangeText={(text) => setNewCar({ ...newCar, año: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Color"
                    value={newCar.color}
                    onChangeText={(text) => setNewCar({ ...newCar, color: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Placas"
                    value={newCar.placas}
                    onChangeText={(text) => setNewCar({ ...newCar, placas: text })}
                />
                <Button title="Agregar Auto" onPress={handleAddCar} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#007BFF',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    carItem: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    addCarContainer: {
        marginTop: 20,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});
