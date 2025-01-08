import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, headerBackTitle: 'Go Back' }}>
      <Stack.Screen
        name="account-settings"
        options={{
          title: 'Account Settings', // Set header title for this screen
          headerBackTitle: 'Go Back', // Change back button title
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: 'Edit Profile', // Set header title for this screen
          headerBackTitle: 'Go Back', // Change back button title
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          title: 'Change Password', // Set header title for this screen
          headerBackTitle: 'Go Back', // Change back button title
        }}
      />
    </Stack>
  );
}