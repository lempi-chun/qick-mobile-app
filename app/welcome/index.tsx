import { AppText } from '@/components/ui';
import { colors, fonts } from '@/constants';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('screen');

const welcomeSteps = [
  {
    id: 1,
    title: 'Book a Field',
    backgroundImage: require('@/assets/Welcome/screen-1.png'),
  },
  {
    id: 2,
    title: 'Invite Your Friends',
    backgroundImage: require('@/assets/Welcome/screen-2.png'),
  },
  {
    id: 3,
    title: 'Split The Bill',
    backgroundImage: require('@/assets/Welcome/screen-3.png'),
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const insets = useSafeAreaInsets();
  
  // Animation values
  const slideAnimation = new Animated.Value(0);
  const fadeAnimation = new Animated.Value(1);

  const handleNext = () => {
    if (currentStep < welcomeSteps.length - 1) {
      // Start slide out animation
      Animated.parallel([
        Animated.timing(slideAnimation, {
          toValue: -width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Update step
        setCurrentStep(currentStep + 1);
        
        // Reset position for slide in
        slideAnimation.setValue(width);
        
        // Start slide in animation
        Animated.parallel([
          Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      // Navigate to login after last step
      router.replace('/auth/login');
    }
  };

  const currentStepData = welcomeSteps[currentStep];

  return (
    <ImageBackground 
      source={currentStepData.backgroundImage} 
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      
      {/* Status Bar Overlay */}
      <View style={[styles.statusBarOverlay, { paddingTop: insets.top }]}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          {welcomeSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressSegment,
                index <= currentStep && styles.progressSegmentActive
              ]}
            />
          ))}
        </View>

        {/* Language Selector */}
        <TouchableOpacity style={styles.languageSelector}>
          <AppText style={styles.languageText}>English</AppText>
          <AntDesign name="down" size={12} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* qick Logo - Static, always visible */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          
          {/* Animated Step Title - Under Logo */}
          <Animated.View 
            style={[
              styles.titleContainer,
              {
                transform: [{ translateX: slideAnimation }],
                opacity: fadeAnimation,
              }
            ]}
          >
            <AppText style={styles.stepTitle}>
              {currentStepData.title}
            </AppText>
          </Animated.View>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Let's Go Button */}
        <TouchableOpacity style={styles.letsGoButton} onPress={handleNext}>
          <AppText style={styles.letsGoButtonText}>
            Let's Go
          </AppText>
        </TouchableOpacity>

        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          {welcomeSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepDot,
                index === currentStep && styles.stepDotActive
              ]}
            />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  statusBarOverlay: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  progressSegment: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressSegmentActive: {
    backgroundColor: colors.white,
  },
  languageSelector: {
    position: 'absolute',
    right: 20,
    top: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  languageText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 180,
    height: 95,
  },
  stepTitle: {
    fontSize: 20,
    fontFamily: fonts.extraBoldItalic,
    fontWeight: '800',
    fontStyle: 'italic',
    color: colors.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 34,
  },
  bottomSection: {
    paddingHorizontal: 40,
    paddingBottom: Platform.OS === 'ios' ? 40 : 25,
    alignItems: 'center',
  },
  letsGoButton: {
    width: width - 80,
    height: 60,
    backgroundColor: colors.lime,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  letsGoButtonText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  stepIndicator: {
    flexDirection: 'row',
    gap: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  stepDotActive: {
    backgroundColor: colors.white,
    width: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 0,
  },
}); 