import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import { router } from "expo-router";
import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function RegistrationScreen() {
    return (
        <View className="flex-1 bg-background dark:bg-backgroundDark">
            <StatusBar barStyle={"light-content"} />
            {/* Container */}
            <View className="flex-1">

                {/* Top Cover Image */}
                <View className="w-full h-[580px]">
                    <Image
                        source={{ uri: "https://picsum.photos/800/601" }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>

                {/* Bottom Card */}
                <View className="absolute bottom-0 left-0 right-0 bg-card dark:bg-cardDark px-6 pb-20
                       rounded-t-3xl shadow-2xl border border-gray-200 dark:border-gray-700">

                    {/* Handle */}
                    <View className="w-16 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full self-center mb-6 mt-5" />

                    {/* Login / Sign Up */}
                    <View className="flex-row gap-3 items-center justify-between mb-6 mt-5">
                        <View className="flex-1">
                            <PrimaryButton
                                onPress={() => router.push("/(auth)/login")}
                                title="Login"
                            />
                        </View>

                        <View className="flex-1">
                            <SecondaryButton
                                title="Sign Up"
                                onPress={() => router.push("/(auth)/sign-up")}
                            />
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
                            style={{ width: 24, height: 24, marginRight: 10 }}
                        />
                        <Text className="text-text dark:text-textDark font-medium flex-1 text-center">
                            Continue With Google
                        </Text>
                        <View />
                    </TouchableOpacity>

                    {/* Apple */}
                    <TouchableOpacity className="flex-row items-center justify-between py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-full mb-3 bg-background dark:bg-cardDark">
                        <Image
                            source={{
                                uri: "https://img.icons8.com/?size=100&id=30840&format=png&color=000000",
                            }}
                            style={{ width: 24, height: 24, marginRight: 10 }}
                        />
                        <Text className="text-text dark:text-textDark font-medium flex-1 text-center">
                            Continue With Apple
                        </Text>
                        <View />
                    </TouchableOpacity>

                    {/* Nafath */}
                    <TouchableOpacity className="flex-row items-center justify-between py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-full bg-background dark:bg-cardDark">
                        <Image
                            source={{
                                uri: "https://img.icons8.com/fluency/48/facebook-new.png",
                            }}
                            style={{ width: 24, height: 24, marginRight: 10 }}
                        />
                        <Text className="text-text dark:text-textDark font-medium flex-1 text-center">
                            Continue With Nafath
                        </Text>
                        <View />
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    );
}
