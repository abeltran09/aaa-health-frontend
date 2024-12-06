import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useUser } from '@/context/UserContext'

export default function DashBoards() {
  const { user } = useUser()
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {user.name}'s Dashboards</Text>

      <Link href="/Dashboards/live-reports" asChild>
        <Pressable style={styles.box}>
          <Text style={styles.boxText}>Live Dashboards</Text>
        </Pressable>
      </Link>
      <Link href="/Dashboards/daily-reports" asChild>
        <Pressable style={styles.box}>
          <Text style={styles.boxText}>Daily Dashboards</Text>
        </Pressable>
      </Link>
      <Link href="/Dashboards/monthly-reports" asChild>
        <Pressable style={styles.box}>
          <Text style={styles.boxText}>Monthly Dashboards</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20, 
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30, 
    marginBottom: 40, 
    alignSelf: 'flex-start', 
  },
  box: {
    backgroundColor: '#81C784',
    paddingVertical: 20, 
    paddingHorizontal: 40, 
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15, 
    width: '90%',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 5, 
    elevation: 5, 
  },
  boxText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold', 
  },
});

