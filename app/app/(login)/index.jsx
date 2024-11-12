import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';

const AuthScreen = () => {
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

  const handleAuthAction = async () => {
    if (isRegister) {
      const formData = new FormData();
      formData.append('first_name', firstname);
      formData.append('last_name', lastname);
      formData.append('email', email);
      formData.append('phone_number', phonenumber);
      formData.append('password', password);
      try {
        const response = await axios.post('http://192.168.1.66:8000/users/register-user/', formData);
        console.log('Registration successful:', response.data);
      } catch (error) {
        console.error('Error registering user:', error.response ? error.response.data.detail : error.message);
      }
    } else {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      try {
        const response = await axios.post('http://10.10.160.36:8000/users/login-user/', formData);
        console.log('Login successful:', response.data);
        router.replace('(tabs)')
      } catch (error) {
        console.error('Error registering user:', error.response ? error.response.data.detail : error.message);
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

