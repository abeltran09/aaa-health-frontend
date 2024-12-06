import { Stack } from "expo-router";
import UserProvider from "@/context/UserContext"

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerBackTitle: "Go Back" }} >
        <Stack.Screen name="(login)" options={{ headerShown: false }}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        <Stack.Screen name="Dashboards" options={{ headerShown: true }} />
      </Stack>
    </UserProvider>
  );
}