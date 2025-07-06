import { authAPI, LoginRequest } from '@/apiServices/endpoints/authentication';
import { AppText } from '@/components/ui';
import { colors, fonts } from '@/constants';
import { RootState } from '@/redux/store';
import { loginFailure, loginStart, loginSuccess } from '@/redux/user/reducer';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { isLoading, error } = useSelector((state: RootState) => state.userReducer);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [hidePassword, setHidePassword] = useState(true);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      errors.email = 'Email Address is Required';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        errors.email = 'Please enter valid email';
      }
    }

    if (!formData.password) {
      errors.password = 'Password cannot be empty!';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      dispatch(loginStart());

      const loginData: LoginRequest = {
        email: formData.email,
        password: formData.password,
      };

      const response = await authAPI.login(loginData);

      dispatch(loginSuccess({
        userData: response.data.user,
        token: response.data.token,
        refreshToken: response.data.refreshToken,
      }));

      router.replace('/(tabs)');

    } catch (error: any) {
      dispatch(loginFailure(error.message || 'Login failed'));
    }
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.light }]}>
      <StatusBar backgroundColor={colors.light} barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE */}
        <AppText style={styles.mainTitle}>
          Book, play, score.
        </AppText>

        {/* SUBTITLE */}
        <AppText style={styles.subtitle}>
          Book a field, invite your friends and split the bill in seconds.
        </AppText>

        {/* EMAIL INPUT */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.textInput, formErrors.email && styles.inputError]}
            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text.trim().toLowerCase() }))}
            value={formData.email}
            keyboardType="email-address"
            returnKeyType="next"
            placeholder="Email Address"
            placeholderTextColor={colors.secondary}
          />
        </View>
        {formErrors.email && (
          <AppText style={styles.errorText}>{formErrors.email}</AppText>
        )}

        {/* PASSWORD INPUT */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={formData.password}
            onChangeText={(text) => setFormData(prev => ({ ...prev, password: text.trim() }))}
            secureTextEntry={hidePassword}
            placeholder="Password"
            placeholderTextColor={colors.secondary}
          />
          <TouchableOpacity
            onPress={toggleHidePassword}
            style={styles.passwordToggle}
          >
            <MaterialIcons
              name={hidePassword ? "visibility-off" : "visibility"}
              size={24}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        {formErrors.password && (
          <AppText style={styles.errorText}>{formErrors.password}</AppText>
        )}

        {/* SIGN IN BUTTON */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <AppText style={styles.signInButtonText}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </AppText>
          </TouchableOpacity>
        </View>

        {/* FORGOT PASSWORD */}
        <TouchableOpacity>
          <AppText style={styles.forgotPassword}>
            Forgot your password?
          </AppText>
        </TouchableOpacity>

        {/* TERMS OF SERVICE */}
        <View style={styles.termsContainer}>
          <AppText style={styles.termsText}>
            By logging in, you confirm that you have read and accept
          </AppText>
          <View style={styles.termsRow}>
            <AppText style={styles.termsText}> qick's </AppText>
            <TouchableOpacity>
              <AppText style={{
                fontSize: 12,
                color: colors.secondary,
                fontFamily: fonts.regular,
                textDecorationLine: 'underline',
              }}>
                Terms of Service and Privacy Policy.
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1, marginVertical: 20 }} />

        {/* FOOTER */}
        <View style={[styles.footer, { width }]}>
          <AppText style={styles.footerText}>
            Don't have an account?
          </AppText>
          <TouchableOpacity onPress={() => router.push('/auth/signup')}>
            <AppText style={styles.footerLink}>
              Sign Up
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 60,
    marginLeft: 20,
    gap: 5,
  },
  logoText: {
    fontFamily: fonts.bold,
    color: colors.clock,
    fontSize: 23,
  },
  mainTitle: {
    fontFamily: fonts.bold,
    fontSize: 48,
    color: colors.primary,
    marginLeft: 20,
    marginTop: 100,
    lineHeight: 55,
  },
  subtitle: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: fonts.regular,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,

  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.secondaryThirtyPercent,
    height: 67,
    width: '90%',
    marginTop: 30,
    borderRadius: 16,
    paddingHorizontal: 20,
    alignSelf: 'center',
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary,
  },
  inputError: {
    borderColor: colors.red,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondaryThirtyPercent,
    height: 67,
    width: '90%',
    marginTop: 15,
    borderRadius: 16,
    alignSelf: 'center',
  },
  passwordInput: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary,
    height: '100%',
    paddingHorizontal: 20,
  },
  passwordToggle: {
    width: 40,
    height: 40,
    marginEnd: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 10,
    color: colors.red,
    marginLeft: 45,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    width: '90%',
    justifyContent: 'space-between',
  },
  signInButton: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lime,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    color: colors.primary,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 20,
    alignSelf: 'center',
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.footer,
  },
  termsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    marginTop: 20,
  },
  termsText: {
    fontSize: 12,
    color: colors.secondary,
    fontFamily: fonts.regular,
  },
  termsRow: {
    flexDirection: 'row',
  },
  footer: {
    height: 100,
    backgroundColor: colors.secondaryTenPercent,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    color: colors.primary,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  footerLink: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.footer,
  },
}); 