import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.taawidaty.app',
  appName: 'Taawidaty',
  webDir: 'dist',
  android: {
    backgroundColor: '#FFFFFF'
  },
  plugins: {
    StatusBar: {
      backgroundColor: '#FFFFFF',
      style: 'DARK' // Dark icons on light background
    }
  }
  // Uncomment below for live reload during development:
  // server: {
  //   url: 'http://YOUR_MAC_IP:8080',
  //   cleartext: true
  // }
};

export default config;
