import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Dimensions, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useUser } from '@/context/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { IP } from '@/context/route_ip'

const { width } = Dimensions.get('window');

const Daily_Health = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [healthData, setHealthData] = useState({
    hourly_averages: {
      hours: [],
      heart_rate: [],
      hrv: []
    },
    latest: {
      heart_rate: 0,
      hrv: 0,
      timestamp: new Date().toISOString()
    },
    daily_average: {
      heart_rate: 0,
      hrv: 0
    }
  });
  
  const websocketRef = useRef(null);

  useEffect(() => {

    if (!user?.user_id) return;
    
    // Connect to WebSocket for real-time updates
    const wsUrl = `ws://${IP}:8000/aaa-health/api/v1/ws/daily-updates?user_id=${user.user_id}`;
    websocketRef.current = new WebSocket(wsUrl);
    
    websocketRef.current.onopen = () => {
      console.log('WebSocket connected');
      
    };
    
    websocketRef.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('Dash Parsed data:', message); // Debugging output
      
          if (message.type === 'daily_metrics_update') {
            setLoading(false)
            // Ensure arrays exist
            if (message.data.hourly_averages.hours && message.data.hourly_averages.heart_rate) {
              setHealthData({
                hourly_averages: message.data.hourly_averages,
                latest: message.data.latest,
                daily_average: message.data.daily_average,
              });
            } else {
              console.error('Invalid hourly averages data:', message.data.hourly_averages);
            }
          } 
          
          else if (message.type === 'metrics_update') {
            // Update latest metrics in the state dynamically
            setHealthData(prevState => ({
              ...prevState,
              latest: {
                heart_rate: message.data.current_heart_rate,
                hrv: message.data.heart_rate_variability, 
                timestamp: new Date().toISOString(),
              },
              daily_average: {
                heart_rate: message.data.avg_heart_rate || 0,
                hrv: message.data.avg_heart_rate_variability || 0,
              },
            }));
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    
    websocketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    websocketRef.current.onclose = () => {
      console.log('WebSocket closed');
    };
    
    // Cleanup on unmount
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, [user]);

  // Calculate heart rate status
  const getHeartRateStatus = (rate) => {
    if (rate < 60) return { label: 'Low', color: '#3498db' };
    if (rate > 100) return { label: 'High', color: '#e74c3c' };
    return { label: 'Normal', color: '#2ecc71' };
  };
  
  // Calculate HRV status
  const getHRVStatus = (hrv) => {
    if (hrv < 20) return { label: 'Low', color: '#e74c3c' };
    if (hrv > 60) return { label: 'Excellent', color: '#2ecc71' };
    return { label: 'Normal', color: '#3498db' };
  };
  
  const heartRateStatus = getHeartRateStatus(healthData.latest.heart_rate);
  const hrvStatus = getHRVStatus(healthData.latest.hrv);
  
  // Chart configurations
  const heartRateChartConfig = {
    backgroundGradientFrom: '#ff9ff3',
    backgroundGradientTo: '#f368e0',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#ffeaa7',
    },
  };
  
  const hrvChartConfig = {
    backgroundGradientFrom: '#6ab04c',
    backgroundGradientTo: '#badc58',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#f0932b',
    },
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading health data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Daily Health Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>
        
        <View style={styles.metricsContainer}>
          {/* Current Heart Rate Card */}
          <View style={[styles.metricCard, { borderLeftColor: heartRateStatus.color }]}>
            <View style={styles.metricIconContainer}>
              <MaterialCommunityIcons name="heart-pulse" size={36} color="#e74c3c" />
            </View>
            <View style={styles.metricDetails}>
              <Text style={styles.metricLabel}>Current Heart Rate</Text>
              <Text style={styles.metricValue}>
                {healthData.latest.heart_rate.toFixed(0)} <Text style={styles.metricUnit}>BPM</Text>
              </Text>
              <View style={[styles.statusPill, { backgroundColor: heartRateStatus.color }]}>
                <Text style={styles.statusText}>{heartRateStatus.label}</Text>
              </View>
            </View>
          </View>
          
          {/* Current HRV Card */}
          <View style={[styles.metricCard, { borderLeftColor: hrvStatus.color }]}>
            <View style={styles.metricIconContainer}>
              <Ionicons name="fitness" size={36} color="#3498db" />
            </View>
            <View style={styles.metricDetails}>
              <Text style={styles.metricLabel}>Heart Rate Variability</Text>
              <Text style={styles.metricValue}>
                {healthData.latest.hrv.toFixed(0)} <Text style={styles.metricUnit}>ms</Text>
              </Text>
              <View style={[styles.statusPill, { backgroundColor: hrvStatus.color }]}>
                <Text style={styles.statusText}>{hrvStatus.label}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Daily Average Card */}
        <View style={styles.averageCard}>
          <Text style={styles.sectionTitle}>Daily Averages</Text>
          <View style={styles.averagesContainer}>
            <View style={styles.averageItem}>
              <Text style={styles.averageLabel}>Heart Rate</Text>
              <Text style={styles.averageValue}>{healthData.daily_average.heart_rate.toFixed(0)} BPM</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.averageItem}>
              <Text style={styles.averageLabel}>HRV</Text>
              <Text style={styles.averageValue}>{healthData.daily_average.hrv.toFixed(0)} ms</Text>
            </View>
          </View>
        </View>
        
        {/* Heart Rate Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Heart Rate Trend (Today)</Text>
          <LineChart
            data={{
              labels: healthData.hourly_averages.hours,
              datasets: [
                {
                  data: healthData.hourly_averages.heart_rate.length > 0 ? 
                         healthData.hourly_averages.heart_rate : 
                         [0, 0],
                },
              ],
            }}
            width={width - 40}
            height={220}
            yAxisSuffix=" bpm"
            chartConfig={heartRateChartConfig}
            bezier
            style={styles.chart}
            fromZero
          />
        </View>
        
        {/* HRV Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Heart Rate Variability (Today)</Text>
          <LineChart
            data={{
              labels: healthData.hourly_averages.hours,
              datasets: [
                {
                  data: healthData.hourly_averages.hrv.length > 0 ? 
                         healthData.hourly_averages.hrv : 
                         [0, 0],
                },
              ],
            }}
            width={width - 40}
            height={220}
            yAxisSuffix=" ms"
            chartConfig={hrvChartConfig}
            bezier
            style={styles.chart}
            fromZero
          />
        </View>
        
        <View style={styles.updateInfo}>
          <Text style={styles.updateText}>
            Last updated: {new Date(healthData.latest.timestamp).toLocaleTimeString()}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  metricsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    gap: 15,
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
  },
  metricIconContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#f2f2f2',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  metricDetails: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  metricUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  averageCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  averagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  averageItem: {
    alignItems: 'center',
  },
  averageLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  averageValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  updateInfo: {
    padding: 20,
    alignItems: 'center',
  },
  updateText: {
    fontSize: 12,
    color: '#888',
  },
});

export default Daily_Health;