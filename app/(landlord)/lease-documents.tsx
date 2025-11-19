import PageTitle from "@/components/common/PageTitle";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LeaseDocumentsScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            {/* HEADER */}
            <PageTitle text="Lease Documents" leftIcon leftOnPress={() => router.back()} />
            <View className="border-b border-gray-200 dark:border-gray-700 mb-5" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="px-5"
                contentContainerStyle={{ paddingBottom: 80 }}
            >
                {/* DOCUMENT ITEM */}
                {[1, 2].map((_, i) => (
                    <View
                        key={i}
                        className="bg-card dark:bg-cardDark rounded-2xl p-4 mt-4"
                    >
                        {/* Top Row */}
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="text-body font-semibold text-text dark:text-textDark">
                                    Lease Agreement
                                </Text>
                                <Text className="text-small text-secondary dark:text-secondaryDark mt-1">
                                    11/1/2024
                                </Text>
                            </View>

                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                2.4 MB
                            </Text>
                        </View>

                        {/* CONTACT PERSON */}
                        <Text className="text-small font-semibold mt-4 text-text dark:text-textDark">
                            Contact Person
                        </Text>

                        <View className="flex-row items-center mt-3">
                            {/* Avatar */}
                            <View className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />

                            <View className="ml-3 flex-1">
                                <View className="flex-row items-center gap-1">
                                    <Text className="text-body font-semibold text-text dark:text-textDark">
                                        Steven Adams
                                    </Text>
                                    <Ionicons name="checkmark-circle" size={16} color="#3b82f6" />
                                </View>

                                <Text className="text-caption text-secondary dark:text-secondaryDark">
                                    Property Owner
                                </Text>
                            </View>

                            <Ionicons
                                name="chatbubble-ellipses-outline"
                                size={20}
                                color="#9CA3AF"
                            />
                        </View>

                        {/* BUTTONS */}
                        <View className="flex-row justify-between mt-5">
                            <TouchableOpacity className="bg-primary dark:bg-primaryDark py-3 rounded-full w-[48%] items-center">
                                <Text className="text-white font-semibold">View</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="border border-gray-300 dark:border-gray-600 py-3 rounded-full w-[48%] items-center">
                                <Text className="text-text dark:text-textDark font-semibold">
                                    Download
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
