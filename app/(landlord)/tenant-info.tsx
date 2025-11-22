import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

//
// TYPES
//

type PropertyItemProps = {
    title: string;
    price: string;
    location: string;
    image: string;
};

type TenantInfoProps = {
    name: string;
    nationality: string;
    address: string;
    // coverImage: string;
    avatar: string;
};

//
// SCREEN
//

export default function TenantInfoScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    const tenant: TenantInfoProps = {
        name: "Alif",
        nationality: "Saudi Arabian",
        address: "Al Bustan CPO",
        // coverImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    };

    return (
        <View className="flex-1 bg-background dark:bg-backgroundDark">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Top Section with Cover Image */}
                <View className="relative">

                    {/* Back button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-4 left-4 z-20 bg-black/40 p-2 rounded-full mt-10"
                    >
                        <Ionicons name="chevron-back" size={22} color="#fff" />
                    </TouchableOpacity>

                    {/* Cover Photo */}
                    <Image
                        source={{ uri: tenant.avatar }}
                        className="w-full h-[350px]"
                        resizeMode="cover"
                    />

                    {/* Avatar + Info Card */}
                    <View className="absolute left-4 right-4 -bottom-10">
                        <View className="flex-row items-center gap-4 bg-card dark:bg-cardDark p-4 rounded-2xl shadow-md">

                            <View>
                                <Text className="text-subtitle font-bold text-text dark:text-textDark">
                                    {tenant.name}
                                </Text>

                                <View className="flex-row items-center gap-2 mt-1">
                                    <Text className="text-small text-secondary dark:text-secondaryDark">
                                        {tenant.nationality}
                                    </Text>

                                    <View className="w-1 h-1 rounded-full bg-gray-400" />

                                    <View className="flex-row items-center">
                                        <Ionicons
                                            name="location-outline"
                                            size={14}
                                            color="#6B7280"
                                        />
                                        <Text className="ml-1 text-small text-secondary dark:text-secondaryDark">
                                            {tenant.address}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Spacer below floating card */}
                <View className="h-16" />


                {/* Tenant Details Section */}
                <View className="bg-card dark:bg-cardDark mx-4 p-4 rounded-2xl mt-2">
                    <Text className="text-subtitle font-bold mb-3 text-text dark:text-textDark">
                        Tenant Details
                    </Text>

                    <View className="space-y-4">

                        {/* Phone */}
                        <View className="flex-row items-center justify-between">
                            <Text className="text-small text-secondary dark:text-secondaryDark">Phone</Text>
                            <Text className="text-small font-semibold text-text dark:text-textDark">
                                +966 55 123 4567
                            </Text>
                        </View>

                        {/* Email */}
                        <View className="flex-row items-center justify-between">
                            <Text className="text-small text-secondary dark:text-secondaryDark">Email</Text>
                            <Text className="text-small font-semibold text-text dark:text-textDark">
                                alif@example.com
                            </Text>
                        </View>

                        {/* Gender */}
                        <View className="flex-row items-center justify-between">
                            <Text className="text-small text-secondary dark:text-secondaryDark">Gender</Text>
                            <Text className="text-small font-semibold text-text dark:text-textDark">
                                Male
                            </Text>
                        </View>

                        {/* Marital Status */}
                        <View className="flex-row items-center justify-between">
                            <Text className="text-small text-secondary dark:text-secondaryDark">Marital Status</Text>
                            <Text className="text-small font-semibold text-text dark:text-textDark">
                                Single
                            </Text>
                        </View>

                        {/* National ID */}
                        <View className="flex-row items-center justify-between">
                            <Text className="text-small text-secondary dark:text-secondaryDark">National ID</Text>
                            <Text className="text-small font-semibold text-text dark:text-textDark">
                                1234567890
                            </Text>
                        </View>

                        {/* Occupation */}
                        <View className="flex-row items-center justify-between">
                            <Text className="text-small text-secondary dark:text-secondaryDark">Occupation</Text>
                            <Text className="text-small font-semibold text-text dark:text-textDark">
                                Software Engineer
                            </Text>
                        </View>

                        {/* Salary */}
                        <View className="flex-row items-center justify-between">
                            <Text className="text-small text-secondary dark:text-secondaryDark">Salary</Text>
                            <Text className="text-small font-semibold text-text dark:text-textDark">
                                SAR 12,500 / month
                            </Text>
                        </View>

                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

//
// COMPONENTS
//

const PropertyCard = ({ title, price, location, image }: PropertyItemProps) => (
    <View className="bg-white dark:bg-cardDark rounded-xl overflow-hidden shadow-sm">

        <Image
            source={{ uri: image }}
            className="w-full h-28"
            resizeMode="cover"
        />

        <View className="p-3">
            <Text className="text-body font-semibold text-text dark:text-textDark">
                {title}
            </Text>

            <Text className="text-small font-semibold text-text dark:text-textDark">
                {price}
            </Text>

            <View className="flex-row items-center mt-1">
                <Ionicons name="location-outline" size={14} color="#6B7280" />
                <Text className="ml-1 text-caption text-secondary dark:text-secondaryDark">
                    {location}
                </Text>
            </View>
        </View>

    </View>
);

//
// DATA
//

const properties: PropertyItemProps[] = [
    {
        title: "Luxury Villa",
        price: "SAR 45,000 /month",
        location: "Al Nakheel, Riyadh",
        image: "https://images.unsplash.com/photo-1507086182422-97bd7ca241fa",
    },
    {
        title: "Luxury Villa",
        price: "SAR 45,000 /month",
        location: "Al Nakheel, Riyadh",
        image: "https://images.unsplash.com/photo-1507086182422-97bd7ca241fa",
    },
    {
        title: "Luxury Villa",
        price: "SAR 45,000 /month",
        location: "Al Nakheel, Riyadh",
        image: "https://images.unsplash.com/photo-1507086182422-97bd7ca241fa",
    },
    {
        title: "Luxury Villa",
        price: "SAR 45,000 /month",
        location: "Al Nakheel, Riyadh",
        image: "https://images.unsplash.com/photo-1507086182422-97bd7ca241fa",
    },
];
