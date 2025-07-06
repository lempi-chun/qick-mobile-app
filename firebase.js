import { initializeApp, getApps } from "firebase/app";
import Constants from 'expo-constants';

const firebaseConfig = Constants.expoConfig.extra.firebaseConfig;
console.log("Firebase Config: ", firebaseConfig)
// Prevent multiple Firebase instances
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}

export { firebaseApp };
