import { Tabs, Stack } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

export default function AppLayout() {
  const colorScheme = 'light'
  return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors[colorScheme].tint,
          headerBackTitle: "Go Back",
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon 
              name={focused ? 'home' : 'home-outline'} 
              color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dashboards',
            headerShown: false,
            headerBackTitle: "Go Back",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon 
              name={focused ? 'analytics' : 'analytics-outline'} 
              color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon 
              name={focused ? 'settings' : 'settings-outline'} 
              color={color} />
            ),
          }}
        />
      </Tabs>
  );
}