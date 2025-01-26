import { Stack } from 'expo-router';

export default function AnthropometricLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, headerBackTitle: 'Go Back', }}>
      <Stack.Screen
        name="anthropometric"
        options={{
          title: 'Anthropometrics', // Set header title for this screen
          headerBackTitle: 'Go Back', // Change back button title
        }}
      />
    </Stack>
  );
}