import PageTitle from "@/components/common/PageTitle"; // If you already have it
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [darkMode, setDarkMode] = useState(false);
  const [allowSMS, setAllowSMS] = useState(false);
  const [allowEmail, setAllowEmail] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark ">
      <PageTitle text="Profile" />

      <View className="border-b border-gray-200 dark:border-gray-700" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }}
        className="px-4 mt-2 mb-24"
      >
        {/* User Info Card */}
        <View className="bg-card dark:bg-cardDark p-4 flex-row items-center mb-4 rounded-full">
          <View className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-4" />
          <View className="flex-1">
            <Text className="text-body font-semibold text-text dark:text-textDark">
              Chris Brown
            </Text>
            <Text className="text-small text-secondary dark:text-secondaryDark">
              browm@dumpmail.com
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/profile-details")}>
            <MaterialIcons name="edit-square" size={22} color="#999999" />
          </TouchableOpacity>
        </View>

        {/* General Section */}
        <View className="bg-card dark:bg-cardDark rounded-3xl p-4 mb-4">
          <Text className="text-body font-semibold text-text dark:text-textDark mb-3">
            General
          </Text>

          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-small text-secondary dark:text-secondaryDark">
              Language
            </Text>
            <Text className="text-small text-text dark:text-textDark">English</Text>
          </View>
        </View>

        {/* Theme Section */}
        <View className="bg-card dark:bg-cardDark rounded-3xl p-4 mb-4">
          <Text className="text-body font-semibold text-text dark:text-textDark mb-3">
            Theme
          </Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-small text-secondary dark:text-secondaryDark">
              Dark Mode
            </Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{
                false: "#D1D5DB",   // OFF Track color
                true: "black",    // ON Track color
              }}
              thumbColor={darkMode ? "#ffffff" : "#f4f3f4"}  // Circle color
              ios_backgroundColor="#D1D5DB"
            />
          </View>
        </View>

        {/* Notifications */}
        <View className="bg-card dark:bg-cardDark rounded-3xl p-4 mb-4">
          <Text className="text-body font-semibold text-text dark:text-textDark mb-3">
            Notifications
          </Text>

          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-small text-secondary dark:text-secondaryDark">
              Allow SMS
            </Text>
            <Switch
              value={allowSMS}
              onValueChange={setAllowSMS}
              trackColor={{
                false: "#D1D5DB",   // OFF Track color
                true: "black",    // ON Track color
              }}
              thumbColor={darkMode ? "#ffffff" : "#f4f3f4"}  // Circle color
              ios_backgroundColor="#D1D5DB"
            />
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-small text-secondary dark:text-secondaryDark">
              Allow Email Notification
            </Text>
            <Switch
              value={allowEmail}
              onValueChange={setAllowEmail}
              trackColor={{
                false: "#D1D5DB",   // OFF Track color
                true: "black",    // ON Track color
              }}
              thumbColor={darkMode ? "#ffffff" : "#f4f3f4"}  // Circle color
              ios_backgroundColor="#D1D5DB"
            />
          </View>
        </View>

        {/* Forget Password */}
        <View className="bg-card dark:bg-cardDark rounded-3xl p-4 mb-4">
          <Text className="text-body font-semibold text-text dark:text-textDark mb-3">
            Forget Password
          </Text>

          <TouchableOpacity className="flex-row justify-between items-center">
            <Text className="text-small font-semibold text-red-500 mr-2">
              Forget Password
            </Text>
            <MaterialCommunityIcons name="lock-reset" size={20} color="red" />
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View className="bg-card dark:bg-cardDark rounded-3xl p-4 mb-4">
          <Text className="text-body font-semibold text-text dark:text-textDark mb-1">
            Danger Zone
          </Text>
          <Text className="text-caption text-secondary dark:text-secondaryDark mb-3">
            Once you delete your account, there is no going back. Please be
            certain.
          </Text>

          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-small font-semibold text-red-500 mr-2">
              Delete Account
            </Text>
            <MaterialCommunityIcons name="delete-alert-outline" size={20} color="red" />
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <View className="bg-card dark:bg-cardDark rounded-3xl p-4">
          <Text className="text-body font-semibold text-text dark:text-textDark mb-3">
            Sign Out
          </Text>

          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-small font-semibold text-red-500 mr-2">
              Sign Out
            </Text>
            <MaterialCommunityIcons name="logout" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
