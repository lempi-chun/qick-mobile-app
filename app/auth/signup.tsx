import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, GooglePlacesInput } from '../../components/ui';
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
    location: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [hidePassword, setHidePassword] = useState(true);
  
  // Validation states for each field
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [country, setCountry] = useState<Country>({
    cca2: 'US',
    callingCode: ['1'],
    name: 'United States',
    flag: 'flag-us',
  } as Country);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  // Validation functions
  const validateFirstName = (firstName: string) => {
    const isValid = firstName.trim().length >= 2;
    setIsFirstNameValid(isValid);
    return isValid;
  };

  const validateLastName = (lastName: string) => {
    const isValid = lastName.trim().length >= 2;
    setIsLastNameValid(isValid);
    return isValid;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email.trim());
    setIsEmailValid(isValid);
    return isValid;
  };

  const validatePhone = (phone: string) => {
    const isValid = phone.trim().length > 0;
    setIsPhoneValid(isValid);
    return isValid;
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    // First name validation
    if (!formData.firstName.trim()) {
      errors.firstName = t('validation.firstNameRequired');
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      errors.lastName = t('validation.lastNameRequired');
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = t('validation.emailRequired');
    } else if (!isEmailValid) {
      errors.email = t('validation.emailInvalid');
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = t('validation.phoneRequired');
    }
    
    // Location validation
    if (!formData.location.trim()) {
      errors.location = t('validation.locationRequired');
    }
    
    // Password validation
    if (!formData.password.trim()) {
      errors.password = t('validation.passwordRequired');
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    try {
      // Format phone number with country code
      const fullPhoneNumber = `+${country.callingCode[0]}${formData.phone}`;
      
      const signupData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: fullPhoneNumber,
        password: formData.password,
        location: formData.location,
      };

      console.log('Signup data:', signupData);
      Alert.alert('Success', 'Account created successfully!');
      router.push('/auth/login');
    } catch (error) {
      console.error('Sign up error:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const onSelectCountry = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
    setShowCountryPicker(false);
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
                validateFirstName(text);
                if (formErrors.firstName) {
                  setFormErrors({ ...formErrors, firstName: '' });
                }
              }}
            />
            {isFirstNameValid && (
              <View style={styles.checkContainer}>
                <MaterialIcons
                  name="check-circle"
                  size={24}
                  color={colors.clock}
                />
              </View>
            )}
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
                validateLastName(text);
                if (formErrors.lastName) {
                  setFormErrors({ ...formErrors, lastName: '' });
                }
              }}
            />
            {isLastNameValid && (
              <View style={styles.checkContainer}>
                <MaterialIcons
                  name="check-circle"
                  size={24}
                  color={colors.clock}
                />
              </View>
            )}
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
              <View style={styles.checkContainer}>
                <MaterialIcons
                  name="check-circle"
                  size={24}
                  color={colors.clock}
                />
              </View>
            )}
          </View>

          {/* PHONE INPUT */}
          <View style={styles.phoneRowContainer}>
            {/* Country Code Selector */}
            <TouchableOpacity 
              style={[styles.countryInputContainer, formErrors.phone ? styles.inputError : null]}
              onPress={() => setShowCountryPicker(true)}
              activeOpacity={0.7}
            >
              <View style={styles.flagContainer} pointerEvents="none">
                <CountryPicker
                  countryCode={countryCode}
                  visible={false}
                  onSelect={onSelectCountry}
                  withFilter={false}
                  withFlag={true}
                  withEmoji={false}
                  withCountryNameButton={false}
                  withAlphaFilter={false}
                  withCallingCode={false}
                />
                <AppText style={styles.countryCode}>
                  +{country.callingCode[0]}
                </AppText>
              </View>
              <Ionicons name="chevron-down" size={16} color={colors.secondary} />
            </TouchableOpacity>
            
            {/* Phone Number Input */}
            <View style={[styles.phoneNumberInputContainer, formErrors.phone ? styles.inputError : null]}>
              <TextInput
                style={[styles.textInput, styles.phoneInput]}
                placeholder={t('signup.phonePlaceholder')}
                placeholderTextColor={colors.secondary}
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => {
                  setFormData({ ...formData, phone: text });
                  validatePhone(text);
                  if (formErrors.phone) {
                    setFormErrors({ ...formErrors, phone: '' });
                  }
                }}
              />
              {isPhoneValid && (
                <View style={styles.checkContainer}>
                  <MaterialIcons
                    name="check-circle"
                    size={24}
                    color={colors.clock}
                  />
                </View>
              )}
            </View>
          </View>

          {/* Hidden CountryPicker for modal functionality */}
          {showCountryPicker && (
            <CountryPicker
              countryCode={countryCode}
              visible={showCountryPicker}
              onSelect={onSelectCountry}
              onClose={() => setShowCountryPicker(false)}
              withFilter={true}
              withFlag={true}
              withEmoji={false}
              withCountryNameButton={false}
              withAlphaFilter={false}
              withCallingCode={false}
            />
          )}

          {/* LOCATION INPUT */}
          <GooglePlacesInput
            placeholder={t('signup.locationPlaceholder') || 'Location (City)'}
            value={formData.location}
            error={!!formErrors.location}
            onPlaceSelected={(place) => {
              setFormData({ ...formData, location: place.description });
              if (formErrors.location) {
                setFormErrors({ ...formErrors, location: '' });
              }
            }}
            onChangeText={(text) => {
              setFormData({ ...formData, location: text });
              if (formErrors.location) {
                setFormErrors({ ...formErrors, location: '' });
              }
            }}
          />
          {formErrors.location && (
            <AppText style={styles.errorText}>
              {formErrors.location}
            </AppText>
          )}

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
    marginHorizontal: 20,
    marginTop: 40,
    lineHeight: 60,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.secondary,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainer: {
    height: 67,
    marginTop: 15,
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
  checkContainer: {
    padding: 5,
  },
  emailCheckContainer: {
    padding: 5,
  },
  locationInput: {
    flex: 1,
  },
  inputError: {
    borderColor: colors.red,
  },
  errorText: {
    fontSize: 12,
    color: colors.red,
    fontFamily: fonts.regular,
    marginHorizontal: 20,
    marginTop: 5,
  },
  signUpButton: {
    backgroundColor: colors.lime,
    height: 67,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  signUpButtonText: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: colors.primary,
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
  phoneRowContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 20,
    gap: 10,
  },
  countryInputContainer: {
    height: 67,
    width: 140,
    borderRadius: 16,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderColor: colors.secondaryThirtyPercent,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countryCode: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.primary,
  },
  phoneNumberInputContainer: {
    flex: 1,
    height: 67,
    borderRadius: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderColor: colors.secondaryThirtyPercent,
    borderWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    padding: 0,
    margin: 0,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.primary,
  },
}); 