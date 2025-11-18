import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TenantItemProps = {
    name: string;
    due: string;
    next: string;
};

export default function MyTenantScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">

            {/* Header */}
            <View className="flex-row items-center px-4 pt-4 pb-2">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color={isDark ? "#fff" : "#000"}
                    />
                </TouchableOpacity>

                <View className="flex-1">
                    <Text className="text-center text-title font-bold text-text dark:text-textDark">
                        My Tenant
                    </Text>
                </View>

                {/* placeholder for balancing layout */}
                <View className="w-6" />
            </View>

            {/* Tenant List */}
            <ScrollView
                className="px-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                {tenantList.map((item, index) => (
                    <TenantCard key={index} {...item} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

//
// Components
//

const TenantCard = ({ name, due, next }: TenantItemProps) => (
    <View className="bg-card dark:bg-cardDark p-4 rounded-xl mb-4 flex-row items-center gap-4">
        <View className="w-12 h-12 bg-gray-400 rounded-lg" />

        <View>
            <Text className="text-body font-semibold text-text dark:text-textDark">
                {name}
            </Text>
            <Text className="text-caption text-secondary dark:text-secondaryDark">
                Due Payment : {due}
            </Text>
            <Text className="text-caption text-secondary dark:text-secondaryDark">
                Next Payment : {next}
            </Text>
        </View>
    </View>
);

//
// Dummy Data
//

const tenantList: TenantItemProps[] = [
    { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
    { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
    { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
    { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
    { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
    { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
    { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
    { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
];
