import { colors } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { persistor, store } from '@/redux/store';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import initI18n from '../i18n';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [i18nInitialized, setI18nInitialized] = useState(false);
  const [loaded] = useFonts({
    'PlusJakartaSans-Light': require('../assets/fonts/Light.ttf'),
    'PlusJakartaSans-Regular': require('../assets/fonts/Regular.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/Medium.ttf'),
    'PlusJakartaSans-SemiBold': require('../assets/fonts/SemiBold.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Bold.ttf'),
    'PlusJakartaSans-ExtraBold': require('../assets/fonts/ExtraBold.ttf'),
    'PlusJakartaSans-LightItalic': require('../assets/fonts/LightItalic.ttf'),
    'PlusJakartaSans-Italic': require('../assets/fonts/Italic.ttf'),
    'PlusJakartaSans-MediumItalic': require('../assets/fonts/MediumItalic.ttf'),
    'PlusJakartaSans-SemiBoldItalic': require('../assets/fonts/SemiBoldItalic.ttf'),
    'PlusJakartaSans-BoldItalic': require('../assets/fonts/BoldItalic.ttf'),
    'PlusJakartaSans-ExtraBoldItalic': require('../assets/fonts/ExtraBoldItalic.ttf'),
    'PlusJakartaSans-ExtraLightItalic': require('../assets/fonts/ExtraLightItalic.ttf'),
  });

  useEffect(() => {
    const initializeI18n = async () => {
      try {
        await initI18n();
        setI18nInitialized(true);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        setI18nInitialized(true); // Continue anyway
      }
    };

    initializeI18n();
  }, []);

  useEffect(() => {
    if (loaded && i18nInitialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, i18nInitialized]);

  if (!loaded || !i18nInitialized) {
    return null;
  }

  // Custom theme to avoid default blue colors
  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.lime,
      background: colors.white,
      card: colors.white,
      text: colors.primary,
      border: colors.secondaryTenPercent,
      notification: colors.lime,
    },
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <ThemeProvider value={customTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.white },
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="welcome" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" backgroundColor="transparent" />
    </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
