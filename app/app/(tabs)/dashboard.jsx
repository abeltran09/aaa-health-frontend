import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function DashBoards() {
  const { user } = useUser()

  const dashboardTypes = [
    { 
      title: 'Daily Dashboards', 
      href: '/Dashboards/daily-reports',
      description: 'Dive into today\'s performance',
      gradient: ['#81C784', '#4CAF50'],
      accent: '#2E7D32'
    },
    { 
      title: 'Monthly Dashboards', 
      href: '/Dashboards/monthly-reports',
      description: 'Monthly insights',
      gradient: ['#81C784', '#4CAF50'],
      accent: '#2E7D32'
    },
    { 
      title: 'Yearly Dashboards', 
      href: '/Dashboards/yearly-reports',
      description: 'Annual performance overview',
      gradient: ['#81C784', '#4CAF50'],
      accent: '#2E7D32'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          {user?.firstname || 'User'}'s Analytics
        </Text>
      </View>
      
      <View style={styles.dashboardGrid}>
        {dashboardTypes.map((dashboard, index) => (
          <Link 
            key={index} 
            href={dashboard.href} 
            asChild
          >
            <Pressable style={styles.dashboardCard}>
              <LinearGradient
                colors={dashboard.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.cardGradient, { 
                  shadowColor: dashboard.accent 
                }]}
              >
                <View style={styles.cardContent}>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{dashboard.title}</Text>
                    <Text style={styles.cardDescription}>
                      {dashboard.description}
                    </Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <ChevronRight 
                      color="white" 
                      size={24} 
                      strokeWidth={3} 
                    />
                  </View>
                </View>
                <View 
                  style={[
                    styles.cardAccent, 
                    { backgroundColor: dashboard.accent }
                  ]} 
                />
              </LinearGradient>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    paddingTop: 50,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    letterSpacing: -1,
  },
  dashboardGrid: {
    paddingHorizontal: 20,
    gap: 20,
  },
  dashboardCard: {
    height: 180,
    borderRadius: 25,
    overflow: 'hidden',
  },
  cardGradient: {
    flex: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    zIndex: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 5,
  },
});