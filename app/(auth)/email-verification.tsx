import PrimaryButton from "@/components/common/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EmailVerificationScreen() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark px-6 pt-10">

      {/* Icon */}
      <View className="mb-6">
        <Ionicons name="sparkles-outline" size={26} color="black" />
      </View>

      {/* Title */}
      <Text className="text-subtitle text-text dark:text-textDark font-bold mb-1">
        Verify your email address
      </Text>

      {/* Subtitle */}
      <Text className="text-small text-secondary dark:text-secondaryDark mb-1">
        We have sent you a 5-digit verification code at
      </Text>

      <Text className="text-small text-text dark:text-textDark mb-8">
        brown@dumpmail.com
      </Text>

      {/* OTP Boxes */}
          <View className="flex-row gap-3 justify-center mb-10">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref!)}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
                className="size-16 rounded-xl border border-gray-300 dark:border-gray-600 
                       text-center text-title bg-background dark:bg-backgroundDark 
                       text-text dark:text-textDark"
          />
        ))}
      </View>

      {/* Confirm Button */}
          <PrimaryButton onPress={() => router.push("/(auth)/setup-location")} title="Confirm" />

      <View className="h-6" />

      {/* Resend link */}
      <View className="flex-row justify-center mt-4">
        <Text className="text-small text-secondary dark:text-secondaryDark">
          Didn’t receive the code?
        </Text>
        <TouchableOpacity>
          <Text className="text-small text-primary font-semibold dark:text-primaryDark ml-1">
            Resend here
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
