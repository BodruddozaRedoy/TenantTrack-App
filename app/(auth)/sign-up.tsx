import PrimaryButton from "@/components/common/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
    Image,
    Keyboard,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export default function SignUpScreen() {
    const { t } = useTranslation();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-background dark:bg-backgroundDark">
                {/* <StatusBar barStyle="dark-content" /> */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
                    style={{ flex: 1 }}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        {/* Header Image */}
                        <View className="w-full h-[250px]">
                            <Image
                                source={{ uri: "https://picsum.photos/800/600" }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                            {/* Back Button */}
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="absolute top-12 left-6 bg-white/20 p-2 rounded-full"
                            >
                                <Ionicons name="arrow-back" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Content */}
                        <View className="bg-card dark:bg-cardDark -mt-6 rounded-t-3xl px-6 pt-8 pb-10 flex-1">
                            <Text className="text-headline text-text dark:text-textDark font-bold mb-2">
                                {t('create_account')}
                            </Text>
                            <Text className="text-small text-secondary dark:text-secondaryDark mb-6">
                                {t('signup_subtitle')}
                            </Text>

                            {/* Form Fields */}
                            <View className="gap-4 mb-6">
                                <TextInput
                                    placeholder={t('full_name')}
                                    placeholderTextColor="#888"
                                    className="w-full p-4 border rounded-xl border-gray-300 dark:border-gray-700 bg-background dark:bg-backgroundDark text-text dark:text-textDark"
                                />
                                <TextInput
                                    placeholder={t('email_address')}
                                    placeholderTextColor="#888"
                                    keyboardType="email-address"
                                    className="w-full p-4 border rounded-xl border-gray-300 dark:border-gray-700 bg-background dark:bg-backgroundDark text-text dark:text-textDark"
                                />
                                <TextInput
                                    placeholder={t('password_required')}
                                    placeholderTextColor="#888"
                                    secureTextEntry
                                    className="w-full p-4 border rounded-xl border-gray-300 dark:border-gray-700 bg-background dark:bg-backgroundDark text-text dark:text-textDark"
                                />
                                <TextInput
                                    placeholder={t('confirm_password')}
                                    placeholderTextColor="#888"
                                    secureTextEntry
                                    className="w-full p-4 border rounded-xl border-gray-300 dark:border-gray-700 bg-background dark:bg-backgroundDark text-text dark:text-textDark"
                                />
                            </View>

                            <PrimaryButton
                                title={t('sign_up')}
                                onPress={() => router.push("/(auth)/email-verification")}
                            />

                            {/* Divider */}
                            <View className="flex-row items-center my-6">
                                <View className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700" />
                                <Text className="mx-4 text-small text-secondary dark:text-secondaryDark">
                                    {t('or_continue_with')}
                                </Text>
                                <View className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700" />
                            </View>

                            {/* Social Buttons */}
                            <View className="gap-3">
                                <TouchableOpacity className="flex-row items-center justify-center border border-gray-300 dark:border-gray-700 p-4 rounded-xl bg-card dark:bg-cardDark">
                                    <Image
                                        source={{ uri: "https://img.icons8.com/color/48/google-logo.png" }}
                                        className="w-6 h-6 mr-3"
                                        resizeMode="contain"
                                    />
                                    <Text className="text-body font-medium text-text dark:text-textDark">
                                        {t('continue_google')}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity className="flex-row items-center justify-center border border-gray-300 dark:border-gray-700 p-4 rounded-xl bg-card dark:bg-cardDark">
                                    <Image
                                        source={{ uri: "https://img.icons8.com/?size=100&id=30840&format=png&color=000000" }}
                                        className="w-6 h-6 mr-3"
                                        resizeMode="contain"
                                    />
                                    <Text className="text-body font-medium text-text dark:text-textDark">
                                        {t('continue_apple')}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity className="flex-row items-center justify-center border border-gray-300 dark:border-gray-700 p-4 rounded-xl bg-card dark:bg-cardDark">
                                    <Image
                                        source={{ uri: "https://img.icons8.com/fluency/48/facebook-new.png" }}
                                        className="w-6 h-6 mr-3"
                                        resizeMode="contain"
                                    />
                                    <Text className="text-body font-medium text-text dark:text-textDark">
                                        {t('continue_nafath')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
}
