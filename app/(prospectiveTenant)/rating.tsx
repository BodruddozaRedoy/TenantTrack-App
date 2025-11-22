import BottomButtonsFixed from "@/components/common/BottomButtonsFixed";
import PageTitle from "@/components/common/PageTitle";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SORT_TABS = ["Popular", "Latest", "Oldest"];

const REVIEWS = [
    {
        id: "1",
        user: "John Albert",
        time: "4 hours ago",
        rating: 5,
        text: "Super comfy place",
    },
    {
        id: "2",
        user: "Emily",
        time: "Yesterday",
        rating: 5,
        text: "I recently had the pleasure of touring the townhouse at The Minimalist, Brooklyn, and I was thoroughly impressed. This property truly stands out in the neighborhood for several reasons.",
    },
    {
        id: "3",
        user: "Nathan",
        time: "3 days ago",
        rating: 4,
        text: "This house is a gem in Brooklyn! The location is unbeatable, with easy access to the subway and Prospect Park just around the corner. The house itself is beautifully maintained.",
    },
    {
        id: "4",
        user: "Olivia",
        time: "1 week ago",
        rating: 5,
        text: "Loved the spacious interiors and the gourmet kitchen. The master suite is luxurious and the neighborhood feels very safe. Highly recommended!",
    },
];

export default function RatingsScreen() {
    const [activeSort, setActiveSort] = useState("Popular");
    const { t } = useTranslation();

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            {/* Header */}
            <PageTitle text="Ratings" leftIcon={true} leftOnPress={() => router.back()}/>
                <View className="border-b border-gray-200 dark:border-gray-700"/>

            <ScrollView showsVerticalScrollIndicator={false} className="px-5 pt-4">
                {/* Listing Info */}
                <Text className="text-body font-semibold text-text dark:text-textDark">
                    The Minimalist
                </Text>
                <Text className="text-small text-secondary dark:text-secondaryDark mb-2">
                    Brooklyn, New York
                </Text>

                {/* Rating Summary */}
                <View className="flex-row items-center mb-5">
                    <View className="flex-row mr-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Ionicons key={i} name="star" size={18} color="#FACC15" />
                        ))}
                    </View>
                    <Text className="text-body font-semibold text-text dark:text-textDark">
                        4.9
                    </Text>
                </View>

                {/* Segmented Sort Tabs */}
                <View className="flex-row bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6">
                    {SORT_TABS.map((item) => {
                        const selected = item === activeSort;
                        return (
                            <TouchableOpacity
                                key={item}
                                onPress={() => setActiveSort(item)}
                                className={`flex-1 py-2 rounded-full items-center ${selected
                                        ? "bg-background dark:bg-backgroundDark"
                                        : ""
                                    }`}
                            >
                                <Text
                                    className={`text-small font-medium ${selected
                                            ? "text-text dark:text-background"
                                            : "text-secondary dark:text-secondaryDark"
                                        }`}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>


                {/* Reviews List */}
                <FlatList
                    data={REVIEWS}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <View className="bg-gray-100 dark:bg-[#1E1E1E] rounded-xl p-4 mb-4">
                            <View className="flex-row items-center mb-1">
                                {Array.from({ length: item.rating }).map((_, i) => (
                                    <Ionicons key={i} name="star" size={14} color="#FACC15" />
                                ))}
                                <Text className="ml-2 text-small font-medium text-text dark:text-textDark">
                                    {item.user}
                                </Text>
                                <Text className="ml-1 text-caption text-secondary dark:text-secondaryDark">
                                    • {item.time}
                                </Text>
                            </View>

                            <Text className="text-small text-text dark:text-textDark leading-5">
                                {item.text}
                            </Text>
                        </View>
                    )}
                />
            </ScrollView>

            {/* Add Review Button */}
            <BottomButtonsFixed secondButtonOnPress={() => router.push("/(prospectiveTenant)/add-review")} secondButtonText={t('add_review')} />
        </SafeAreaView>
    );
}
