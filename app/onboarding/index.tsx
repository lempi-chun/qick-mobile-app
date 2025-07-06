import { AppButton, AppText } from '@/components/ui';
import { colors, spacing } from '@/constants';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Find Your Perfect Match',
    subtitle: 'Discover sports facilities and join matches with players of your skill level',
    image: require('@/assets/Onbarding/Onboarding1.png'),
  },
  {
    id: 2,
    title: 'Connect & Play',
    subtitle: 'Meet new friends, challenge rivals, and build your sports community',
    image: require('@/assets/Onbarding/Onboarding2.png'),
  },
  {
    id: 3,
    title: 'Track Your Progress',
    subtitle: 'Monitor your performance, collect achievements, and level up your game',
    image: require('@/assets/Onbarding/Onboarding3.png'),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Navigate to main app or profile setup
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const handleGetStarted = () => {
    router.replace('/auth/login');
  };

  const currentData = onboardingData[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Skip Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip}>
            <AppText variant="body" color={colors.secondary}>
              Skip
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={currentData.image} style={styles.image} resizeMode="contain" />
        </View>

        {/* Content */}
        <View style={styles.textContainer}>
          <AppText variant="title" weight="bold" color={colors.primary} style={styles.title}>
            {currentData.title}
          </AppText>
          
          <AppText variant="body" color={colors.secondary} style={styles.subtitle}>
            {currentData.subtitle}
          </AppText>
        </View>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {currentIndex === onboardingData.length - 1 ? (
            <AppButton
              title="Get Started"
              onPress={handleGetStarted}
              style={styles.button}
            />
          ) : (
            <AppButton
              title="Next"
              onPress={handleNext}
              style={styles.button}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'flex-end',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: spacing.xs,
  },
  activeDot: {
    backgroundColor: colors.lime,
    width: 24,
  },
  inactiveDot: {
    backgroundColor: colors.secondaryTenPercent,
  },
  buttonContainer: {
    paddingBottom: spacing.lg,
  },
  button: {
    marginTop: spacing.md,
  },
}); 