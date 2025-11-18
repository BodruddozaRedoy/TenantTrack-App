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


const statsData: StatCardProps[] = [
    {
        icon: IconConstants.Property,
        value: "12",
        label: "Total Properties",
    },
    {
        icon: IconConstants.List,
        value: "08",
        label: "Active Listings",
    },
    {
        icon: IconConstants.Bag,
        value: "89%",
        label: "Occupancy Rate",
    },
    {
        icon: IconConstants.Calender,
        value: "120k",
        label: "Monthly Revenue",
    },
    {
        icon: IconConstants.Clock,
        value: "03",
        label: "Pending Listings",
    },
];


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
};

type ServiceCardProps = {
    title: string;
    apartment: string;
    urgency: "Low" | "Normal" | "High";
    person: string;
};

type UpdateItemProps = {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    msg: string;
    date: string;
    bg: string;
    color: string;
};

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
                contentContainerStyle={{ paddingBottom: 60 }}
            >
                <View className="flex-row justify-between items-center">
                    {/* Header text */}
                    <View className="pt-4 mb-3">
                        <Text className="text-title font-bold text-text dark:text-textDark">
                            Welcome Back!
                        </Text>
                        <Text className="text-small text-secondary dark:text-secondaryDark">
                            Here's your property overview.
                        </Text>
                    </View>

                    {/* Header Icons */}
                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity onPress={() => router.push("/(tenant)/notification")}>
                            <Octicons name="bell-fill" size={24} color="#A1A1A1" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/my-application")}>
                            <Image
                                source={IconConstants.Resume}
                                className="size-8"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Stats */}
                <FlatList
                    horizontal
                    data={statsData}
                    keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12, paddingVertical: 10 }}
                    renderItem={({ item }) => <StatCard {...item} />}
                />

                {/* My Tenant */}
                <View className="bg-card dark:bg-cardDark px-4 rounded-2xl">
                    <SectionHeader title="My Tenant" onPress={() => router.push("/(landlord)/my-tenant")} />
                    <View className="mt-3 mb-6">
                        {tenantList.map((t, idx) => (
                            <TenantItem key={idx} {...t} />
                        ))}
                    </View>
                </View>

                {/* Recent Applications */}
                <View className="bg-card dark:bg-cardDark px-4 rounded-2xl mt-5">
                    <SectionHeader
                        title="Recent Applications"
                        onPress={() => router.push("/(landlord)/my-listing")}
                    />

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mt-3 mb-6"
                    >
                        <View className="flex-row gap-4">
                            {chunkTwo(properties).map((column, colIndex) => (
                                <View key={colIndex} className="flex-col gap-4">
                                    {column.map((item, rowIndex) => (
                                        <PropertyCard key={`${colIndex}-${rowIndex}`} {...item} />
                                    ))}
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>



                {/* Service Requests */}
                <SectionHeader title="Service Requests" />
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mt-3 mb-6"
                >
                    <View className="flex-row gap-4">
                        {services.map((s, idx) => (
                            <ServiceCard key={idx} {...s} />
                        ))}
                    </View>
                </ScrollView>

                {/* Updates & Tips */}
                <SectionHeader title="Updates & Tips" />
                <View className="bg-card dark:bg-cardDark p-4 rounded-2xl mt-3">
                    {updates.map((u, idx) => (
                        <UpdateItem key={idx} {...u} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

//
// COMPONENTS
//

const StatCard = ({ icon, value, label }: StatCardProps) => (
    <View className="bg-card dark:bg-cardDark p-5 rounded-2xl">

        {/* Custom Image Icon */}
        <Image
            source={icon}
            className="size-[40px] mb-2"
            resizeMode="cover"
        />

        <Text className="text-title mt-1 text-text dark:text-textDark">
            {value}
        </Text>

        <Text className="text-small text-secondary dark:text-secondaryDark text-center">
            {label}
        </Text>
    </View>
);



const TenantItem = ({ name, due, next }: TenantItemProps) => (
    <View className="bg-[#E5E5E5] p-4 rounded-xl mb-3 flex-row items-center gap-4">
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
    </View>
);

const PropertyCard = ({
    title,
    price,
    tag,
    location,
    person,
    status
}: PropertyCardProps) => (
    <View className=" w-44 rounded-2xl overflow-hidden pt-24 relative">
        <Image
            source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLdg6zA9EyI--oBs7ahniOD-Ae3ckRlewdmw&s",
            }}
            className="w-full h-28 absolute top-0"
        />

        <View className="py-1 px-3 rounded-lg bg-black/30 absolute top-2 right-2">
            <Text className={`text-xs ${status == "Viewing" ? "text-yellow-500" : "text-green-500"} font-semibold`}>{status}</Text>
        </View>

        <View className="bg-[#E5E5E5] p-3 rounded-t-2xl">
            <Text className="text-body font-semibold mt-2 text-text dark:text-textDark">
                {title}
            </Text>
            <Text className="text-small font-semibold text-text dark:text-textDark">
                {price}
            </Text>
            <Text className="text-caption text-secondary dark:text-secondaryDark mt-1">
                {location}
            </Text>
            <Text className="text-caption text-secondary dark:text-secondaryDark">
                {person}
            </Text>
        </View>
    </View>
);

const ServiceCard = ({
    title,
    apartment,
    urgency,
    person,
}: ServiceCardProps) => (
    <View className="bg-card dark:bg-cardDark w-44 p-3 rounded-xl">
        <Image
            source={{
                uri: "https://images.unsplash.com/photo-1507086182422-97bd7ca241fa",
            }}
            className="w-full h-24 rounded-lg"
        />

        <View
            className={`absolute right-4 top-4 px-2 py-1 rounded-full ${urgency === "High"
                ? "bg-red-500"
                : urgency === "Normal"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
        >
            <Text className="text-caption text-white">{urgency}</Text>
        </View>

        <Text className="text-body font-semibold mt-2 text-text dark:text-textDark">
            {title}
        </Text>
        <Text className="text-small text-secondary dark:text-secondaryDark">
            {apartment}
        </Text>
        <Text className="text-caption text-secondary dark:text-secondaryDark">
            {person}
        </Text>
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
    <View className="flex-row items-center mb-4">
        <View className={`w-12 h-12 rounded-xl items-center justify-center ${bg}`}>
            <Ionicons name={icon} size={22} color={color} />
        </View>

        <View className="ml-3 flex-1">
            <Text className="text-body font-semibold text-text dark:text-textDark">
                {title}
            </Text>
            <Text className="text-small text-secondary dark:text-secondaryDark">{msg}</Text>
            <Text className="text-caption text-secondary dark:text-secondaryDark mt-1">
                {date}
            </Text>
        </View>
    </View>
);

const SectionHeader = ({ title, onPress }: { title: string, onPress: () => void | {} }) => (
    <View className="flex-row justify-between items-center mt-6">
        <Text className="text-subtitle font-bold text-text dark:text-textDark">
            {title}
        </Text>
        <TouchableOpacity className="" onPress={onPress}>
            <Text className="text-small text-secondary dark:text-secondaryDark">See All</Text>
        </TouchableOpacity>
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
        status: "Viewing"
    },
    {
        title: "Luxury Villa",
        price: "SAR 45,000 /month",
        tag: "Viewing",
        location: "Al Nakheel, Riyadh",
        person: "Sarah Abdullah",
        status: "Viewing"
    },
    {
        title: "Luxury Villa",
        price: "SAR 45,000 /month",
        tag: "Rental",
        location: "Al Nakheel, Riyadh",
        person: "Sarah Abdullah",
        status: "Rental"
    },
    {
        title: "Luxury Villa",
        price: "SAR 45,000 /month",
        tag: "Rental",
        location: "Al Nakheel, Riyadh",
        person: "Sarah Abdullah",
        status: "Rental"
    },
    {
        title: "Luxury Villa",
        price: "SAR 45,000 /month",
        tag: "Rental",
        location: "Al Nakheel, Riyadh",
        person: "Sarah Abdullah",
        status: "Rental"
    },
];

const services: ServiceCardProps[] = [
    {
        title: "Plumbing",
        apartment: "Modern Apartment",
        urgency: "High",
        person: "Sarah Abdullah",
    },
    {
        title: "AC",
        apartment: "Modern Apartment",
        urgency: "Normal",
        person: "Sarah Abdullah",
    },
    {
        title: "Electricity",
        apartment: "Modern Apartment",
        urgency: "Low",
        person: "Sarah Abdullah",
    },
];

const updates: UpdateItemProps[] = [
    {
        icon: "bookmark-outline",
        title: "Receipt Released",
        msg: "Your receipt has been released",
        date: "20/07/2024",
        bg: "bg-gray-200 dark:bg-gray-700",
        color: "#000",
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
