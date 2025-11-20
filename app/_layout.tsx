import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Toaster } from 'sonner-native';
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide the splash screen once the layout is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1 }} className="bg-background dark:bg-backgroundDark flex-1">
      <KeyboardProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
        <Toaster />
      </GestureHandlerRootView>
    </KeyboardProvider>
    </SafeAreaProvider>
  );
}
