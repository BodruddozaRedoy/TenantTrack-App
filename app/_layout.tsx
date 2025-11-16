import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "../global.css";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide the splash screen once the layout is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <KeyboardProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </KeyboardProvider>
  );
}
