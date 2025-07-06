import { authAPI, SignupRequest } from '@/apiServices/endpoints/authentication';
import { AppButton, AppInput, AppText } from '@/components/ui';
import { borderRadius, colors, spacing } from '@/constants';
import { RootState } from '@/redux/store';
import { signupFailure, signupStart, signupSuccess } from '@/redux/user/reducer';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function SignupScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.userReducer);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else {
      const phonePattern = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phonePattern.test(formData.phone)) {
        errors.phone = 'Please enter a valid phone number';
      }
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      dispatch(signupStart());

      const signupData: SignupRequest = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const response = await authAPI.signup(signupData);
      
      dispatch(signupSuccess({
        userData: response.user,
        token: response.token,
        refreshToken: response.refreshToken,
      }));

      // Navigate to OTP verification
      router.push('/auth/verify-otp');
      
    } catch (error: any) {
      dispatch(signupFailure(error.message || 'Signup failed'));
    }
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <AppText variant="heading" weight="bold" color={colors.primary}>
                Join Qick
              </AppText>
              <AppText variant="body" color={colors.secondary} style={styles.subtitle}>
                Create your account to start playing
              </AppText>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.nameRow}>
                <AppInput
                  label="First Name"
                  value={formData.firstName}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
                  placeholder="Enter first name"
                  autoCapitalize="words"
                  autoComplete="given-name"
                  error={formErrors.firstName}
                  required
                  containerStyle={styles.nameInput}
                />
                
                <AppInput
                  label="Last Name"
                  value={formData.lastName}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
                  placeholder="Enter last name"
                  autoCapitalize="words"
                  autoComplete="family-name"
                  error={formErrors.lastName}
                  required
                  containerStyle={styles.nameInput}
                />
              </View>

              <AppInput
                label="Email"
                value={formData.email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={formErrors.email}
                required
              />

              <AppInput
                label="Phone Number"
                value={formData.phone}
                onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                autoComplete="tel"
                error={formErrors.phone}
                required
              />

              <AppInput
                label="Password"
                value={formData.password}
                onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                placeholder="Create a password"
                secureTextEntry
                autoComplete="new-password"
                error={formErrors.password}
                required
              />

              <AppInput
                label="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                placeholder="Confirm your password"
                secureTextEntry
                autoComplete="new-password"
                error={formErrors.confirmPassword}
                required
              />

              {error && (
                <View style={styles.errorContainer}>
                  <AppText variant="caption" color={colors.red}>
                    {error}
                  </AppText>
                </View>
              )}

              <AppButton
                title="Create Account"
                onPress={handleSignup}
                loading={isLoading}
                disabled={isLoading}
                style={styles.signupButton}
              />
            </View>

            {/* Terms */}
            <View style={styles.termsContainer}>
              <AppText variant="caption" color={colors.secondary} style={styles.termsText}>
                By creating an account, you agree to our{' '}
                <AppText variant="caption" color={colors.lime}>
                  Terms of Service
                </AppText>
                {' '}and{' '}
                <AppText variant="caption" color={colors.lime}>
                  Privacy Policy
                </AppText>
              </AppText>
            </View>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <AppText variant="body" color={colors.secondary}>
                Already have an account?{' '}
              </AppText>
              <TouchableOpacity onPress={handleLogin}>
                <AppText variant="body" weight="semibold" color={colors.lime}>
                  Sign In
                </AppText>
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
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  form: {
    marginBottom: spacing.lg,
  },
  nameRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  nameInput: {
    flex: 1,
  },
  errorContainer: {
    backgroundColor: colors.red + '10',
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
  },
  signupButton: {
    marginTop: spacing.md,
  },
  termsContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  termsText: {
    textAlign: 'center',
    lineHeight: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 