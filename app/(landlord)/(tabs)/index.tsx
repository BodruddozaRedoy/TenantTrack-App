import { IconConstants } from "@/constants/icons.constants";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//
// TYPES
//

type StatCardProps = {
    icon: any;
    value: string;
    label: string;
};

type TenantItemProps = {
    name: string;
    due: string;
    next: string;
};

type PropertyCardProps = {
    title: string;
    price: string;
    tag: string;
    location: string;
    person: string;
    status: string;
    image: string;
};

type ServiceCardProps = {
    title: string;
    urgency: "Low" | "Normal" | "High";
    person: string;
    location: string;
    image: string;
};

type UpdateItemProps = {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    msg: string;
    date: string;
    bg: string;
    color: string;
};

//
// MAIN SCREEN
//

export default function LandlordHomeScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const { t } = useTranslation();

    //
    // STATS DATA
    //

    const statsData: StatCardProps[] = [
        { icon: IconConstants.Property, value: "12", label: t('total_properties') },
        { icon: IconConstants.List, value: "08", label: t('active_listings') },
        { icon: IconConstants.Bag, value: "89%", label: t('occupancy_rate') },
        { icon: IconConstants.Calender, value: "120k", label: t('monthly_revenue') },
        { icon: IconConstants.Clock, value: "03", label: t('pending_listings') },
    ];

    const tenantList: TenantItemProps[] = [
        { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
        { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
        { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
    ];

    const properties: PropertyCardProps[] = [
        {
            title: "Luxury Villa",
            price: `SAR 45,000 ${t('month')}`,
            tag: "Viewing",
            location: "Al Nakheel, Riyadh",
            person: "Sarah Abdullah",
            status: "Viewing",
            image: "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
        },
        {
            title: "Luxury Villa",
            price: `SAR 45,000 ${t('month')}`,
            tag: "Viewing",
            location: "Al Nakheel, Riyadh",
            person: "Sarah Abdullah",
            status: "Viewing",
            image: "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
        },
        {
            title: "Luxury Villa",
            price: `SAR 45,000 ${t('month')}`,
            tag: "Rental",
            location: "Al Nakheel, Riyadh",
            person: "Sarah Abdullah",
            status: "Rental",
            image: "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
        },
    ];

    const services: ServiceCardProps[] = [
        {
            title: "Ac",
            urgency: "High",
            location: "Al Nakheel, Riyadh",
            person: "Sarah Abdullah",
            image: "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
        },
        {
            title: "Laundry",
            urgency: "Low",
            location: "Al Nakheel, Riyadh",
            person: "Sarah Abdullah",
            image: "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
        },
        {
            title: "Water",
            urgency: "Low",
            location: "Al Nakheel, Riyadh",
            person: "Sarah Abdullah",
            image: "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
        },
        {
            title: "Electricity",
            urgency: "Low",
            location: "Al Nakheel, Riyadh",
            person: "Sarah Abdullah",
            image: "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
        },
        {
            title: "Gas",
            urgency: "Low",
            location: "Al Nakheel, Riyadh",
            person: "Sarah Abdullah",
            image: "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
        },
    ];

    const updates: UpdateItemProps[] = [
        {
            icon: "bookmark-outline",
            title: t('receipt_released'),
            msg: t('receipt_released_msg'),
            date: "20/07/2024",
            bg: "bg-black",
            color: "#fff",
        },
        {
            icon: "checkmark-done-outline",
            title: t('payment_success'),
            msg: t('payment_success_msg'),
            date: "20/07/2024",
            bg: "bg-green-200",
            color: "#000",
        },
        {
            icon: "close-outline",
            title: t('rent_canceled'),
            msg: t('rent_canceled_msg'),
            date: "20/07/2024",
            bg: "bg-red-200",
            color: "#000",
        },
        {
            icon: "time-outline",
            title: t('pending_rent'),
            msg: t('pending_rent_msg'),
            date: "20/07/2024",
            bg: "bg-yellow-200",
            color: "#000",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="px-5"
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* HEADER */}
                <View className="flex-row justify-between items-center">
                    <View className="pt-4 mb-3">
                        <Text className="text-title font-bold text-text dark:text-textDark">
                            {t('welcome_back')}
                        </Text>
                        <Text className="text-small text-secondary dark:text-secondaryDark">
                            {t('property_overview')}
                        </Text>
                    </View>

                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity onPress={() => router.push("/(tenant)/notification")}>
                            <Octicons
                                name="bell-fill"
                                size={24}
                                color={isDark ? "#fff" : "#A1A1A1"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/(landlord)/my-listing")}>
                            <Image source={IconConstants.Resume} className="size-8" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* STATS */}
                <FlatList
                    horizontal
                    data={statsData}
                    keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12, paddingVertical: 10 }}
                    renderItem={({ item }) => <StatCard {...item} isDark={isDark} />}
                />

                {/* MY TENANT */}
                <View className="bg-card dark:bg-cardDark px-4 rounded-2xl">
                    <SectionHeader
                        title={t('my_tenant')}
                        seeAll
                        onPress={() => router.push("/(landlord)/my-tenant")}
                    />

                    <View className="mt-3 mb-6">
                        {tenantList.map((t, idx) => (
                            <TenantItem key={idx} {...t} />
                        ))}
                    </View>
                </View>

                {/* RECENT APPLICATIONS */}
                <View className="bg-card dark:bg-cardDark pb-4 px-4 rounded-2xl mt-5">
                    <SectionHeader
                        title={t('recent_applications')}
                        onPress={() => router.push("/(landlord)/my-applications")}
                        seeAll
                    />

                    <View className="mt-4">
                        <View className="flex-row justify-between mb-4 gap-2">
                            {properties[0] && <PropertyCard {...properties[0]} />}
                            {properties[1] && <PropertyCard {...properties[1]} />}
                        </View>

                        <View className="flex-row justify-between">
                            {properties[2] && <PropertyCard {...properties[2]} />}
                            {properties[3] && <PropertyCard {...properties[3]} />}
                        </View>
                    </View>
                </View>

                {/* SERVICE REQUESTS */}
                <View className="bg-card dark:bg-cardDark px-4 rounded-2xl mt-5 pb-4">
                    <SectionHeader
                        title={t('service_requests')}
                        onPress={() => router.push("/(landlord)/all-services")}
                        seeAll
                    />

                    <View className="mt-4">
                        <View className="flex-row justify-between mb-4">
                            {services[0] && <ServiceCard {...services[0]} />}
                            {services[1] && <ServiceCard {...services[1]} />}
                        </View>

                        <View className="flex-row justify-between">
                            {services[2] && <ServiceCard {...services[2]} />}
                            {services[3] && <ServiceCard {...services[3]} />}
                        </View>
                    </View>
                </View>

                {/* UPDATES */}
                {/* <View className="bg-card dark:bg-cardDark px-2 rounded-2xl mt-5 mb-10">
                    <Text className="text-title text-center mt-4 text-text dark:text-textDark">
                        {t('updates_tips')}
                    </Text>

                    <View className="bg-card dark:bg-cardDark p-2 rounded-2xl mt-3">
                        {updates.map((u, idx) => (
                            <UpdateItem key={idx} {...u} />
                        ))}
                    </View>
                </View> */}
            </ScrollView>
        </SafeAreaView>
    );
}

//
// COMPONENTS
//

const StatCard = ({ icon, value, label, isDark }: StatCardProps & { isDark: boolean }) => (
    <View className="bg-card dark:bg-cardDark p-3 rounded-2xl w-40 items-start">
        <Image
            source={icon}
            className="w-10 h-10 mb-2"
            resizeMode="contain"
            style={{ tintColor: isDark ? "#fff" : "#000" }}
        />

        <Text className="text-title text-text dark:text-textDark">{value}</Text>
        <Text className="text-small text-secondary dark:text-secondaryDark">{label}</Text>
    </View>
);

const TenantItem = ({ name, due, next }: TenantItemProps) => {
    const { t } = useTranslation();
    return (
        <TouchableOpacity
            onPress={() => router.push("/(landlord)/tenant-info")}
            className="bg-[#E5E5E5] dark:bg-[#2A2A2A] p-4 rounded-xl mb-3 flex-row items-center gap-4"
        >
            <View className="w-12 h-12 rounded-lg bg-gray-400 dark:bg-gray-600" />
            <View>
                <Text className="text-body font-semibold text-text dark:text-textDark">{name}</Text>
                <Text className="text-caption text-secondary dark:text-secondaryDark">
                    {t('due_payment')} : {due}
                </Text>
                <Text className="text-caption text-secondary dark:text-secondaryDark">
                    {t('next_payment')} : {next}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const PropertyCard = ({ title, price, image, location, person, status }: PropertyCardProps) => (
    <View className="w-40 rounded-2xl overflow-hidden pt-24 relative">
        <Image source={{ uri: image }} className="w-full h-28 absolute top-0" />

        <View className="py-1 px-3 rounded-lg bg-black/30 absolute top-2 right-2">
            <Text
                className={`text-xs ${status === "Viewing" ? "text-yellow-500" : "text-green-500"
                    } font-semibold`}
            >
                {status}
            </Text>
        </View>

        <View className="bg-[#E5E5E5] dark:bg-[#2A2A2A] p-3 rounded-t-2xl">
            <Text className="text-body font-semibold text-text dark:text-textDark">{title}</Text>
            <Text className="text-small font-semibold text-text dark:text-textDark">{price}</Text>
            <Text className="text-caption text-secondary dark:text-secondaryDark mt-1">
                {location}
            </Text>
            <Text className="text-caption text-secondary dark:text-secondaryDark">{person}</Text>
        </View>
    </View>
);

const ServiceCard = ({ title, urgency, person, location, image }: ServiceCardProps) => (
    <View className="w-40 rounded-2xl overflow-hidden pt-24 relative">
        <Image source={{ uri: image }} className="w-full h-28 absolute top-0" />

        <View
            className={`absolute right-3 top-3 px-2 py-1 rounded-full ${urgency === "High"
                    ? "bg-red-500"
                    : urgency === "Normal"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
        >
            <Text className="text-caption text-white">{urgency}</Text>
        </View>

        <View className="bg-[#E5E5E5] dark:bg-[#2A2A2A] p-3 rounded-t-2xl">
            <Text className="text-body font-semibold text-text dark:text-textDark">{title}</Text>
            <Text className="text-small text-secondary dark:text-secondaryDark">{location}</Text>
            <Text className="text-caption text-secondary dark:text-secondaryDark">{person}</Text>
        </View>
    </View>
);

const UpdateItem = ({ icon, title, msg, date, bg, color }: UpdateItemProps) => (
    <View className="flex-row items-center mb-4 bg-[#E5E5E5] dark:bg-[#2A2A2A] p-2 rounded-lg">
        <View className={`p-5 rounded-xl items-center justify-center ${bg}`}>
            <Ionicons name={icon} size={22} color={color} />
        </View>

        <View className="ml-3 flex-1">
            <Text className="text-body font-semibold text-text dark:text-textDark">{title}</Text>
            <Text className="text-sm text-secondary dark:text-secondaryDark">{msg}</Text>
            <Text className="text-caption text-secondary dark:text-secondaryDark mt-1">{date}</Text>
        </View>
    </View>
);

const SectionHeader = ({
    title,
    onPress,
    seeAll,
}: {
    title: string;
        onPress?: () => void;
        seeAll?: boolean;
    }) => {
    const { t } = useTranslation();
    return (
        <View className="flex-row justify-between items-center mt-6">
            <Text className="text-subtitle font-bold text-text dark:text-textDark">{title}</Text>

            {seeAll && (
                <TouchableOpacity onPress={onPress}>
                    <Text className="text-small text-secondary dark:text-secondaryDark">{t('see_all')}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
