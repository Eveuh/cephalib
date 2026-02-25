import React, { ReactNode } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { AppColors } from '../constants/theme';

/**
 * Custom TextField Props (matching Flutter's AppTextField)
 */
export interface AppTextFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  hintText?: string;
  errorText?: string;
  obscureText?: boolean;
  keyboardType?: KeyboardTypeOptions;
  textInputAction?: 'done' | 'next' | 'go';
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  onSubmitEditing?: () => void;
  containerStyle?: ViewStyle;
  style?: TextStyle;
}

/**
 * AppTextField - Custom styled text input component
 * Matches Flutter's AppTextField design with NativeWind styling
 */
export function AppTextField({
  label,
  hintText,
  errorText,
  obscureText = false,
  keyboardType = 'default',
  textInputAction = 'done',
  prefixIcon,
  suffixIcon,
  onSubmitEditing,
  containerStyle,
  style,
  ...rest
}: AppTextFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {prefixIcon && <View style={styles.prefixIcon}>{prefixIcon}</View>}
        <TextInput
          style={[
            styles.input,
            prefixIcon ? styles.inputWithPrefix : undefined,
            errorText ? styles.inputError : undefined,
            style,
          ]}
          placeholder={hintText}
          placeholderTextColor={AppColors.primary.green40}
          secureTextEntry={obscureText}
          keyboardType={keyboardType}
          returnKeyType={textInputAction}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize="none"
          autoCorrect={false}
          {...rest}
        />

        {suffixIcon && <View style={styles.suffixIcon}>{suffixIcon}</View>}
      </View>

      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.primary.green,
    marginBottom: 6,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: AppColors.background,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: AppColors.primary.green,
    borderWidth: 1,
    borderColor: AppColors.background,
  },
  inputError: {
    borderColor: AppColors.accent.red,
    borderWidth: 1.2,
  },
  prefixIcon: {
    position: 'absolute',
    left: 22,
    zIndex: 1,
  },
  inputWithPrefix: {
    paddingLeft: 48,
  },
  suffixIcon: {
    position: 'absolute',
    right: 8,
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: AppColors.accent.red,
    marginTop: 4,
    marginLeft: 4,
  },
});
