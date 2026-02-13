import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

/**
 * Custom Button Props (matching Flutter's AppPrimaryButton)
 */
export interface AppPrimaryButtonProps {
  label: string;
  onPressed?: () => void;
  isLoading?: boolean;
  containerStyle?: ViewStyle;
}

/**
 * AppPrimaryButton - Custom styled button component
 * Matches Flutter's AppPrimaryButton design
 */
export function AppPrimaryButton({
  label,
  onPressed,
  isLoading = false,
  containerStyle,
}: AppPrimaryButtonProps) {
  const disabled = !onPressed || isLoading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        containerStyle,
      ]}
      onPress={onPressed}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color="#FCF5ED" size="small" />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DA906B',
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(218, 144, 107, 0.5)',
  },
  text: {
    color: '#FCF5ED',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
