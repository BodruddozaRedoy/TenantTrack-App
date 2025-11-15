import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegistrationScreen() {
    const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark justify-end">

            {/* Bottom Card */}
            <View className="bg-card dark:bg-cardDark rounded-t-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">

                {/* Handle (the small bar at the top) */}
                <View className="w-16 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full self-center mb-6" />

                {/* Login / Sign Up Switch */}
                <View className="flex-row gap-3 items-center justify-between p-1 mb-6">

                    {/* Login Button */}
                    <View className="flex-1">
                        <PrimaryButton onPress={() => router.push("/(auth)/login")} title="Login" />
                    </View>

                    {/* SignUp Button */}
                    <View className="flex-1">
                        <SecondaryButton title="Sign Up" onPress={() => router.push("/(auth)/sign-up")} />
                    </View>
                </View>

                {/* Divider */}
                <Text className="text-center text-small text-secondary dark:text-secondaryDark mb-4">
                    or continue with
                </Text>

                {/* Google */}
                <TouchableOpacity className="flex-row items-center justify-between py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-full mb-3 bg-background dark:bg-cardDark">
                    <Image
                        source={{ uri: "https://img.icons8.com/color/48/google-logo.png" }}
                        className="w-6 h-6 mr-3"
                    />
                    <Text className="text-text dark:text-textDark font-medium">
                        Continue With Google
                    </Text>
                    <View />
                </TouchableOpacity>

                {/* Apple */}
                <TouchableOpacity className="flex-row items-center justify-between py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-full mb-3 bg-background dark:bg-cardDark">
                    <Image
                        source={{ uri: "https://img.icons8.com/?size=100&id=30840&format=png&color=000000" }}
                        className="w-6 h-6 mr-3"
                    />
                    <Text className="text-text dark:text-textDark font-medium">
                        Continue With Apple
                    </Text>
                    <View />
                </TouchableOpacity>

                {/* Nafath */}
                <TouchableOpacity className="flex-row items-center justify-between py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-full bg-background dark:bg-cardDark">
                    <Image
                        source={{ uri: "https://img.icons8.com/fluency/48/facebook-new.png" }}
                        className="w-6 h-6 mr-3"
                    />
                    <Text className="text-text dark:text-textDark font-medium">
                        Continue With Nafath
                    </Text>
                    <View />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}
