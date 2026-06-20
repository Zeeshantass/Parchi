import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.parchi.app",
  appName: "Parchi",
  webDir: "out",
  server: {
    // Load the live Vercel deployment — API routes and Supabase work here
    url: "https://parchi-e25csp0qj-zeeshansaleems-projects.vercel.app",
    cleartext: false,
  },
  android: {
    buildOptions: {
      releaseType: "APK",
    },
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
  },
};

export default config;
