import PageTitle from "@/components/common/PageTitle";
import i18n from "@/lib/language";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import {
  I18nManager,
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

// local image from earlier messages
const uploadedImage = "/mnt/data/splash-icon.png";

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [allowSMS, setAllowSMS] = useState(false);
  const [allowEmail, setAllowEmail] = useState(true);
  const [selectedLang, setSelectedLang] = useState<"en" | "ar">("en");
  const [langDropdown, setLangDropdown] = useState(false);

  useEffect(() => {
    const loadLang = async () => {
      const saved = await AsyncStorage.getItem("appLanguage");
      const lang = (saved === "ar" ? "ar" : "en") as "en" | "ar";
      setSelectedLang(lang);
      await i18n.changeLanguage(lang);

      // Force LTR always
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    };
    loadLang();
  }, []);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("role");
    router.replace("/(auth)");
  };

  // ------------------------------------------------------
  // FIXED VERSION — using `buttons[]` for Sonner Native
  // ------------------------------------------------------
  const applyLanguage = async (lang: "en" | "ar") => {
    try {
      await AsyncStorage.setItem("appLanguage", lang);
      await i18n.changeLanguage(lang);
      setSelectedLang(lang);

      // prevent RTL flipping
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);

      toast.success("Language changed!", {
        description: "Restart required to apply changes.",
        action: {
          label: "Restart",
          onPress: async () => {
            if (!__DEV__) {
              await Updates.reloadAsync();
            } else {
              toast.info("Restart only works in a release build.");
            }
          }
        }
      });

    } catch (e) {
      console.log("Language switch error:", e);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
      <PageTitle text="Profile" />

      <View className="border-b border-gray-200 dark:border-gray-700" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }}
        className="px-4 mt-2 mb-24"
      >
        {/* User Info Card */}
        <View className="bg-card dark:bg-cardDark p-4 flex-row items-center mb-4 rounded-full">
          <Image
            source={{ uri: uploadedImage }}
            className="w-14 h-14 rounded-full overflow-hidden mr-4"
            style={{ width: 56, height: 56 }}
          />

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

          {/* Language Dropdown */}
          <View className="mb-2">
            <TouchableOpacity
              onPress={() => setLangDropdown(!langDropdown)}
              className="flex-row items-center justify-between"
            >
              <Text className="text-small text-secondary dark:text-secondaryDark">
                Language
              </Text>

              <View className="flex-row items-center">
                <Text className="text-small text-text dark:text-textDark mr-2">
                  {selectedLang === "ar" ? "Arabic" : "English"}
                </Text>

                <MaterialIcons
                  name={langDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  size={20}
                  color="#999"
                />
              </View>
            </TouchableOpacity>

            {langDropdown && (
              <View className="mt-3 bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
                {/* English */}
                <TouchableOpacity
                  onPress={() => {
                    setLangDropdown(false);
                    applyLanguage("en");
                  }}
                  className="py-2"
                >
                  <Text
                    className={`text-text dark:text-textDark ${selectedLang === "en" ? "font-bold" : ""
                      }`}
                  >
                    English
                  </Text>
                </TouchableOpacity>

                {/* Arabic */}
                <TouchableOpacity
                  onPress={() => {
                    setLangDropdown(false);
                    applyLanguage("ar");
                  }}
                  className="py-2"
                >
                  <Text
                    className={`text-text dark:text-textDark ${selectedLang === "ar" ? "font-bold" : ""
                      }`}
                  >
                    العربية (Arabic)
                  </Text>
                </TouchableOpacity>
              </View>
            )}
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
              trackColor={{ false: "#D1D5DB", true: "black" }}
              thumbColor={darkMode ? "#ffffff" : "#f4f3f4"}
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
              trackColor={{ false: "#D1D5DB", true: "black" }}
              thumbColor={darkMode ? "#ffffff" : "#f4f3f4"}
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
              trackColor={{ false: "#D1D5DB", true: "black" }}
              thumbColor={darkMode ? "#ffffff" : "#f4f3f4"}
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
            Once you delete your account, there is no going back.
          </Text>

          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-small font-semibold text-red-500 mr-2">
              Delete Account
            </Text>
            <MaterialCommunityIcons
              name="delete-alert-outline"
              size={20}
              color="red"
            />
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <View className="bg-card dark:bg-cardDark rounded-3xl p-4">
          <Text className="text-body font-semibold text-text dark:text-textDark mb-3">
            Sign Out
          </Text>

          <TouchableOpacity
            onPress={handleSignOut}
            className="flex-row items-center justify-between"
          >
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
