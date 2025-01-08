import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import { IP } from '@/context/route_ip'

export default function ChangePassword() {
  const { user } = useUser(); // Access user and updateUser from context
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      // Create FormData with current email as a separate field
      const requestData = new FormData();
      requestData.append('old_password', formData.old_password);
      requestData.append('new_password', formData.new_password);
      requestData.append('confirm_new_password', formData.confirm_new_password);
      requestData.append('current_email', user.email); // Add current email for lookup

      const response = await axios.put(`http://${IP}:8000/users/update-user-password/`, requestData);

      if (response.status === 200) {
        Alert.alert('Success', 'Password updated successfully');
      } else {
        Alert.alert('Error', 'Failed to update password, Make sure you entered information correctly');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', error.response?.data?.message || 'An error occurred while updating password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Old Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange('old_password', text)}
          placeholder='Enter Old Password'
        />

        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange('new_password', text)}
          placeholder='Enter New Password'
        />

        <Text style={styles.label}>Comfirm New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange('confirm_new_password', text)}
          placeholder="Enter New Password"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
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
