import PageTitle from "@/components/common/PageTitle";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data (will replace with API later)
const APPLICATIONS = [
    {
        id: "1",
        title: "Luxury Villa",
        price: "SAR 45,000",
        location: "Al Khuzama, Riyadh",
        status: "Pending",
        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    },
    {
        id: "2",
        title: "Luxury Villa",
        price: "SAR 48,600",
        location: "Al Khuzama, Riyadh",
        status: "Approved",
        image:
            "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
    },
    {
        id: "3",
        title: "Luxury Villa",
        price: "SAR 45,000",
        location: "Al Khuzama, Riyadh",
        status: "Rejected",
        image:
            "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
    },
];

const statusBadgeColor = {
    Pending: "#EAB30890",    // Yellow
    Approved: "#22C55E90",   // Green
    Rejected: "#EF444490",   // Red
};

export default function MyApplicationsScreen() {
    const { t } = useTranslation();
    const TABS = [t("viewing_requests"), t("rental_applications")];
    const [activeTab, setActiveTab] = useState(TABS[0]);

    const handlePressCard = (item: any) => {
        router.push({
            pathname: "/(prospectiveTenant)/application-details",
            params: { id: item.id }, // later use id to fetch API
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            {/* Header */}
            <PageTitle text={t("my_applications")} leftIcon={true} leftOnPress={() => router.back()} />
            <View className="border-b border-gray-200 dark:border-gray-700" />

            {/* Tabs */}
            {/* Segmented Sort Tabs */}
            <View className="flex-row bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6 mt-5 mx-7">
                {TABS.map((item) => {
                    const selected = item === activeTab;
                    return (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setActiveTab(item)}
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

            {/* Applications List */}
            <FlatList
                data={APPLICATIONS}
                numColumns={2}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
                columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handlePressCard(item)}
                        activeOpacity={0.8}
                        className="w-[48%] bg-card dark:bg-cardDark rounded-xl overflow-hidden shadow-sm"
                    >
                        <View className="relative">
                            <Image source={{ uri: item.image }} className="h-[120px] w-full" />
                            <View
                                className="absolute top-2 right-2 px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: statusBadgeColor[item.status] }}
                            >
                                <Text className="text-[10px] font-medium text-white">
                                    {item.status === "Pending" ? t("pending") : item.status === "Approved" ? t("approved") : t("rejected")}
                                </Text>
                            </View>
                        </View>

                        <View className="p-3 rounded-t-xl bg-card dark:bg-cardDark ">
                            <Text className="text-body font-semibold text-text dark:text-textDark" numberOfLines={1}>
                                {item.title}
                            </Text>
                            <Text className="text-caption font-semibold text-secondary dark:text-secondaryDark">
                                {item.price}
                                <Text className="font-normal">{t("month")}</Text>
                            </Text>
                            <Text className="text-caption text-secondary dark:text-secondaryDark">
                                📍 {item.location}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}
