import { colors, fonts, fontSizes, lineHeights } from '@/constants';
import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

export interface AppTextProps {
  children: React.ReactNode;
  variant?: 'body' | 'caption' | 'subtitle' | 'title' | 'heading';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: string;
  size?: number;
  align?: 'left' | 'center' | 'right';
  style?: TextStyle;
  numberOfLines?: number;
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'body',
  weight = 'regular',
  color,
  size,
  align = 'left',
  style,
  numberOfLines,
}) => {
  const textStyle = [
    styles.text,
    styles[variant],
    styles[weight],
    color && { color },
    size && { fontSize: size },
    align && { textAlign: align },
    style,
  ];

  return (
    <Text style={textStyle} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.primary,
  },

  // Variants
  body: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
  caption: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },
  subtitle: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
  },
  title: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
  },
  heading: {
    fontSize: fontSizes.heading,
    lineHeight: lineHeights.heading,
  },

  // Weights
  light: {
    fontFamily: fonts.light,
  },
  regular: {
    fontFamily: fonts.regular,
  },
  medium: {
    fontFamily: fonts.medium,
  },
  semibold: {
    fontFamily: fonts.semibold,
  },
  bold: {
    fontFamily: fonts.bold,
  },
  extrabold: {
    fontFamily: fonts.extrabold,
  },
}); 