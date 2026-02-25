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
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppPrimaryButton } from '../../components/app-primary-button';
import { AppTextField } from '../../components/app-text-field';
import { AppColors } from '../../constants/theme';
import { useAuth } from '../../context/auth-context';
import { validateEmail } from '../../lib/validators';
/**
 * Forgot Password Screen
 * Matches Flutter's ForgotPasswordPage design exactly
 */
export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { resetPassword, isLoading } = useAuth();

  // Form state
  const [email, setEmail] = useState('');

  // Error state
  const [emailError, setEmailError] = useState<string | null>(null);

  // Track if field has been touched
  const [emailTouched, setEmailTouched] = useState(false);

  /**
   * Handle email blur
   */
  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  /**
   * Handle send button press
   */
  const handleSend = async () => {
    // Validate email
    const emailErr = validateEmail(email);

    setEmailError(emailErr);
    setEmailTouched(true);

    // Don't proceed if there are errors
    if (emailErr) {
      return;
    }

    try {
      await resetPassword(email.trim());
      // Alert is shown by the context
      // Navigate back after success
      setTimeout(() => {
        router.back();
      }, 1500);
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

            {/* Title */}
            <Text style={styles.title}>Mot de passe oublié</Text>

            <View style={{ height: 10 }} />

            {/* Subtitle */}
            <Text style={styles.subtitle}>
              Tu recevras un lien pour réinitialiser ton mot
              de passe.
            </Text>

            <View style={{ height: 24 }} />

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
              textInputAction="done"
              prefixIcon={<Ionicons name="mail-outline" size={18} color={AppColors.secondary.peach} />}
              errorText={emailTouched ? emailError || undefined : undefined}
              onBlur={handleEmailBlur}
              onSubmitEditing={handleSend}
              autoCapitalize="none"
            />

            <View style={{ height: 18 }} />

            {/* Send Button */}
            <AppPrimaryButton
              label="ENVOYER"
              onPressed={handleSend}
              isLoading={isLoading}
            />

            <View style={{ height: 14 }} />

            {/* Back to Login Link */}
            <View style={styles.backLinkContainer}>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.backLink}>Retour</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.primary.green,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: AppColors.primary.green75,
    textAlign: 'center',
    lineHeight: 20,
  },
  backLinkContainer: {
    alignItems: 'center',
  },
  backLink: {
    color: AppColors.primary.green,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
