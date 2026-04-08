import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import './../i18n'; // Import i18n configuration

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false, // Default to true if you want bars, false for full splash/login
          animation: 'fade', // Smooth transitions
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/forget-password" />
        <Stack.Screen name="(auth)/create-password" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
