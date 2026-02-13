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
        <TextInput
          style={[styles.input, style, errorText && styles.inputError]}
          placeholder={hintText}
          placeholderTextColor="rgba(67, 102, 94, 0.4)"
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
    color: '#43665E',
    marginBottom: 6,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFCF0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#43665E',
    borderWidth: 1,
    borderColor: 'rgba(67, 102, 94, 0.2)',
  },
  inputError: {
    borderColor: '#B20300',
    borderWidth: 1.5,
  },
  suffixIcon: {
    position: 'absolute',
    right: 8,
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#B20300',
    marginTop: 4,
    marginLeft: 4,
  },
});
