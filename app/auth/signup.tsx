import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../../components/ui';
import { colors } from '../../constants/Colors';
import { fonts } from '../../constants/Fonts';
import { useAuth } from '../../hooks/useAuth';

export default function SignUp() {
  const { t } = useTranslation('auth');
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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

    if (!formData.firstName.trim()) {
      errors.firstName = t('validation.firstNameRequired');
    }

    if (!formData.lastName.trim()) {
      errors.lastName = t('validation.lastNameRequired');
    }

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

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      // Mock signup - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Sign up failed');
    }
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={colors.primary} />
      
      {/* NAVIGATION HEADER */}
      <View style={[styles.navHeader, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <AppText style={styles.navTitle}>{t('signup.navTitle')}</AppText>
        <View style={styles.navSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* TITLE */}
          <AppText style={styles.mainTitle}>
            {t('signup.title')}
          </AppText>

          {/* SUBTITLE */}
          <AppText style={styles.subtitle}>
            {t('signup.subtitle')}
          </AppText>

          {/* FIRST NAME INPUT */}
          <View style={[styles.inputContainer, formErrors.firstName ? styles.inputError : null]}>
            <TextInput
              style={styles.textInput}
              placeholder={t('signup.firstNamePlaceholder')}
              placeholderTextColor={colors.secondary}
              value={formData.firstName}
              onChangeText={(text) => {
                setFormData({ ...formData, firstName: text });
                if (formErrors.firstName) {
                  setFormErrors({ ...formErrors, firstName: '' });
                }
              }}
            />
          </View>

          {/* LAST NAME INPUT */}
          <View style={[styles.inputContainer, formErrors.lastName ? styles.inputError : null]}>
            <TextInput
              style={styles.textInput}
              placeholder={t('signup.lastNamePlaceholder')}
              placeholderTextColor={colors.secondary}
              value={formData.lastName}
              onChangeText={(text) => {
                setFormData({ ...formData, lastName: text });
                if (formErrors.lastName) {
                  setFormErrors({ ...formErrors, lastName: '' });
                }
              }}
            />
          </View>

          {/* EMAIL INPUT */}
          <View style={[styles.inputContainer, formErrors.email ? styles.inputError : null]}>
            <TextInput
              style={styles.textInput}
              placeholder={t('signup.emailPlaceholder')}
              placeholderTextColor={colors.secondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => {
                setFormData({ ...formData, email: text });
                validateEmail(text);
                if (formErrors.email) {
                  setFormErrors({ ...formErrors, email: '' });
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

          {/* PHONE INPUT */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={t('signup.phonePlaceholder')}
              placeholderTextColor={colors.secondary}
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => {
                setFormData({ ...formData, phone: text });
              }}
            />
          </View>

          {/* PASSWORD INPUT */}
          <View style={[styles.inputContainer, formErrors.password ? styles.inputError : null]}>
            <TextInput
              style={styles.passwordInput}
              placeholder={t('signup.passwordPlaceholder')}
              placeholderTextColor={colors.secondary}
              secureTextEntry={hidePassword}
              value={formData.password}
              onChangeText={(text) => {
                setFormData({ ...formData, password: text });
                if (formErrors.password) {
                  setFormErrors({ ...formErrors, password: '' });
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
          {/* TERMS */}
          <View style={styles.termsContainer}>
            <AppText style={styles.termsText}>
              {t('signup.termsPrefix')}
              <AppText style={styles.termsLink}> {t('signup.termsLink')}</AppText>
            </AppText>
          </View>

          {/* SIGN UP BUTTON */}
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <AppText style={styles.signUpButtonText}>
              {isLoading ? t('signup.signingUpButton') : t('signup.signUpButton')}
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={[styles.footer, { width }]}>
        <AppText style={styles.footerText}>
          {t('signup.footerText')}
        </AppText>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <AppText style={styles.footerLink}>
            {t('signup.footerLink')}
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
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: colors.white,
  },
  backButton: {
    padding: 5,
  },
  navTitle: {
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.primary,
    textAlign: 'center',
    flex: 1,
  },
  navSpacer: {
    width: 34, // Same width as back button to center the title
  },
  scrollContainer: {
    paddingBottom: 0,
  },
  content: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 52,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginLeft: 20,
    marginTop: 40,
    lineHeight: 60,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.secondary,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainer: {
    height: 67,
    width: '90%',
    marginTop: 15,
    borderRadius: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderColor: colors.secondaryThirtyPercent,
    borderWidth: 1,
    marginLeft: 20,
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
  emailCheckContainer: {
    padding: 5,
  },
  inputError: {
    borderColor: colors.red,
  },
  signUpButton: {
    backgroundColor: colors.lime,
    height: 67,
    width: '90%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 40,
  },
  signUpButtonText: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: colors.primary,
  },
  termsContainer: {
    marginTop: 28,
    marginLeft: 20,
    marginRight: 20,
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