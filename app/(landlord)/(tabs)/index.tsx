import { IconConstants } from "@/constants/icons.constants";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
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
// STATS DATA
//

const statsData: StatCardProps[] = [
    { icon: IconConstants.Property, value: "12", label: "Total Properties" },
    { icon: IconConstants.List, value: "08", label: "Active Listings" },
    { icon: IconConstants.Bag, value: "89%", label: "Occupancy Rate" },
    { icon: IconConstants.Calender, value: "120k", label: "Monthly Revenue" },
    { icon: IconConstants.Clock, value: "03", label: "Pending Listings" },
];

//
// MAIN SCREEN
//

export default function LandlordHomeScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    const chunkTwo = <T,>(arr: T[]): T[][] => {
        const result: T[][] = [];
        for (let i = 0; i < arr.length; i += 2) {
            result.push(arr.slice(i, i + 2));
        }
        return result;
    };

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            <StatusBar barStyle={"dark-content"} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="px-5"
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* HEADER */}
                <View className="flex-row justify-between items-center">
                    <View className="pt-4 mb-3">
                        <Text className="text-title font-bold text-text dark:text-textDark">
                            Welcome Back!
                        </Text>
                        <Text className="text-small text-secondary dark:text-secondaryDark">
                            Here's your property overview.
                        </Text>
                    </View>

                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity onPress={() => router.push("/(tenant)/notification")}>
                            <Octicons name="bell-fill" size={24} color="#A1A1A1" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/my-application")}>
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
                    renderItem={({ item }) => <StatCard {...item} />}
                />

                {/* MY TENANT */}
                <View className="bg-card dark:bg-cardDark px-4 rounded-2xl">
                    <SectionHeader title="My Tenant" seeAll onPress={() => router.push("/(landlord)/my-tenant")} />
                    <View className="mt-3 mb-6">
                        {tenantList.map((t, idx) => (
                            <TenantItem key={idx} {...t} />
                        ))}
                    </View>
                </View>

                {/* RECENT APPLICATIONS */}
                <View className="bg-card pb-4 dark:bg-cardDark px-4 rounded-2xl mt-5">
                    <SectionHeader
                        title="Recent Applications"
                        onPress={() => router.push("/(landlord)/my-listing")}
                        seeAll={true}
                    />

                    <View className="mt-4">
                        {/* Row 1 */}
                        <View className="flex-row justify-between mb-4 gap-2">
                            <TouchableOpacity className="">
                                <PropertyCard {...properties[0]} />
                            </TouchableOpacity>

                            {properties[1] && (
                                <TouchableOpacity className="">
                                    <PropertyCard {...properties[1]} />
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Row 2 */}
                        <View className="flex-row justify-between">
                            {properties[2] && (
                                <TouchableOpacity className="">
                                    <PropertyCard {...properties[2]} />
                                </TouchableOpacity>
                            )}

                            {properties[3] && (
                                <TouchableOpacity className="">
                                    <PropertyCard {...properties[3]} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>



                {/* SERVICE REQUESTS */}
                <View className="bg-card dark:bg-cardDark px-4 rounded-2xl mt-5 pb-4">
                    <SectionHeader
                        title="Service Requests"
                        onPress={() => router.push("/(landlord)/all-services")}
                        seeAll={true}
                    />

                    <View className="mt-4">
                        {/* Row 1 */}
                        <View className="flex-row justify-between mb-4">
                            <TouchableOpacity className="">
                                <ServiceCard {...services[0]} />
                            </TouchableOpacity>

                            {services[1] && (
                                <TouchableOpacity className="">
                                    <ServiceCard {...services[1]} />
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Row 2 */}
                        <View className="flex-row justify-between">
                            {services[2] && (
                                <TouchableOpacity className="">
                                    <ServiceCard {...services[2]} />
                                </TouchableOpacity>
                            )}

                            {services[3] && (
                                <TouchableOpacity className="">
                                    <ServiceCard {...services[3]} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>



                {/* UPDATES */}
                <View className="bg-card dark:bg-cardDark px-2 rounded-2xl mt-5">
                    <Text className="text-title text-center mt-4">Updates & Tips</Text>
                    <View className="bg-card dark:bg-cardDark p-2 rounded-2xl mt-3">
                        {updates.map((u, idx) => (
                            <UpdateItem key={idx} {...u} />
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

//
// COMPONENTS
//

const StatCard = ({ icon, value, label }: StatCardProps) => (
    <View className="bg-card dark:bg-cardDark p-5 rounded-2xl w-36 items-center">
        <Image
            source={icon}
            className="w-10 h-10 mb-2"
            resizeMode="contain"
        />

        <Text className="text-title text-text dark:text-textDark">
            {value}
        </Text>

        <Text className="text-small text-secondary dark:text-secondaryDark text-center">
            {label}
        </Text>
    </View>
);

const TenantItem = ({ name, due, next }: TenantItemProps) => (
    <TouchableOpacity onPress={() => router.push("/(landlord)/tenant-info")} className="bg-[#E5E5E5] p-4 rounded-xl mb-3 flex-row items-center gap-4">
        <View className="w-12 h-12 rounded-lg bg-gray-400" />
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
    </TouchableOpacity>
);

const PropertyCard = ({
    title,
    price,
    image,
    location,
    person,
    status,
}: PropertyCardProps) => (
    <View className="w-40 rounded-2xl overflow-hidden pt-24 relative">
        <Image source={{ uri: image }} className="w-full h-28 absolute top-0" />

        <View className="py-1 px-3 rounded-lg bg-black/30 absolute top-2 right-2">
            <Text className={`text-xs ${status == "Viewing" ? "text-yellow-500" : "text-green-500"} font-semibold`}>
                {status}
            </Text>
        </View>

        <View className="bg-[#E5E5E5] p-3 rounded-t-2xl">
            <Text className="text-body font-semibold text-text dark:text-textDark">{title}</Text>
            <Text className="text-small font-semibold text-text dark:text-textDark">{price}</Text>
            <Text className="text-caption text-secondary dark:text-secondaryDark mt-1">{location}</Text>
            <Text className="text-caption text-secondary dark:text-secondaryDark">{person}</Text>
        </View>
    </View>
);

const ServiceCard = ({
    title,
    urgency,
    person,
    location,
    image,
}: ServiceCardProps) => (
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

        <View className="bg-[#E5E5E5] p-3 rounded-t-2xl">
            <Text className="text-body font-semibold text-text dark:text-textDark">{title}</Text>
            <Text className="text-small text-secondary dark:text-secondaryDark">{location}</Text>
            <Text className="text-caption text-secondary dark:text-secondaryDark">{person}</Text>
        </View>
    </View>
);

const UpdateItem = ({
    icon,
    title,
    msg,
    date,
    bg,
    color,
}: UpdateItemProps) => (
    <View className="flex-row items-center mb-4 bg-[#e5e5e5] p-2
     rounded-lg">
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
    seeAll
}: {
    title: string;
        onPress?: () => void;
        seeAll?: boolean
}) => (
    <View className="flex-row justify-between items-center mt-6">
        <Text className="text-subtitle font-bold text-text dark:text-textDark">{title}</Text>
        {
            seeAll && <TouchableOpacity onPress={onPress}>
                <Text className="text-small text-secondary dark:text-secondaryDark">See All</Text>
            </TouchableOpacity>
        }
    </View>
);

//
// DATA
//

const tenantList: TenantItemProps[] = [
    { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
    { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
    { name: "Alif", due: "SAR 2500", next: "20/07/2024" },
];

const properties: PropertyCardProps[] = [
    {
        title: "Luxury Villa",
        price: "SAR 45,000 /month",
        tag: "Viewing",
        location: "Al Nakheel, Riyadh",
        person: "Sarah Abdullah",
        status: "Viewing",
        image: "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
    },
    {
        title: "Luxury Villa",
        price: "SAR 45,000 /month",
        tag: "Viewing",
        location: "Al Nakheel, Riyadh",
        person: "Sarah Abdullah",
        status: "Viewing",
        image: "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
    },
    {
        title: "Luxury Villa",
        price: "SAR 45,000 /month",
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
        title: "Receipt Released",
        msg: "Your receipt has been released",
        date: "20/07/2024",
        bg: "bg-black",
        color: "#fff",
    },
    {
        icon: "checkmark-done-outline",
        title: "Payment Success",
        msg: "Your payment has been successfully",
        date: "20/07/2024",
        bg: "bg-green-200",
        color: "#000",
    },
    {
        icon: "close-outline",
        title: "Rent Canceled",
        msg: "Your cancel request has been received",
        date: "20/07/2024",
        bg: "bg-red-200",
        color: "#000",
    },
    {
        icon: "time-outline",
        title: "Pending Rent",
        msg: "Your rent has been delayed",
        date: "20/07/2024",
        bg: "bg-yellow-200",
        color: "#000",
    },
];
