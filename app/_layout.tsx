import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from '../context/auth-context';
import './global.css';

/**
 * Root Layout - Configures navigation and providers
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FCF5ED' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            animation: 'none', // No animation from splash to auth
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </AuthProvider>
  );
}