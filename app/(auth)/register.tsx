import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppPrimaryButton } from '../../components/app-primary-button';
import { AppTextField } from '../../components/app-text-field';
import { AppColors } from '../../constants/theme';
import { useAuth } from '../../context/auth-context';
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../../lib/validators';

/**
 * Register Screen
 * Matches Flutter's RegisterPage design exactly
 */
export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading } = useAuth();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [obscurePassword, setObscurePassword] = useState(true);
  const [obscureConfirmPassword, setObscureConfirmPassword] = useState(true);

  // Error state
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  // Track if fields have been touched
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  /**
   * Handle register button press
   */
  const handleRegister = async () => {
    // Validate all fields
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(password, confirmPassword);

    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmErr);
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    // Don't proceed if there are errors
    if (nameErr || emailErr || passwordErr || confirmErr) {
      return;
    }

    try {
      await register(name.trim(), email.trim(), password);
      // Show success and navigate back
      Alert.alert('Inscription réussie', 'Compte créé avec succès ✅');
      router.back();
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

            {/* Name Field */}
            <AppTextField
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (nameTouched) {
                  setNameError(validateName(text));
                }
              }}
              hintText="Nom..."
              textInputAction="next"
              prefixIcon={<Ionicons name="person-outline" size={18} color={AppColors.secondary.peach} />}
              errorText={nameTouched ? nameError ?? undefined : undefined}
              onBlur={() => {
                setNameTouched(true);
                setNameError(validateName(name));
              }}
              autoCapitalize="words"
            />

            <View style={{ height: 14 }} />

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
              errorText={emailTouched ? emailError ?? undefined : undefined}
              onBlur={() => {
                setEmailTouched(true);
                setEmailError(validateEmail(email));
              }}
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
                if (confirmPasswordTouched) {
                  setConfirmPasswordError(
                    validateConfirmPassword(text, confirmPassword)
                  );
                }
              }}
              hintText="Mot de passe..."
              obscureText={obscurePassword}
              textInputAction="next"
              prefixIcon={<Ionicons name="lock-closed-outline" size={18} color={AppColors.secondary.peach} />}
              errorText={passwordTouched ? passwordError ?? undefined : undefined}
              onBlur={() => {
                setPasswordTouched(true);
                setPasswordError(validatePassword(password));
              }}
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

            <View style={{ height: 14 }} />

            {/* Confirm Password Field */}
            <AppTextField
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (confirmPasswordTouched) {
                  setConfirmPasswordError(
                    validateConfirmPassword(password, text)
                  );
                }
              }}
              hintText="Confirmer le mot de passe..."
              obscureText={obscureConfirmPassword}
              textInputAction="done"
              prefixIcon={<Ionicons name="lock-closed-outline" size={18} color={AppColors.secondary.peach} />}
              errorText={confirmPasswordTouched ? confirmPasswordError ?? undefined : undefined}
              onBlur={() => {
                setConfirmPasswordTouched(true);
                setConfirmPasswordError(
                  validateConfirmPassword(password, confirmPassword)
                );
              }}
              onSubmitEditing={handleRegister}
              suffixIcon={
                <TouchableOpacity
                  onPress={() =>
                    setObscureConfirmPassword(!obscureConfirmPassword)
                  }
                  style={styles.iconButton}
                >
                  <Ionicons
                    name={obscureConfirmPassword ? 'eye-off' : 'eye'}
                    size={22}
                    color={AppColors.primary.green}
                  />
                </TouchableOpacity>
              }
            />

            <View style={{ height: 18 }} />

            {/* Register Button */}
            <AppPrimaryButton
              label="S'INSCRIRE"
              onPressed={handleRegister}
              isLoading={isLoading}
            />

            <View style={{ height: 14 }} />

            {/* Login Link */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginText}>Déjà membre ? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.loginTextBold}>Se connecter</Text>
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
    height: 130,
    alignSelf: 'center',
  },
  iconButton: {
    padding: 4,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: AppColors.primary.green65,
    fontSize: 14,
  },
  loginTextBold: {
    color: AppColors.primary.green,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
