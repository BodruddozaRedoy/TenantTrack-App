import i18n, { initLanguage } from "@/lib/language";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";
import "../global.css";

// Keep splash visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
    initLanguage();
  }, []);

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        {/* FIXED STATUS BAR */}
        <StatusBar
          backgroundColor={theme === "dark" ? "#000000" : "#FFFFFF"}
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />

        <KeyboardProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
            <Toaster />
          </GestureHandlerRootView>
        </KeyboardProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
