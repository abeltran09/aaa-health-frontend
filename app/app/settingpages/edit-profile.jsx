import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import { IP } from '@/context/route_ip'
import { formatPhoneNumber } from '@/context/helper-functions';
import { useRouter } from 'expo-router'

export default function EditProfile() {
  const router = useRouter()
  const { user, setUser } = useUser(); // Access user and updateUser from context
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email, // Prefill with current email
    phonenumber: user.phonenumber,
  });

  const handleInputChange = (field, value) => {
    if(field == 'phonenumber'){
      value = formatPhoneNumber(value)
    }
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      // Create FormData with current email as a separate field
      const requestData = new FormData();
      requestData.append('new_first_name', formData.firstname || user.firstname);
      requestData.append('new_last_name', formData.lastname || user.lastname);
      requestData.append('new_phone_number', formData.phonenumber || user.phonenumber);
      requestData.append('new_email', formData.email || user.email); // Use new email if provided, otherwise current email
      requestData.append('current_email', user.email); // Add current email for lookup

      const response = await axios.put(`http://${IP}:8000/users/edit-profile/`, requestData);

      if (response.status === 200) {
        setUser({ firstname: response.data.first_name, 
            lastname: response.data.last_name,
            email: response.data.email,
            phonenumber: response.data.phone_number });
        Alert.alert('Success', 'Profile updated successfully');
        router.push('/settingpages/account-settings')
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', error.response?.data?.message || 'An error occurred while updating profile');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={formData.firstname}
            onChangeText={(text) => handleInputChange('firstname', text)}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={formData.lastname}
            onChangeText={(text) => handleInputChange('lastname', text)}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            placeholder="Enter new email (optional)"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={formData.phonenumber}
            onChangeText={(text) => handleInputChange('phonenumber', text)}
            keyboardType="phone-pad"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#81C784',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
