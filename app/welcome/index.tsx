import { AppText, LanguageSelector } from '@/components';
import { colors, fonts } from '@/constants';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import i18n from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
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

export default function WelcomeScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('welcome');
  const { t: tCommon } = useTranslation('common');

  const welcomeSteps = [
    {
      id: 1,
      title: t('steps.bookField'),
      backgroundImage: require('@/assets/Welcome/screen-1.png'),
    },
    {
      id: 2,
      title: t('steps.inviteFriends'),
      backgroundImage: require('@/assets/Welcome/screen-2.png'),
    },
    {
      id: 3,
      title: t('steps.splitBill'),
      backgroundImage: require('@/assets/Welcome/screen-3.png'),
    },
  ];

  const handleNext = () => {
    if (currentStep < welcomeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to login after last step
      router.replace('/auth/login');
    }
  };

  const handleLanguageDropdownPress = () => {
    setLanguageModalVisible(true);
  };

  const handleLanguageModalClose = () => {
    setLanguageModalVisible(false);
  };

  const currentStepData = welcomeSteps[currentStep];
  const currentLanguage = i18n.language;

  return (
    <>
      <ImageBackground 
        source={currentStepData.backgroundImage} 
        style={styles.container}
        resizeMode="cover"
      >
        <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
        
        {/* Page Content */}
        <View style={styles.pageContent}>
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
            <View style={styles.languageSelectorContainer}>
              <TouchableOpacity style={styles.languageSelector} onPress={handleLanguageDropdownPress}>
                <AppText style={styles.languageText}>
                  {currentLanguage === 'en' ? tCommon('language.english') : tCommon('language.spanish')}
                </AppText>
                <AntDesign name="down" size={12} color={colors.white} />
              </TouchableOpacity>
            </View>
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
              
              {/* Step Title - Under Logo */}
              <View style={styles.titleContainer}>
                <AppText style={styles.stepTitle}>
                  {currentStepData.title}
                </AppText>
              </View>
            </View>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            {/* Let's Go Button */}
            <TouchableOpacity style={styles.letsGoButton} onPress={handleNext}>
              <AppText style={styles.letsGoButtonText}>
                {t('button.letsGo')}
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
        </View>
      </ImageBackground>

      {/* Language Selector Modal */}
      <LanguageSelector
        visible={languageModalVisible}
        onClose={handleLanguageModalClose}
      />
    </>
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
    marginBottom: 15,
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
  languageSelectorContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
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
    paddingTop: 20,
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
  pageContent: {
    flex: 1,
  },
}); 