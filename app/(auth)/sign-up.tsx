import PrimaryButton from "@/components/common/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Keyboard, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export default function SignupScreen() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-background dark:bg-backgroundDark">

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
                >
                    {/* Top Cover Image */}
                    <View className="w-full h-[380px] bg-gray-200 dark:bg-gray-700">
                        <Image
                            source={{ uri: "https://picsum.photos/800/601" }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    {/* Bottom Sheet */}
                    <View className="absolute bottom-0 left-0 right-0 bg-card dark:bg-cardDark px-6 pb-10
                       rounded-t-3xl shadow-2xl border border-gray-200 dark:border-gray-700">

                        {/* Handle */}
                        <View className="w-16 h-1.5 bg-gray-300 dark:bg-gray-600 mt-5 rounded-full self-center mb-6" />

                        {/* Icon (top-left) */}
                        <TouchableOpacity className="absolute left-6 top-6">
                            <Ionicons name="sparkles-outline" size={24} color="black dark:white" />
                        </TouchableOpacity>

                        {/* Title */}
                        <Text className="text-subtitle text-text dark:text-textDark font-bold my-3">
                            Create your free account
                        </Text>

                        {/* Subtitle */}
                        <Text className="text-small text-secondary dark:text-secondaryDark mb-6">
                            Let&apos;s start your educational journey together, where every step forward is a step towards a brighter future!
                        </Text>

                        {/* Full Name */}
                        <Text className="text-small text-secondary dark:text-textDark mb-1">Full Name *</Text>
                        <TextInput
                            className="w-full p-3 border rounded-xl border-gray-300 dark:border-gray-700
                     bg-background dark:bg-backgroundDark text-text dark:text-textDark mb-4"
                        />

                        {/* Email */}
                        <Text className="text-small text-secondary mb-1 dark:text-textDark">Email Address *</Text>
                        <TextInput
                            className="w-full p-3 border rounded-xl border-gray-300 dark:border-gray-700
                     bg-background dark:bg-backgroundDark text-text dark:text-textDark mb-4"
                        />

                        {/* Password */}
                        <Text className="text-small text-secondary mb-1 dark:text-textDark">Password *</Text>
                        <TextInput
                            secureTextEntry
                            className="w-full p-3 border rounded-xl border-gray-300 dark:border-gray-700
                     bg-background dark:bg-backgroundDark text-text dark:text-textDark mb-4"
                        />

                        {/* Confirm Password */}
                        <Text className="text-small text-secondary mb-1 dark:text-textDark">Confirm Password *</Text>
                        <TextInput
                            secureTextEntry
                            className="w-full p-3 border rounded-xl border-gray-300 dark:border-gray-700
                     bg-background dark:bg-backgroundDark text-text dark:text-textDark mb-8"
                        />

                        {/* Signup Button */}
                        <PrimaryButton onPress={() => router.push("/(auth)/email-verification")} title="Sign Up" />

                        {/* Extra bottom spacing */}
                        <View className="h-6" />

                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
}
