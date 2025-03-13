import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUser } from '@/context/UserContext';
import { IP } from '@/context/route_ip'

export default function HomeScreen() {
  const { user } = useUser();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const sendUserId = async () => {
    console.log(user.user_id)
    if (!user.user_id) {
      Alert.alert('Error', 'User ID is missing');
      return;
    }
    
    setIsConnecting(true);
    
    try {
      const response = await axios.post(`http://${IP}:8000/aaa-health/api/v1/ws/set-user-id/`, {
        user_id: user.user_id
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      Alert.alert('Success', 'Device connected successfully');
      setIsConnected(true)
      
    } catch (error) {
      console.error('Error connecting device:', error);
      
      if (error.response) {
        Alert.alert('Error', error.response.data.detail || 'Failed to connect device');
      } else if (error.request) {
        Alert.alert('Error', 'No response from server. Check your connection.');
      } else {
        Alert.alert('Error', 'Connection failed. Please try again.');
      }
    } finally {
      setIsConnecting(false);
    }

  };

  const disconnectDevice = async () => {
    if (!user.user_id) {
      Alert.alert('Error', 'User ID is missing');
      return;
    }
    
    setIsConnecting(true);
    
    try {
      const response = await axios.post(`http://${IP}:8000/aaa-health/api/v1/ws/disconnect-device/`, {
        user_id: user.user_id
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      Alert.alert('Success', 'Device disconnected successfully');
      setIsConnected(false);
      
    } catch (error) {
      console.error('Error disconnecting device:', error);
      
      if (error.response) {
        Alert.alert('Error', error.response.data.detail || 'Failed to disconnect device');
      } else if (error.request) {
        Alert.alert('Error', 'No response from server. Check your connection.');
      } else {
        Alert.alert('Error', 'Disconnection failed. Please try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.welcomeText}>Welcome, {user?.firstname || 'User'}!</Text>
      <Text style={styles.motivationText}>Your health is your wealth. Keep going!</Text>

      {/* Device Connection Status Section */}
      <View style={styles.deviceStatusContainer}>
        <Text style={styles.deviceStatusText}>Device Status: </Text>
        <Text style={[styles.deviceStatus, isConnected ? styles.connected : styles.disconnected]}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </Text>
      </View>
      
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.button} onPress={isConnected ? disconnectDevice : sendUserId} disabled={isConnecting}>
          <Text style={styles.buttonText}>{isConnected ? "Disconnect Device" : "Sync Device"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>My Measurements</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.metrics}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Steps</Text>
          <Text style={styles.metricValue}>10,250</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Heart Rate</Text>
          <Text style={styles.metricValue}>72 bpm</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Calories Burned</Text>
          <Text style={styles.metricValue}>450 kcal</Text>
        </View>
      </View>
      <Text style={styles.tipsHeader}>Guides</Text>
      <View style={styles.guides}>
        <TouchableOpacity style={styles.guideCard}>
          <Text style={styles.guideText}>How to sync device</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.guideCard}>
          <Text style={styles.guideText}>Undertsanding health metrics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.guideCard}>
          <Text style={styles.guideText}>Exploring app features</Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.tipsHeader}>Health Tips</Text>
      <Text style={styles.tip}>💡 Drink 2 liters of water daily for better hydration.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    marginTop: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  motivationText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#81C784',
    padding: 20,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  metricLabel: {
    fontSize: 14,
    color: '#888',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  tipsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tip: {
    fontSize: 14,
    color: '#444',
  },
  guides: {
    flexDirection: 'column',
    
  },
  guideCard: {
    backgroundColor: '#81C784',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'Left',
    marginBottom: 10,
  },
  guideText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  deviceStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  deviceStatusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  deviceStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  connected: {
    color: '#4CAF50',
  },
  disconnected: {
    color: '#F44336',
  },

});
