import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export async function getAllReservations() {
  const config = {
    headers: { Authorization: await AsyncStorage.getItem("authToken")}
  };
  return await axios.get('https://localhost:44336/api/member/reservations', config)
    .then(response => {
      return response.data;
    }).catch(error => {
      console.error(error);
    });
}

export async function getReservationById(id: number) {
  const config = {
    headers: { Authorization: await AsyncStorage.getItem("authToken")}
  };
  return await axios.get(`https://localhost:44336/api/member/reservations/${id}`, config)
    .then(response => {
      return response.data;
    }).catch(error => {
      console.error(error);
    });
}