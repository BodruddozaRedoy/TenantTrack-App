import i18n, { initLanguage } from "@/lib/language";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { setStatusBarTranslucent } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from 'sonner-native';
import "../global.css";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide the splash screen once the layout is ready
    SplashScreen.hideAsync();
    initLanguage();
  }, []);

  const theme = useColorScheme();

  useEffect(() => {
    setStatusBarTranslucent(true);
    // Bottom system bar
    SystemUI.setBackgroundColorAsync(
      theme === "dark" ? "#000000" : "#F6F6F6"   // ← not pure white
    );

  }, [theme]);

  return (
    <SafeAreaProvider style={{ flex: 1 }} className="bg-background dark:bg-backgroundDark flex-1">
      <I18nextProvider i18n={i18n}>
        <StatusBar
          translucent
          backgroundColor="transparent"
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
