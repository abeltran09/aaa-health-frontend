import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useUser } from '@/context/UserContext';
import { removeToken } from '@/context/helper-functions'
import { useRouter, Link } from 'expo-router';

export default function SettingsScreen() {

  const { setUser } = useUser();
  const router = useRouter()
  const handleLogout = async () => {
    setUser(null);
    await removeToken();
    router.replace('(login)')
  };

  const handleAccountSettings = () => {
    router.push('/settingpages/account-settings')
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.option} onPress={handleAccountSettings}>
        <Text style={styles.optionText}>Account Settings</Text>
      </TouchableOpacity>

      <View style={styles.line} />

      <TouchableOpacity style={styles.option} onPress={() => console.log('Notification settings')}>
        <Text style={styles.optionText}>Notifications</Text>
      </TouchableOpacity>

      <View style={styles.line} />

      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <Text style={styles.optionText}>Logout</Text>
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
  option: {
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
});

