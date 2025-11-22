import PageTitle from "@/components/common/PageTitle"; // If you already have it
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [allowSMS, setAllowSMS] = useState(false);
  const [allowEmail, setAllowEmail] = useState(true);
  const { t } = useTranslation();

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("role")
      router.replace("/(auth)")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark ">
      <PageTitle text={t('profile')} />

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
            {t('general')}
          </Text>

          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-small text-secondary dark:text-secondaryDark">
              {t('language')}
            </Text>
            <Text className="text-small text-text dark:text-textDark">English</Text>
          </View>
        </View>

        {/* Theme Section */}
        <View className="bg-card dark:bg-cardDark rounded-3xl p-4 mb-4">
          <Text className="text-body font-semibold text-text dark:text-textDark mb-3">
            {t('theme')}
          </Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-small text-secondary dark:text-secondaryDark">
              {t('dark_mode')}
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
            {t('notifications')}
          </Text>

          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-small text-secondary dark:text-secondaryDark">
              {t('allow_sms')}
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
              {t('allow_email_notification')}
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
            {t('forget_password')}
          </Text>

          <TouchableOpacity className="flex-row justify-between items-center">
            <Text className="text-small font-semibold text-red-500 mr-2">
              {t('forget_password')}
            </Text>
            <MaterialCommunityIcons name="lock-reset" size={20} color="red" />
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View className="bg-card dark:bg-cardDark rounded-3xl p-4 mb-4">
          <Text className="text-body font-semibold text-text dark:text-textDark mb-1">
            {t('danger_zone')}
          </Text>
          <Text className="text-caption text-secondary dark:text-secondaryDark mb-3">
            {t('delete_account_warning')}
          </Text>

          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-small font-semibold text-red-500 mr-2">
              {t('delete_account')}
            </Text>
            <MaterialCommunityIcons name="delete-alert-outline" size={20} color="red" />
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <View className="bg-card dark:bg-cardDark rounded-3xl p-4">
          <Text className="text-body font-semibold text-text dark:text-textDark mb-3">
            {t('sign_out')}
          </Text>

          <TouchableOpacity onPress={handleSignOut} className="flex-row items-center justify-between">
            <Text className="text-small font-semibold text-red-500 mr-2">
              {t('sign_out')}
            </Text>
            <MaterialCommunityIcons name="logout" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
