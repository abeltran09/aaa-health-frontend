import React from 'react';
import { LineChart } from "react-native-chart-kit";
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const Avg_Monthly_BPM = () =>  {
  const chartConfig = {
    backgroundGradientFrom: "#9ABF80",
    backgroundGradientTo: "#9EDF9C",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4", // Reduce dot size to fit smaller chart
      strokeWidth: "1",
      stroke: "#FBF8EF",
    },
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Average Monthly Heart Rate (in bpm)</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            datasets: [{ data: [84, 76, 68, 70, 75, 82, 69] }],
          }}
          width={screenWidth * 0.9} // Scale to 90% of screen width
          height={250} // Adjust height for better proportions
          yAxisSuffix="bpm"
          chartConfig={chartConfig}
          bezier
          style={{
            borderRadius: 16,
            alignSelf: "center", // Center the chart
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '98%', // Keep the container slightly smaller than the screen
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
});

export default Avg_Monthly_BPM;