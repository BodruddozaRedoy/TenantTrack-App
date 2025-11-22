import PrimaryButton from "@/components/common/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Image,
    Keyboard,
    Platform,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { toast } from "sonner-native";

export default function LoginScreen() {
    const [remember, setRemember] = useState(false);
    const [role, setRole] = useState<null | string>("")
    const { t } = useTranslation();

    useEffect(() => {
        const fetchStorage = async () => {
            try {
                const role: string | null = await AsyncStorage.getItem("role")
                setRole(role)
                console.log(role)
            } catch (error) {
                console.log(error)
                toast.error("Cant fetch storage!")
            } finally {
            }
        }
        fetchStorage()
    }, [])

    const handleContinue = async () => {
        try {
            if (role === "prospective") return router.push("/(prospectiveTenant)/(tabs)")
            if (role === "tenant") return router.push("/(tenant)/(tabs)")
            if (role === "landlord") return router.push("/(landlord)/(tabs)")
            if (role === "agent") return router.push("/(landlord)/(tabs)")

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-background dark:bg-backgroundDark">
                {/* <StatusBar barStyle={"light-content"} /> */}
                {/* Wrap entire page inside KeyboardAvoidingView */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
                    style={{ flex: 1 }}
                >

                    {/* Top Cover Image */}
                    <View className="w-full h-[490px]">
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
                        <View className="w-16 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full self-center mb-6 mt-5" />

                        {/* Icon (top-left) */}
                        <TouchableOpacity className="absolute left-6 top-6">
                            <Ionicons name="sparkles-outline" size={24} color="black" />
                        </TouchableOpacity>

                        {/* Title */}
                        <Text className="text-subtitle text-text dark:text-textDark font-bold my-3">
                            {t('get_started_login')}
                        </Text>

                        {/* Subtitle */}
                        <Text className="text-small text-secondary dark:text-secondaryDark mb-6">
                            {t('login_subtitle')}
                        </Text>

                        {/* Email */}
                        <Text className="text-small text-secondary mb-1">{t('email')}</Text>
                        <TextInput
                            className="w-full p-3 border rounded-xl border-gray-300 dark:border-gray-700
                        bg-background dark:bg-backgroundDark text-text dark:text-textDark mb-4"
                            placeholder={t('enter_email')}
                            placeholderTextColor="#888"
                        />

                        {/* Password */}
                        <Text className="text-small text-secondary mb-1">{t('password')}</Text>
                        <TextInput
                            className="w-full p-3 border rounded-xl border-gray-300 dark:border-gray-700
                        bg-background dark:bg-backgroundDark text-text dark:text-textDark"
                            placeholder={t('enter_password')}
                            placeholderTextColor="#888"
                            secureTextEntry
                        />

                        {/* Remember + Forgot */}
                        <View className="flex-row justify-between items-center mt-3 mb-16">
                            {/* Remember me toggle */}
                            <TouchableOpacity
                                onPress={() => setRemember(!remember)}
                                className="flex-row items-center"
                                activeOpacity={0.7}
                            >
                                <View
                                    className={`w-4 h-4 rounded-sm mr-2 border 
                    ${remember ? "bg-primary border-primary" : "border-gray-400 dark:border-gray-500"}`}
                                />
                                <Text className="text-small text-secondary dark:text-secondaryDark">
                                    {t('remember_me')}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text className="text-small text-primary dark:text-primaryDark">
                                    {t('forgot_password')}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Login Button */}
                        <PrimaryButton title={t('login')} onPress={handleContinue} />

                        {/* Bottom Spacing */}
                        <View className="h-6" />

                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
}
