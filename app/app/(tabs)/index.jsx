import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '@/context/UserContext';

export default function HomeScreen() {
  const { user } = useUser();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
      <Text style={styles.motivationText}>Your health is your wealth. Keep going!</Text>
      
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sync Device</Text>
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
  }
});
