import { colors } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { persistor, store } from '@/redux/store';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.white },
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
