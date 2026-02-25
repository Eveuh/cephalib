import { Stack } from 'expo-router';
import { AppColors } from '../../constants/theme';

/**
 * Auth Stack Layout
 * Handles navigation for authentication screens (login, register, forgot-password)
 */

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: AppColors.surface },
        // animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          animation: 'fade', // No animation when coming from splash
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          animation: 'slide_from_right', // Slide in from right
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          animation: 'slide_from_right', // Slide in from right
        }}
      />
    </Stack>
  );
}
