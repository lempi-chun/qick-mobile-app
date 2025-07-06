import { authAPI, SignupRequest } from '@/apiServices/endpoints/authentication';
import { AppText } from '@/components/ui';
import { colors, fonts } from '@/constants';
import { RootState } from '@/redux/store';
import { signupFailure, signupStart, signupSuccess } from '@/redux/user/reducer';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUpScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const { isLoading, error } = useSelector((state: RootState) => state.userReducer);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [hidePassword, setHidePassword] = useState(true);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name cannot be empty';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name cannot be empty';
    }
    
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

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      dispatch(signupStart());

      const signupData: SignupRequest = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      };

      const response = await authAPI.signup(signupData);
      
      dispatch(signupSuccess({
        userData: response.data.user,
        token: response.data.token,
        refreshToken: response.data.refreshToken,
      }));

      router.replace('/(tabs)');
      
    } catch (error: any) {
      dispatch(signupFailure(error.message || 'Sign up failed'));
    }
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleSignIn = () => {
    router.push('/auth/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.light }]}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.content, { width: width * 0.9 }]}>
            {/* TITLE */}
            <AppText style={styles.mainTitle}>
              Experience the game like never before
            </AppText>

            {/* SUBTITLE */}
            <AppText style={styles.subtitle}>
              Welcome to the qick community
            </AppText>

            {/* FIRST NAME INPUT */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, formErrors.firstName && styles.inputError]}
                onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
                value={formData.firstName}
                placeholder="First Name"
                placeholderTextColor={colors.secondary}
              />
            </View>
            {formErrors.firstName && (
              <AppText style={styles.errorText}>{formErrors.firstName}</AppText>
            )}

            {/* LAST NAME INPUT */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, formErrors.lastName && styles.inputError]}
                onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
                value={formData.lastName}
                placeholder="Last Name"
                placeholderTextColor={colors.secondary}
              />
            </View>
            {formErrors.lastName && (
              <AppText style={styles.errorText}>{formErrors.lastName}</AppText>
            )}

            {/* EMAIL INPUT */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, formErrors.email && styles.inputError]}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text.trim().toLowerCase() }))}
                value={formData.email}
                placeholder="Email Address"
                placeholderTextColor={colors.secondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {formErrors.email && (
              <AppText style={styles.errorText}>{formErrors.email}</AppText>
            )}

            {/* PHONE INPUT */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, formErrors.phone && styles.inputError]}
                onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                value={formData.phone}
                placeholder="Phone Number"
                placeholderTextColor={colors.secondary}
                keyboardType="phone-pad"
              />
            </View>
            {formErrors.phone && (
              <AppText style={styles.errorText}>{formErrors.phone}</AppText>
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

            {/* SIGN UP BUTTON */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                <AppText style={styles.signUpButtonText}>
                  {isLoading ? 'Signing Up...' : 'Sign Up'}
                </AppText>
              </TouchableOpacity>
            </View>

            {/* TERMS OF SERVICE */}
            <View style={styles.termsContainer}>
              <AppText style={styles.termsText}>
                By signing up, you confirm that you have read and accept
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
                Already have an account?
              </AppText>
              <TouchableOpacity onPress={handleSignIn}>
                <AppText style={styles.footerLink}>
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
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontFamily: fonts.bold,
    fontSize: 32,
    color: colors.primary,
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    color: colors.secondary,
    fontFamily: fonts.regular,
    fontSize: 16,
    marginBottom: 20,
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
    width: '100%',
    marginTop: 20,
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
    width: '100%',
    marginTop: 20,
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
    width: '100%',
    justifyContent: 'space-between',
  },
  signUpButton: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lime,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: colors.primary,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  termsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
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
    height: 80,
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