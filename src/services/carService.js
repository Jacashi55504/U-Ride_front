import axios from 'axios';
import { API_URL } from '../config';

export const getCars = async () => {
    const response = await axios.get(`${API_URL}/get_cars`);
    return response.data;
};

export const addCar = async (carData) => {
    const response = await axios.post(`${API_URL}/add_car`, carData);
    return response.data;
};

export const deleteCar = async (carId) => {
    const response = await axios.delete(`${API_URL}/delete_car/${carId}`);
    return response.data;
};
