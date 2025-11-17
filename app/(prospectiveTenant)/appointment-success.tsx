import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppointmentSuccessScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >

        {/* Top Message */}
        <View className="bg-[#F4F4F4]  rounded-xl p-4 mt-4">
          <Text className="text-body font-semibold text-text dark:text-textDark">
            You’re done!
          </Text>
          <Text className="text-small text-secondary dark:text-secondaryDark mt-1">
            Thanks for choosing our platform, all the best for you
          </Text>
        </View>

        {/* Success Card */}
        <View className="bg-[#F4F4F4] rounded-xl p-6 mt-6 items-center">
          {/* Success Icon */}
          <View className="w-28 h-28 mb-5 items-center justify-center">
            {/* <Ionicons name="checkmark-circle" size={90} color="#000" /> */}
            <MaterialIcons name="verified" size={90} color="black" />
          </View>

          <Text className="text-body font-semibold text-text dark:text-textDark text-center">
            Appointment Success!
          </Text>
          <Text className="text-small text-secondary dark:text-secondaryDark text-center mt-1 mb-6">
            You’ve completed the appointment process, you can see your appointment detail below
          </Text>

          {/* Details */}
          <View className="w-full pl-2 space-y-3">

            {/* Date */}
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={18} color="#6B7280" />
              <Text className="ml-2 text-small text-text dark:text-textDark">
                24/07/2024 - 26/07/2024
              </Text>
            </View>

            {/* Guests */}
            <View className="flex-row items-center">
              <Ionicons name="people-outline" size={18} color="#6B7280" />
              <Text className="ml-2 text-small text-text dark:text-textDark">
                8 Guests
              </Text>
            </View>

            {/* Phone */}
            <View className="flex-row items-center">
              <Ionicons name="call-outline" size={18} color="#6B7280" />
              <Text className="ml-2 text-small text-text dark:text-textDark">
                +01 234 567
              </Text>
            </View>

            {/* Email */}
            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={18} color="#6B7280" />
              <Text className="ml-2 text-small text-text dark:text-textDark">
                brown@dumpmail.com
              </Text>
            </View>
          </View>

          <Text className="text-small text-secondary dark:text-secondaryDark mt-6 text-center">
            Hope you have a pleasant experience!
          </Text>
        </View>
      </ScrollView>

      {/* Button */}
      <View className="absolute bottom-6 left-4 right-4">
        <TouchableOpacity
          onPress={() => router.push("/(prospectiveTenant)/(tabs)")}
          className="bg-text dark:bg-white py-4 rounded-full items-center"
        >
          <Text className="text-body font-semibold text-white dark:text-backgroundDark">
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
