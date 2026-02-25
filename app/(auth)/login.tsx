import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppPrimaryButton } from '../../components/app-primary-button';
import { AppTextField } from '../../components/app-text-field';
import { AppColors } from '../../constants/theme';
import { useAuth } from '../../context/auth-context';
import { validateEmail, validatePassword } from '../../lib/validators';

/**
 * Login Screen
 * Matches Flutter's LoginPage design exactly
 */
export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [obscurePassword, setObscurePassword] = useState(true);

  // Error state
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Track if fields have been touched
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  /**
   * Validate email field
   */
  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  /**
   * Validate password field
   */
  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    setPasswordError(validatePassword(password));
  };

  /**
   * Handle login button press
   */
  const handleLogin = async () => {
    // Validate all fields
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setEmailTouched(true);
    setPasswordTouched(true);

    // Don't proceed if there are errors
    if (emailErr || passwordErr) {
      return;
    }

    try {
      await login(email.trim(), password);
      // Navigate to home tabs after successful login
      router.replace('/(tabs)/home');
    } catch (error) {
      // Error already handled by context
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            {/* Spacing from top */}
            <View style={{ height: 18 }} />

            {/* Logo */}
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={{ height: 26 }} />

            {/* Email Field */}
            <AppTextField
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailTouched) {
                  setEmailError(validateEmail(text));
                }
              }}
              hintText="Email..."
              keyboardType="email-address"
              textInputAction="next"
              prefixIcon={<Ionicons name="mail-outline" size={18} color={AppColors.secondary.peach} />}
              errorText={emailTouched ? emailError || undefined : undefined}
              onBlur={handleEmailBlur}
              autoCapitalize="none"
            />

            <View style={{ height: 14 }} />

            {/* Password Field */}
            <AppTextField
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordTouched) {
                  setPasswordError(validatePassword(text));
                }
              }}
              hintText="Mot de passe..."
              obscureText={obscurePassword}
              textInputAction="done"
              prefixIcon={<Ionicons name="lock-closed-outline" size={18} color={AppColors.secondary.peach} />}
              errorText={passwordTouched ? passwordError || undefined : undefined}
              onBlur={handlePasswordBlur}
              onSubmitEditing={handleLogin}
              suffixIcon={
                <TouchableOpacity
                  onPress={() => setObscurePassword(!obscurePassword)}
                  style={styles.iconButton}
                >
                  <Ionicons
                    name={obscurePassword ? 'eye-off' : 'eye'}
                    size={22}
                    color={AppColors.primary.green}
                  />
                </TouchableOpacity>
              }
            />

            <View style={{ height: 8 }} />

            {/* Forgot Password Link */}
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity
                onPress={() => router.push('/(auth)/forgot-password')}
              >
                <View style={styles.forgotPasswordLink}>
                  <Text style={styles.forgotPasswordText}>
                    Un trou de mémoire ?
                  </Text>
                  <Text style={styles.forgotPasswordTextBold}>
                    {' '}
                    On s'en occupe
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ height: 10 }} />

            {/* Login Button */}
            <AppPrimaryButton
              label="SE CONNECTER"
              onPressed={handleLogin}
              isLoading={isLoading}
            />

            <View style={{ height: 14 }} />

            {/* Register Link */}
            <View style={styles.registerLinkContainer}>
              <Text style={styles.registerText}>Pas encore membre ? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text style={styles.registerTextBold}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.surface,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 26,
    paddingVertical: 18,
  },
  form: {
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  logo: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  forgotPasswordLink: {
    flexDirection: 'row',
  },
  forgotPasswordText: {
    color: AppColors.primary.green,
    fontSize: 14,
  },
  forgotPasswordTextBold: {
    color: AppColors.primary.green,
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 4,
  },
  registerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: AppColors.primary.green65,
    fontSize: 14,
  },
  registerTextBold: {
    color: AppColors.primary.green,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
