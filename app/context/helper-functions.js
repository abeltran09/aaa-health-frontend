import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '@/context/route_ip';
import axios from 'axios';

 export const formatPhoneNumber = (number) => {
    // Remove all non-digit characters
    const cleaned = number.replace(/\D/g, '');
    
    // Check if the number is valid
    if (cleaned.length === 0) return '';
    
    // Format the number
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)})-${cleaned.slice(3)}`;
    } else if (cleaned.length <= 10) {
      return `(${cleaned.slice(0, 3)})-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else {
      // Truncate to 10 digits if longer
      return `(${cleaned.slice(0, 3)})-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  export const storeToken = async (token) => {
    try{
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      console.error('Error storing token: ', error)
    }
  };

  export const removeToken = async () => {
    try{
      await AsyncStorage.removeItem('userToken');
    }catch (error) {
      console.log('Error removing token: ', error);
      throw error;  
    }

  }

  export const fetchUserData = async (token) => {
    try{
      const response = await axios.get(`http://${IP}:8000/users/get-user/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data
    } catch (error) {
      console.log('Error fetching user data: ', error);
      throw error;
    };
  };