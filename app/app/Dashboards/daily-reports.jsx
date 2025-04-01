import React from 'react';
import { View, StyleSheet } from 'react-native';
import Daily_Health from '../../components/Dashboards/daily_health';

export default function DailyReport() {
  return (
    <View style={styles.container}>
      <Daily_Health />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});