import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { AppText } from '../../components/ui';
import { colors } from '../../constants/Colors';
import { fonts } from '../../constants/Fonts';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const { t } = useTranslation('auth');
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [hidePassword, setHidePassword] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email.trim());
    setIsEmailValid(isValid);
    return isValid;
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      errors.email = t('validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('validation.emailInvalid');
    }

    if (!formData.password) {
      errors.password = t('validation.passwordRequired');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={colors.primary} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* TITLE */}
          <AppText style={styles.mainTitle}>
            {t('login.title')}
          </AppText>

          {/* SUBTITLE */}
          <AppText style={styles.subtitle}>
            {t('login.subtitle')}
          </AppText>

          {/* EMAIL INPUT */}
          <View style={[styles.inputContainer, formErrors.email ? styles.inputError : null]}>
            <TextInput
              style={styles.textInput}
              placeholder={t('login.emailPlaceholder')}
              placeholderTextColor={colors.secondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => {
                setFormData({...formData, email: text});
                validateEmail(text);
                if (formErrors.email) {
                  setFormErrors({...formErrors, email: ''});
                }
              }}
            />
            {isEmailValid && (
              <View style={styles.emailCheckContainer}>
                <MaterialIcons
                  name="check-circle"
                  size={24}
                  color={colors.clock}
                />
              </View>
            )}
          </View>

          {/* PASSWORD INPUT */}
          <View style={[styles.inputContainer, formErrors.password ? styles.inputError : null]}>
            <TextInput
              style={styles.passwordInput}
              placeholder={t('login.passwordPlaceholder')}
              placeholderTextColor={colors.secondary}
              secureTextEntry={hidePassword}
              value={formData.password}
              onChangeText={(text) => {
                setFormData({...formData, password: text});
                if (formErrors.password) {
                  setFormErrors({...formErrors, password: ''});
                }
              }}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={toggleHidePassword}
            >
              <Ionicons
                name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
          </View>

          {/* SIGN IN BUTTON */}
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            <AppText style={styles.signInButtonText}>
              {isLoading ? t('login.signingInButton') : t('login.signInButton')}
            </AppText>
          </TouchableOpacity>

          {/* FORGOT PASSWORD */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <AppText style={styles.forgotPassword}>
              {t('login.forgotPassword')}
            </AppText>
          </TouchableOpacity>

          {/* TERMS */}
          <View style={styles.termsContainer}>
            <AppText style={styles.termsText}>
              {t('login.termsPrefix')} 
              <AppText style={styles.termsLink}> {t('login.termsLink')}</AppText>
            </AppText>
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={[styles.footer, { width }]}>
        <AppText style={styles.footerText}>
          {t('login.footerText')}
        </AppText>
        <TouchableOpacity onPress={() => router.push('/auth/signup')}>
          <AppText style={styles.footerLink}>
            {t('login.footerLink')}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100,
  },

  content: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 52,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginHorizontal: 20,
    marginTop: 120,
    lineHeight: 55,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.secondary,
    marginHorizontal: 20,
    marginTop: 20,
  },
  inputContainer: {
    height: 67,
    marginTop: 30,
    borderRadius: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderColor: colors.secondaryThirtyPercent,
    borderWidth: 1,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.primary,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.primary,
  },
  passwordToggle: {
    padding: 5,
  },
  inputError: {
    borderColor: colors.red,
  },
  emailCheckContainer: {
    padding: 5,
  },
  signInButton: {
    backgroundColor: colors.lime,
    height: 67,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 20,
  },
  signInButtonText: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: colors.primary,
  },
  forgotPassword: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.secondary,
    marginTop: 24,
    textAlign: 'center',
  },
  termsContainer: {
    marginTop: 28,
    marginHorizontal: 20,
  },
  termsText: {
    fontSize: 14,
    color: colors.secondary,
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
  termsLink: {
    fontSize: 14,
    color: colors.secondary,
    fontFamily: fonts.regular,
    textDecorationLine: 'underline',
  },
  footer: {
    height: 100,
    backgroundColor: colors.secondaryTenPercent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    paddingBottom: 20,
    gap: 10,
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.footer,
  },
  footerLink: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: colors.footer,
  },
}); 