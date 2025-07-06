export default {
  expo: {
    name: "qick-mobile-app",
    slug: "qick-mobile-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "qickmobileapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#141F2B"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      googleServicesFile: "./GoogleService-Info.plist",
      supportsTablet: true,
      bundleIdentifier: "com.futbolito.qick",
      infoPlist: {
        NSCameraUsageDescription: "This app needs access to your camera to take photos.",
        NSPhotoLibraryUsageDescription: "This app needs access to your photo library to save photos.",
        NSLocationWhenInUseUsageDescription: "This app needs access to your location to connect with people close to you.",
        NSLocationAlwaysAndWhenInUseUsageDescription: "This app needs access to your location to connect with people close to you.",
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.futbolito.qick",
      permissions: [
        "android.permission.INTERNET",
        "android.permission.CAMERA",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.READ_CONTACTS",
        "android.permission.GET_ACCOUNTS",
        "android.permission.WRITE_CONTACTS",
        "android.permission.ACCESS_NETWORK_STATE",
        "android.permission.POST_NOTIFICATIONS",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION"
      ],
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-font",
      ["@react-native-firebase/app", {}],
      "@react-native-firebase/messaging",
      [
        "expo-splash-screen",
        {
          image: "./assets/splash.png",
          resizeMode: "contain",
          backgroundColor: "#141F2B"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      firebaseConfig: {
        apiKey: process.env.EXPO_PUBLIC_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_APP_ID,
      },
      baseURL: process.env.EXPO_PUBLIC_BASEURL,
      environment: process.env.EXPO_PUBLIC_ENVIRONMENT || "development",
    }
  }
}; 