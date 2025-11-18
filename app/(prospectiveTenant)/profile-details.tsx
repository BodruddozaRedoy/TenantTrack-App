import PageTitle from "@/components/common/PageTitle";
import PrimaryButton from "@/components/common/PrimaryButton";
import GeneralTab from "@/components/shared/GeneralTab";
import LocationTab from "@/components/shared/LocationTab";
import { router } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    useColorScheme
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileDetailScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const [selectedTab, setSelectedTab] = useState<"general" | "locations">(
        "general"
    );

    const [form, setForm] = useState({
        email: "brown@dumpmail.com",
        fullName: "Chris Brown",
        phone: "+62 8123 3456 7890",
        countryCode: "US",
        countryName: "United States",
        idNumber: "",
        nationality: "",
        employment: "",
        expiredDate: "",
        purpose: "",
    });

    const updateField = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const purposeOptions = ["N/A", "Business", "Travel", "Student", "Work Visa"];

    const [showPurpose, setShowPurpose] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            <PageTitle text="Profile Detail" leftIcon leftOnPress={() => router.back()} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
                className="px-4"
            >
                {/* User Header */}
                <View className="items-center mt-4 mb-6">
                    <View className="size-28 rounded-full bg-gray-200 dark:bg-gray-700 mb-3" />

                    <Text className="text-body font-semibold text-text dark:text-textDark">
                        {form.fullName}
                    </Text>
                    <Text className="text-small text-secondary dark:text-secondaryDark">
                        {form.email}
                    </Text>
                </View>

                {/* Tabs */}
                <View className="flex-row justify-center bg-gray-100 dark:bg-cardDark rounded-full p-1 mb-6">
                    <TouchableOpacity
                        onPress={() => setSelectedTab("general")}
                        className={`flex-1 items-center py-2 rounded-full ${selectedTab === "general"
                            ? "bg-background dark:bg-backgroundDark"
                            : ""
                            }`}
                    >
                        <Text
                            className={`text-small font-medium ${selectedTab === "general"
                                ? "text-text dark:text-textDark"
                                : "text-secondary dark:text-secondaryDark"
                                }`}
                        >
                            General
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setSelectedTab("locations")}
                        className={`flex-1 items-center py-2 rounded-full ${selectedTab === "locations"
                            ? "bg-background dark:bg-backgroundDark"
                            : ""
                            }`}
                    >
                        <Text
                            className={`text-small font-medium ${selectedTab === "locations"
                                ? "text-text dark:text-textDark"
                                : "text-secondary dark:text-secondaryDark"
                                }`}
                        >
                            Locations
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* ------- FORM -------- */}
                {selectedTab === "general" && <GeneralTab form={form} updateField={updateField} isDark={isDark} showPurpose={showPurpose} setShowPurpose={setShowPurpose} purposeOptions={purposeOptions} />}

                {selectedTab === "locations" && <LocationTab />}

                {/* ------- Save Button -------- */}
                <View className="mt-4">
                    <PrimaryButton title="Save Changes" onPress={() => console.log(form)} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
