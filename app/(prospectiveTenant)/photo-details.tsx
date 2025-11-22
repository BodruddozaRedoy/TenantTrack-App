import PageTitle from "@/components/common/PageTitle";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhotosDetailScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const CATEGORIES = [t("all_photos"), t("parking_lot"), t("living_room"), t("washroom")];
    const [active, setActive] = useState(CATEGORIES[0]);

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            {/* Header */}
            <PageTitle text={t("photos")} leftIcon={true} leftOnPress={() => router.back()} />

            <ScrollView>
                {/* Tabs */}
                <FlatList
                    data={CATEGORIES}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 , paddingBottom: 20}}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => {
                        const selected = active === item;
                        return (
                            <TouchableOpacity
                                onPress={() => setActive(item)}
                                className={`px-5 h-9 justify-center items-center rounded-full mr-3 border ${selected
                                    ? "bg-text dark:bg-white border-text dark:border-white"
                                    : "bg-background dark:bg-backgroundDark border-gray-300 dark:border-gray-700"
                                    }`}
                            >
                                <Text
                                    className={`text-small leading-none font-medium ${selected
                                        ? "text-white dark:text-backgroundDark"
                                        : "text-secondary dark:text-secondaryDark"
                                        }`}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                    ListFooterComponent={<View className="w-1" />}
                />
                <View className="border-b border-gray-200 dark:border-gray-700" />




                {/* Photos Container (render images later) */}
                <View className="flex-1 items-center justify-center mt-5">
                    <Text className="text-secondary dark:text-secondaryDark">
                        {active} {t("content_appears_here")}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
