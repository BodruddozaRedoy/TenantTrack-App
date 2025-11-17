import PropertyOwnerModal from "@/components/shared/PropertyOwnerModal";
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const AMENITIES = ["Pool", "Gym", "Parking", "Central AC", "Security"];
const SECURITY_FEATURES = [
    "Gated Community",
    "Security Cameras",
    "Doorman",
    "Secure Parking",
    "24/7 Security Guard",
];

const PHOTOS = [
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80",
    "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
];

export default function HouseDetailScreen() {
    const [showOwner, setShowOwner] = useState(false);

    return (
        <View className="flex-1 bg-background dark:bg-backgroundDark">
            <StatusBar barStyle="dark-content" />

            {/* Top image + overlaid header buttons */}
            <View className="w-full h-80 bg-gray-200">
                <Image
                    source={{
                        uri: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200&q=80",
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                />

                {/* Overlay header */}
                <View className="absolute top-4 left-4 right-4 flex-row items-center justify-between mt-10">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 rounded-full bg-background/80 items-center justify-center"
                    >
                        <Ionicons name="chevron-back" size={22} color="#000" />
                    </TouchableOpacity>


                </View>
            </View>

            {/* Content + bottom buttons */}
            <View className="flex-1 rounded-t-xl bg-background dark:bg-backgroundDark">
                <ScrollView
                    className="flex-1 bg-background dark:bg-backgroundDark pt-8 "
                // showsVerticalScrollIndicator={false}
                // contentContainerStyle={{ paddingBottom: 120 }}
                >
                    {/* Card content */}
                    <View className="bg-background dark:bg-backgroundDark rounded-t-3xl -mt-6 px-5 pt-7 pb-40">
                        {/* Title & location */}
                        <View className="mb-3 flex-row justify-between">
                            <View>
                                <Text className="text-title font-semibold text-text dark:text-textDark">
                                    The Minimalist
                                </Text>
                                <Text className="text-small text-secondary dark:text-secondaryDark">
                                    Brooklyn, New York
                                </Text>
                            </View>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="bookmark-minus" size={26} color="#999999" />
                            </TouchableOpacity>
                        </View>

                        {/* Info pills row */}
                        <View className="flex-row flex-wrap gap-2 mb-3">
                            <InfoPill icon={<Ionicons name="bed-outline" size={14} />}>
                                3 Bedroom
                            </InfoPill>
                            <InfoPill
                                icon={
                                    <MaterialCommunityIcons
                                        name="sofa-outline"
                                        size={14}
                                    />
                                }
                            >
                                Well Furnished
                            </InfoPill>
                            <InfoPill icon={<Ionicons name="water-outline" size={14} />}>
                                2 Bath
                            </InfoPill>
                        </View>

                        {/* Rating row */}
                        <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/rating")} className="flex-row items-center">
                            <Ionicons name="star" size={16} color="#FACC15" />
                            <Text className="ml-1 text-small font-semibold text-text dark:text-textDark">
                                4.8
                            </Text>
                            <Text className="ml-2 text-small text-secondary dark:text-secondaryDark">
                                (168 Reviews)
                            </Text>
                        </TouchableOpacity>
                        <View className="my-4 border-b border-gray-200 dark:border-gray-700" />

                        {/* Contact person */}
                        <Text className="text-body font-semibold text-text dark:text-textDark mb-2">
                            Contact Person
                        </Text>
                        <View className="flex-row items-center justify-between mb-5">
                            <TouchableOpacity onPress={() => setShowOwner(true)} className="flex-row items-center">
                                <View className="w-12 h-12 rounded-full bg-gray-200 mr-3" />
                                <View>
                                    <View className="flex-row items-center">
                                        <Text className="text-body font-semibold text-text dark:text-textDark mr-1">
                                            Steven Adams
                                        </Text>
                                        <MaterialIcons name="verified" size={14} color="#3B82F6" />
                                        <Text className="ml-1 text-caption text-blue-500">
                                            VERIFIED
                                        </Text>
                                    </View>
                                    <Text className="text-caption text-secondary dark:text-secondaryDark">
                                        Property Owner
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

                        {/* Description */}
                        <SectionTitle title="Description" />
                        <Text className="text-small leading-5 text-secondary dark:text-secondaryDark mb-4">
                            Located in the vibrant neighborhood of Park Slope, Brooklyn. The
                            exquisite property perfectly blends historic charm with modern
                            luxury, offering an unparalleled living experience in one of New
                            York City&apos;s most sought-after areas.
                        </Text>

                        {/* Amenities */}
                        <SectionTitle title="Amenities" />
                        <View className="flex-row flex-wrap gap-1 mb-3">
                            {AMENITIES.map((item) => (
                                <View key={item} className=" mb-2">
                                    <Chip label={item} />
                                </View>
                            ))}
                        </View>


                        {/* Security Features */}
                        <SectionTitle title="Security Features" />
                        <View className="flex-row flex-wrap gap-1 mb-3">
                            {SECURITY_FEATURES.map((item) => (
                                <View key={item} className=" mb-2">
                                    <Chip label={item} />
                                </View>
                            ))}
                        </View>

                        {/* Photos */}
                        <View className="flex-row items-center justify-between mb-3">
                            <Text className="text-body font-semibold text-text dark:text-textDark">
                                Photo
                            </Text>
                            <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/photo-details")}>
                                <Text className="text-small font-semibold text-secondary dark:text-secondaryDark">
                                    See All
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={PHOTOS}
                            keyExtractor={(_, index) => `photo-${index}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View className="w-3" />}
                            contentContainerStyle={{ paddingRight: 10 }}
                            renderItem={({ item }) => (
                                <Image
                                    source={{ uri: item }}
                                    className="w-[250px] h-40 rounded-xl bg-gray-200"
                                    resizeMode="cover"
                                />
                            )}
                        />
                    </View>
                </ScrollView>

                {/* Bottom sticky buttons */}
                <View className="absolute left-0 right-0 bottom-0 bg-background dark:bg-backgroundDark px-5 pb-10 pt-3">
                    <View className="flex-row gap-3">
                        <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/appointment-request")} className="flex-1 h-12 rounded-full border border-gray-300 items-center justify-center">
                            <Text className="text-body text-text dark:text-textDark">
                                Request
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/appointment-apply")} className="flex-1 h-12 rounded-full bg-text dark:bg-textDark items-center justify-center">
                            <Text className="text-body text-background dark:text-backgroundDark">
                                Apply
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <PropertyOwnerModal
                    visible={showOwner}
                    onClose={() => setShowOwner(false)}
                />


            </View>
        </View>
    );
}

/* ---------- Small reusable components ---------- */

const InfoPill = ({
    icon,
    children,
}: {
    icon?: React.ReactNode;
    children: React.ReactNode;
}) => (
    <View className="flex-row items-center px-3 py-1.5 rounded-full bg-background border dark:bg-backgroundDark">
        {icon && <View className="mr-1.5">{icon}</View>}
        <Text className="text-caption text-text dark:text-textDark font-semibold">
            {children}
        </Text>
    </View>
);

const SectionTitle = ({ title }: { title: string }) => (
    <Text className="text-body font-semibold text-text dark:text-textDark mb-2">
        {title}
    </Text>
);

const Chip = ({ label }: { label: string }) => (
    <View className="px-3 py-1.5 rounded-full border border-gray-300 bg-background dark:bg-cardDark">
        <Text className="text-caption text-text dark:text-textDark">{label}</Text>
    </View>
);
