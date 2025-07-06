import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { persistor, store } from '@/redux/store';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    PJSMedium: require('../assets/fonts/Medium.ttf'),
    PJSBold: require('../assets/fonts/Bold.ttf'),
    PJSRegular: require('../assets/fonts/Regular.ttf'),
    PJSLight: require('../assets/fonts/Light.ttf'),
    PJSSemibold: require('../assets/fonts/SemiBold.ttf'),
    PJSExtrabold: require('../assets/fonts/ExtraBold.ttf'),
    PJSItalics: require('../assets/fonts/Italic.ttf'),
    PJSLightItalic: require('../assets/fonts/LightItalic.ttf'),
    PJSExtraLightItalic: require('../assets/fonts/ExtraLightItalic.ttf'),
    PJSMediumItalic: require('../assets/fonts/MediumItalic.ttf'),
    PJSSemiBoldItalic: require('../assets/fonts/SemiBoldItalic.ttf'),
    PJSBoldItalic: require('../assets/fonts/BoldItalic.ttf'),
    PJSExtraBoldItalic: require('../assets/fonts/ExtraBoldItalic.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
