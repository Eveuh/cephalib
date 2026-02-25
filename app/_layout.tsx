import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AppColors } from '../constants/theme';
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
          contentStyle: { backgroundColor: AppColors.surface },
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
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            animation: 'none',
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </AuthProvider>
  );
}