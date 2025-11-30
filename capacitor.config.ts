import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.taawidaty.app',
  appName: 'Taawidaty',
  webDir: 'dist',
  android: {
    backgroundColor: '#0D7490'
  },
  plugins: {
    StatusBar: {
      backgroundColor: '#0B6177'
    }
  }
  // Uncomment below for live reload during development:
  // server: {
  //   url: 'http://YOUR_MAC_IP:8080',
  //   cleartext: true
  // }
};

export default config;
