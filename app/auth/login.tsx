import { authAPI, LoginRequest } from '@/apiServices/endpoints/authentication';
import { AppButton, AppInput, AppText } from '@/components/ui';
import { borderRadius, colors, spacing } from '@/constants';
import { RootState } from '@/redux/store';
import { loginFailure, loginStart, loginSuccess } from '@/redux/user/reducer';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.userReducer);

  const [formData, setFormData] = useState({
    identifier: '', // email or phone
    password: '',
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.identifier.trim()) {
      errors.identifier = 'Email or phone number is required';
    } else {
      // Basic email or phone validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^\+?[\d\s\-\(\)]{10,}$/;
      
      if (!emailPattern.test(formData.identifier) && !phonePattern.test(formData.identifier)) {
        errors.identifier = 'Please enter a valid email or phone number';
      }
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      dispatch(loginStart());

      // Determine if identifier is email or phone
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailPattern.test(formData.identifier);

      const loginData: LoginRequest = {
        password: formData.password,
        ...(isEmail 
          ? { email: formData.identifier }
          : { phone: formData.identifier }
        ),
      };

      const response = await authAPI.login(loginData);
      
      dispatch(loginSuccess({
        userData: response.user,
        token: response.token,
        refreshToken: response.refreshToken,
      }));

      // Navigate to main app
      router.replace('/(tabs)');
      
    } catch (error: any) {
      dispatch(loginFailure(error.message || 'Login failed'));
    }
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const handleSignUp = () => {
    router.push('/auth/signup');
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
                Welcome Back
              </AppText>
              <AppText variant="body" color={colors.secondary} style={styles.subtitle}>
                Sign in to continue playing
              </AppText>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <AppInput
                label="Email or Phone"
                value={formData.identifier}
                onChangeText={(text) => setFormData(prev => ({ ...prev, identifier: text }))}
                placeholder="Enter your email or phone number"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={formErrors.identifier}
                required
              />

              <AppInput
                label="Password"
                value={formData.password}
                onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                placeholder="Enter your password"
                secureTextEntry
                autoComplete="password"
                error={formErrors.password}
                required
              />

              <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
                <AppText variant="body" color={colors.lime}>
                  Forgot Password?
                </AppText>
              </TouchableOpacity>

              {error && (
                <View style={styles.errorContainer}>
                  <AppText variant="caption" color={colors.red}>
                    {error}
                  </AppText>
                </View>
              )}

              <AppButton
                title="Sign In"
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                style={styles.loginButton}
              />
            </View>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <AppText variant="body" color={colors.secondary}>
                Don't have an account?{' '}
              </AppText>
              <TouchableOpacity onPress={handleSignUp}>
                <AppText variant="body" weight="semibold" color={colors.lime}>
                  Sign Up
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
    marginBottom: spacing.xxl,
    marginTop: spacing.xl,
  },
  subtitle: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  form: {
    marginBottom: spacing.xl,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  errorContainer: {
    backgroundColor: colors.red + '10',
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
  },
  loginButton: {
    marginTop: spacing.md,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
}); 