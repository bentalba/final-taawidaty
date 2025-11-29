import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.taawidaty.app',
  appName: 'Taawidaty',
  webDir: 'dist',
  // Enable live reload during development
  // Comment out server block for production builds
  server: {
    url: 'http://172.20.10.2:8080', // Your Mac's IP (run: ipconfig getifaddr en0)
    cleartext: true
  }
};

export default config;
