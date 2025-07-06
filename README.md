# Qick Mobile App

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Environment Configuration

The app uses environment variables for configuration. Set up your environment by copying the example file:

```bash
# For development
cp .env.example .env

# Or use specific environment files
cp .env.development .env    # For development
cp .env.production .env     # For production
```

### Environment Variables

- `EXPO_PUBLIC_API_KEY` - Firebase API key
- `EXPO_PUBLIC_AUTH_DOMAIN` - Firebase auth domain
- `EXPO_PUBLIC_PROJECT_ID` - Firebase project ID
- `EXPO_PUBLIC_STORAGE_BUCKET` - Firebase storage bucket
- `EXPO_PUBLIC_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `EXPO_PUBLIC_APP_ID` - Firebase app ID
- `EXPO_PUBLIC_BASEURL` - Backend API base URL
- `EXPO_PUBLIC_ENVIRONMENT` - Environment name (development/staging/production)

### Environment Files Available

- `.env.example` - Template with staging configuration
- `.env.development` - Development configuration (local API)
- `.env.production` - Production configuration template
- `.env` - Your local environment file (gitignored)

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Set up environment variables

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
