import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import { API_URL } from '../config';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {

    const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Función para hacer login
    const login = async (email, password) => {
        try {
            console.log(email)
            console.log(password)
            const response = await axios.post(`${API_URL}/login`, { email, password });
            console.log(response.data)
            const { accessToken } = response.data;
            console.log(accessToken)

            await SecureStore.setItemAsync('accessToken', accessToken);

            setUserToken(accessToken);
            return { success: true };

        } catch (error) {
            return { success: false, message: 'error' };
        }
    };
    // Función para hacer register
    const register = async (email, password) => {
        try {
            console.log('Registrando:', email, password);
            const response = await axios.post(`${API_URL}/register`, { email, password });
            console.log('Respuesta registro:', response.data);

            if (response.data) {
                // Hacer login automático después del registro
                return await login(email, password);
            }

            return { success: true };
        } catch (error) {
            console.log('Error en registro:', error);
            return { 
                success: false, 
                message: error.response?.data?.msg || 'Error en el registro. Intenta nuevamente.' 
            };
        }
    };

    // Función para hacer logout
    const logout = async () => {
        await SecureStore.deleteItemAsync('accessToken');
        setUserToken(null);
    };

    // Verifica si el usuario está logueado
    const isLoggedIn = async () => {
        const token = await SecureStore.getItemAsync('accessToken');
        if (token) setUserToken(token);
        setLoading(false);
    };

    // Configuración del interceptor de Axios
    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(async (config) => {
            const token = await SecureStore.getItemAsync('accessToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, (error) => Promise.reject(error));


        // Limpieza de interceptores al desmontar el contexto
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
        };
    }, []);

    // Efecto para verificar si está logueado al cargar la app
    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                userToken,
                login,
                logout,
                loading,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};