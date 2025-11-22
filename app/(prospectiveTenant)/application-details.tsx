import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const PHOTOS = [
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80",
    "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
];

const statusBadgeColor = {
    Pending: "#EAB30890",
    Approved: "#22C55E90",
    Rejected: "#EF444490",
};

export default function ApplicationDetailsScreen() {
    const { id } = useLocalSearchParams();
    const { t } = useTranslation();

    // Mock data (replace with API later)
    const data = {
        id,
        title: "The Minimalist",
        location: "Brooklyn, New York",
        price: `SAR 45,000 ${t("month")}`,
        guests: `6 ${t("guest")}`,
        rooms: `3 ${t("bedrooms")}`,
        baths: `2 ${t("baths")}`,
        rating: "4.9",
        reviews: 485,
        status: "Pending",
        appliedDate: "10/14/2025",
        paymentTerm: t("monthly"),
        lease: "12 months",
        desiredMove: "2025-11-01",
    };

    return (
        <View className="flex-1 bg-background dark:bg-backgroundDark">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Image + Back */}
                <View className="relative">
                    <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80",
                        }}
                        className="w-full h-64"
                    />

                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-10 left-4 bg-white/90 p-2 rounded-full mt-5"
                    >
                        <Ionicons name="arrow-back" size={22} color="#000" />
                    </TouchableOpacity>

                    {/* Status Badge */}
                    <View
                        className="absolute top-10 right-4 px-3 py-1 rounded-full mt-5"
                        style={{ backgroundColor: statusBadgeColor[data.status] }}
                    >
                        <Text className="text-white text-xs font-medium">
                            {data.status === "Pending" ? t("pending") : data.status === "Approved" ? t("approved") : t("rejected")}
                        </Text>
                    </View>
                </View>

                {/* Details Section */}
                <View className="px-5 py-4">
                    <View className="flex-row justify-between items-start mb-2">
                        <View className="flex-1">
                            <Text className="text-body font-semibold text-text dark:text-textDark">
                                {data.title}
                            </Text>
                            <Text className="text-caption text-secondary dark:text-secondaryDark">
                                {data.location}
                            </Text>
                        </View>

                        <Text className="text-body font-semibold text-text dark:text-textDark">
                            {data.price}
                        </Text>
                    </View>

                    {/* Specs */}
                    <View className="flex-row flex-wrap gap-2 my-2">
                        <View className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                            <Text className="text-caption text-secondary dark:text-secondaryDark">
                                👥 {data.guests}
                            </Text>
                        </View>
                        <View className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                            <Text className="text-caption text-secondary dark:text-secondaryDark">
                                🛏 {data.rooms}
                            </Text>
                        </View>
                        <View className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                            <Text className="text-caption text-secondary dark:text-secondaryDark">
                                🛁 {data.baths}
                            </Text>
                        </View>
                    </View>

                    {/* Rating */}
                    <View className="flex-row items-center mb-6">
                        <Text className="text-caption text-yellow-500">⭐ {data.rating}</Text>
                        <Text className="text-caption text-secondary ml-1">
                            ({data.reviews} Reviews)
                        </Text>
                    </View>

                    {/* Contact person */}
                    <Text className="text-body font-semibold text-text dark:text-textDark mb-2">
                        {t("contact_person")}
                    </Text>
                    <View className="flex-row items-center justify-between mb-5">
                        <TouchableOpacity  className="flex-row items-center">
                            <View className="w-12 h-12 rounded-full bg-gray-200 mr-3" />
                            <View>
                                <View className="flex-row items-center">
                                    <Text className="text-body font-semibold text-text dark:text-textDark mr-1">
                                        Steven Adams
                                    </Text>
                                    <MaterialIcons name="verified" size={14} color="#3B82F6" />
                                    <Text className="ml-1 text-caption text-blue-500">
                                        {t("verified")}
                                    </Text>
                                </View>
                                <Text className="text-caption text-secondary dark:text-secondaryDark">
                                    {t("property_owner")}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View className="flex-row gap-3">
                            <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/chat-detail")} className="">
                                <AntDesign name="message" size={24} color="#999999" />
                            </TouchableOpacity>
                            <TouchableOpacity className="">
                                <Ionicons name="call-sharp" size={24} color="#999999" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Information */}
                    <Text className="text-body font-semibold text-text dark:text-textDark mb-2">
                        {t("information")}
                    </Text>

                    <View className="mb-6">
                        <InfoItem label={t("applied")} value={data.appliedDate} />
                        <InfoItem label={t("payment_term")} value={data.paymentTerm} />
                        <InfoItem label={t("lease_duration")} value={data.lease} />
                        <InfoItem label={t("desired_move_in_date_label")} value={data.desiredMove} />
                    </View>

                    {/* Photos */}
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-body font-semibold text-text dark:text-textDark">
                            {t("photos")}
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-caption text-gray-400 font-semibold">{t("see_all")}</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={PHOTOS}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View className="w-3" />}
                        keyExtractor={(_, i) => "photo-" + i}
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: item }}
                                className="w-48 h-36 bg-gray-300 rounded-lg"
                            />
                        )}
                    />
                </View>
            </ScrollView>

            {/* Footer Button */}
            <View className="p-4 border-t border-gray-200 dark:border-gray-800 pb-7">
                <TouchableOpacity className="bg-black py-4 rounded-full">
                    <Text className="text-center text-white font-semibold">
                        {t("cancel_appointment")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function InfoItem({ label, value }: any) {
    return (
        <View className="mb-1 flex-row items-center gap-1">
            <Text className="text-caption font-semibold text-gray-400 dark:text-secondaryDark">
                {label}
            </Text>
            <Text className="text-small font-medium text-text dark:text-textDark">
                {value}
            </Text>
        </View>
    );
}
