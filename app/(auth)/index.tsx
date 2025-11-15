import PrimaryButton from "@/components/common/PrimaryButton";
import { IconConstants } from "@/constants/icons.constants";
import { clsx } from "clsx";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Role {
  id: string;
  title: string;
  subtitle?: string;
}

export default function WelcomeScreen() {
  const [selected, setSelected] = useState<string>("prospective");

  const roles: Role[] = [
    { id: "prospective", title: "Prospective Tenant", subtitle: "Looking for a place to rent" },
    { id: "tenant", title: "Tenant", subtitle: "Already renting a property" },
    { id: "landlord", title: "Landlord", subtitle: "Property Owner" },
    { id: "agent", title: "Agent", subtitle: "Property management agent" },
  ];


  return (
    <SafeAreaView className="flex-1 bg-background  dark:bg-backgroundDark relative">
      <ScrollView className="px-6 pt-20">

        {/* Emoji */}
        <View className="items-center mb-6">
          <Image
            source={IconConstants.WelcomeEmoji}
            resizeMode="contain"
            className="size-10"
          />
        </View>

        {/* Title */}
        <Text className="text-headline text-center text-text dark:text-textDark mb-2">
          Welcome to WAJ
        </Text>

        {/* Subtitle */}
        <Text className="text-body text-center text-secondary dark:text-secondaryDark mb-8">
          To personalize your experience, may I know who you are?
        </Text>

        {/* Role Options */}
        <View className="gap-5">
          {roles.map((item) => {
            const isSelected = selected === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelected(item.id)}
                className={clsx(
                  "border p-4",
                  "bg-card dark:bg-cardDark",

                  // Border color change
                  isSelected
                    ? "border-primary dark:border-primaryDark"
                    : "border-gray-300 dark:border-gray-700",

                  // Rounded radius changes like the design
                  isSelected ? "rounded-2xl" : "rounded-full",

                  // Adjust padding when selected (card becomes bigger)
                  isSelected ? "py-5" : "py-4 pl-5"
                )}
              >
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-body font-semibold text-text dark:text-textDark">
                      {item.title}
                    </Text>

                    {/* Show subtitle only for the selected item */}
                    {isSelected && item.subtitle && (
                      <Text className="text-small text-secondary dark:text-secondaryDark mt-1">
                        {item.subtitle}
                      </Text>
                    )}
                  </View>

                  {/* Radio Button */}
                  <View
                    className={clsx(
                      "w-5 h-5 rounded-full border-2 items-center justify-center",
                      isSelected
                        ? "border-primary dark:border-primaryDark"
                        : "border-gray-400 dark:border-gray-600"
                    )}
                  >
                    {isSelected && (
                      <View className="w-2.5 h-2.5 rounded-full bg-primary dark:bg-primaryDark" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* NEXT BUTTON */}
        <View  className="mt-10 mb-10">
          <PrimaryButton
            title="Next"
            onPress={() => router.push({pathname: "/(auth)/onboarding", params: {role: selected}})}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
