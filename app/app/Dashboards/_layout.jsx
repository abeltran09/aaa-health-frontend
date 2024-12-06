import { Stack } from 'expo-router';

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, headerBackTitle: 'Go Back', }}>
      <Stack.Screen
        name="monthly-reports"
        options={{
          title: 'Monthly Reports', // Set header title for this screen
          headerBackTitle: 'Go Back', // Change back button title
        }}
      />
    </Stack>
  );
}