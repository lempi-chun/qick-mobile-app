import { borderRadius, colors, fonts, fontSizes, spacing } from '@/constants';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

export interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  required?: boolean;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  variant = 'outline',
  size = 'medium',
  disabled = false,
  required = false,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyles = [
    styles.container,
    containerStyle,
  ];

  const inputContainerStyles = [
    styles.inputContainer,
    styles[`${variant}Container`],
    styles[`${size}Container`],
    isFocused && styles.focused,
    error && styles.errorContainer,
    disabled && styles.disabled,
  ];

  const inputStyles = [
    styles.input,
    styles[`${size}Input`],
    leftIcon && styles.inputWithLeftIcon,
    rightIcon && styles.inputWithRightIcon,
    disabled && styles.disabledInput,
    inputStyle,
  ];

  const labelStyles = [
    styles.label,
    styles[`${size}Label`],
    required && styles.requiredLabel,
    error && styles.errorLabel,
    labelStyle,
  ];

  const errorStyles = [
    styles.errorText,
    errorStyle,
  ];

  return (
    <View style={containerStyles}>
      {label && (
        <Text style={labelStyles}>
          {label}
          {required && <Text style={styles.asterisk}> *</Text>}
        </Text>
      )}
      
      <View style={inputContainerStyles}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={inputStyles}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          placeholderTextColor={colors.secondary}
          {...textInputProps}
        />
        
        {rightIcon && (
          <TouchableOpacity style={styles.rightIconContainer}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={errorStyles}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  
  // Input Container Variants
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  
  defaultContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryTenPercent,
    backgroundColor: colors.transparent,
  },
  
  outlineContainer: {
    borderWidth: 1,
    borderColor: colors.secondaryTenPercent,
    backgroundColor: colors.white,
  },
  
  filledContainer: {
    backgroundColor: colors.lightEventsBg,
    borderWidth: 0,
  },

  // Sizes
  smallContainer: {
    minHeight: 40,
    paddingHorizontal: spacing.sm,
  },
  
  mediumContainer: {
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  
  largeContainer: {
    minHeight: 56,
    paddingHorizontal: spacing.lg,
  },

  // Input
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    color: colors.primary,
  },
  
  smallInput: {
    fontSize: fontSizes.sm,
  },
  
  mediumInput: {
    fontSize: fontSizes.md,
  },
  
  largeInput: {
    fontSize: fontSizes.lg,
  },
  
  inputWithLeftIcon: {
    marginLeft: spacing.sm,
  },
  
  inputWithRightIcon: {
    marginRight: spacing.sm,
  },

  // Label
  label: {
    fontFamily: fonts.medium,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  
  smallLabel: {
    fontSize: fontSizes.sm,
  },
  
  mediumLabel: {
    fontSize: fontSizes.md,
  },
  
  largeLabel: {
    fontSize: fontSizes.lg,
  },
  
  requiredLabel: {
    color: colors.primary,
  },
  
  asterisk: {
    color: colors.red,
  },

  // States
  focused: {
    borderColor: colors.lime,
    borderWidth: 2,
  },
  
  errorContainer: {
    borderColor: colors.red,
    borderWidth: 1,
  },
  
  errorLabel: {
    color: colors.red,
  },
  
  disabled: {
    backgroundColor: colors.lightIconBg,
    borderColor: colors.secondaryTenPercent,
  },
  
  disabledInput: {
    color: colors.secondary,
  },

  // Icons
  leftIconContainer: {
    marginRight: spacing.xs,
  },
  
  rightIconContainer: {
    marginLeft: spacing.xs,
  },

  // Error
  errorText: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.red,
    marginTop: spacing.xs,
  },
}); 