import type { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.hadassah.barbraai',
  appName: 'BarbraAI',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a2e',
      androidSplashResourceName: 'splash',
      showSpinner: false
    }
  },
  android: {
    iconResourceName: 'icon',
    adaptiveIconResourceName: 'icon_adaptive',
    backgroundColor: '#1a1a2e'
  }
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1a1a2e",
      showSpinner: true,
      spinnerColor: "#ffffff"
    }
  }
};

export default config;