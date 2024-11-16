import axios from 'axios';
import { API_URL } from '../config';

export const createRide = async (rideData) => {
    const response = await axios.post(`${API_URL}/create_ride`, rideData);
    return response.data;
};

export const getUserRides = async () => {
    const response = await axios.get(`${API_URL}/get_user_rides`);
    return response.data;
};

export const updateRide = async (rideId, updatedData) => {
    const response = await axios.put(`${API_URL}/update_ride/${rideId}`, updatedData);
    return response.data;
};

export const deleteRide = async (rideId) => {
    const response = await axios.delete(`${API_URL}/delete_ride/${rideId}`);
    return response.data;
};
