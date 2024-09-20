import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.onesquare.fitness',
  appName: 'Fitness App',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth:{
      scopes: ["profile", "email"],
      androidClientId: "156510539903-i347gbe2m3dfmo48eu6an0b8m3ufraeo.apps.googleusercontent.com",
      serverClientId: "156510539903-i347gbe2m3dfmo48eu6an0b8m3ufraeo.apps.googleusercontent.com",
      clientId: "156510539903-i347gbe2m3dfmo48eu6an0b8m3ufraeo.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
