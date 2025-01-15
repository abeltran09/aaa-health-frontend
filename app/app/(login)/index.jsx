import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import { useUser } from '@/context/UserContext';
import { IP } from '@/context/route_ip'

const AuthScreen = () => {
  const { setUser } = useUser();
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  //const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, ''); // Remove non-digit characters
    if (cleaned.length !== 10) {
      return null; // Return null if the number doesn't have 10 digits
    }
    return `(${cleaned.slice(0, 3)})-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  };

  const handleAuthAction = async () => {
    if (isRegister) {
      const formattedPhone = formatPhoneNumber(phonenumber);
      if (!formattedPhone) {
        Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
        return;
      }
      else{
        setPhoneNumber(formatPhoneNumber)
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }

      if (password.length < 6) {
        Alert.alert('Invalid Password', 'Password must be at least 6 characters long.');
        return;
      }

      const formData = new FormData();
      formData.append('first_name', firstname);
      formData.append('last_name', lastname);
      formData.append('email', email.toLowerCase());
      formData.append('phone_number', formattedPhone);
      formData.append('password', password);
      try {
        const response = await axios.post(`http://${IP}:8000/users/register-user/`, formData);
        console.log('Registration successful:', response.data);
        setUser({ firstname: response.data.first_name, 
                  lastname: response.data.last_name,
                  email: response.data.email,
                  phonenumber: response.data.phone_number });
        router.replace('(tabs)')
      } catch (error) {
        console.error('Error registering user:', error.response ? error.response.data.detail : error.message);
      }
    } else {
      const formData = new FormData();
      formData.append('email', email.toLowerCase());
      formData.append('password', password);
      try {
        const response = await axios.post(`http://${IP}:8000/users/login-user/`, formData);
        console.log('Login successful:', response.data);
        setUser({ firstname: response.data.first_name, 
          lastname: response.data.last_name,
          email: response.data.email,
          phonenumber: response.data.phone_number });
        router.replace('(tabs)')
      } catch (error) {
        const errorMessage = error.response?.data?.detail || 'An error occurred during login.';
        Alert.alert('Login Failed', errorMessage);
        console.error('Error logging in user:', errorMessage);
      }
    }
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.maintitle}>Welcome to AAA-Health</Text>
          <Text style={styles.title}>{isRegister ? 'Register' : 'Login'}</Text>
          {isRegister && (
            <>
              <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstname}
              onChangeText={setFirstName}
              placeholderTextColor="gray"
              />
              <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastname}
              onChangeText={setLastName}
              placeholderTextColor="gray"
              /> 
              <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phonenumber}
              onChangeText={setPhoneNumber}
              placeholderTextColor="gray"
              /> 
            </>
          )}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="gray"
            keyboardType="email-address"
            textContentType='oneTimeCode'
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="gray"
            textContentType='oneTimeCode'
          />

          <TouchableOpacity style={styles.button} onPress={handleAuthAction}>
            <Text style={styles.buttonText}>{isRegister ? 'Register' : 'Login'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
            <Text style={styles.switchText}>
              {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </Text>
          </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  maintitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#81C784',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#81C784',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#81C784',
  },
  containerview: {
    flex: 1,
  },
});

export default AuthScreen;