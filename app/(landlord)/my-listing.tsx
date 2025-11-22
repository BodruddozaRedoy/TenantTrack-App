import PageTitle from "@/components/common/PageTitle";
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

type PropertyCardProps = {
    title: string;
    image: string;
    status: "Rental" | "Viewing";
    location: string;
    price: number;
    person: string;
};

//
// SCREEN
//

export default function MyListingsScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            {/* <StatusBar barStyle={isDark ? "light-content" : "dark-content"} /> */}

            <ScrollView
                className=""
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
            >
                {/* Header */}
                <PageTitle text="My Listings" leftIcon leftOnPress={() => router.back()} />
                <View className="border-b border-gray-200 dark:border-gray-700" />

                {/* Add Properties Button */}
                <TouchableOpacity
                    onPress={() => router.push("/(landlord)/add-properties")}
                    className="bg-primary dark:bg-primaryDark rounded-full py-4 mt-5 mx-5"
                >
                    <Text className="text-center text-body font-semibold text-background dark:text-backgroundDark">
                        Add Properties
                    </Text>
                </TouchableOpacity>

                {/* Section Title */}
                {/* <View className="flex-row justify-between items-center mt-7 mx-5">
                    <Text className="text-subtitle font-bold text-text dark:text-textDark">
                        Total Properties
                    </Text>

                    <TouchableOpacity onPress={() => { }}>
                        <Text className="text-small text-secondary dark:text-secondaryDark">
                            See All
                        </Text>
                    </TouchableOpacity>
                </View> */}

                {/* Property Grid */}
                <FlatList
                    data={listingData}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        marginTop: 16,
                        marginHorizontal: 16,
                    }}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View className="w-[48%] mb-5">
                            <ListingCard {...item} />
                        </View>
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

//
// COMPONENTS
//

const ListingCard = ({
    title,
    image,
    status,
    location,
    person,
    price,
}: PropertyCardProps) => {
    return (
        <View className="w-44 rounded-2xl overflow-hidden pt-24 relative">
            {/* Image */}
            <Image source={{ uri: image }} className="w-full h-28 absolute top-0" />

            {/* Status */}
            <View className="py-1 px-3 rounded-lg bg-black/40 absolute top-2 right-2">
                <Text
                    className={`text-xs ${status === "Viewing"
                        ? "text-yellow-500"
                        : "text-green-500"
                        } font-semibold`}
                >
                    {status}
                </Text>
            </View>

            {/* Content */}
            <View className="bg-[#E5E5E5] dark:bg-[#2A2A2A] p-3 rounded-t-2xl">
                <Text className="text-body font-semibold text-text dark:text-textDark">
                    {title}
                </Text>

                <Text className="text-small font-semibold text-text dark:text-textDark">
                    SAR {price}
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
};

//
// DATA
//

const listingData: PropertyCardProps[] = [
    {
        title: "House 5454",
        image:
            "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
        status: "Rental",
        location: "Modern Apartment",
        person: "Sarah Abdullah",
        price: 100,
    },
    {
        title: "House 5454",
        image:
            "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
        status: "Viewing",
        location: "Modern Apartment",
        person: "Sarah Abdullah",
        price: 100,
    },
    {
        title: "House 5454",
        image:
            "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
        status: "Viewing",
        location: "Modern Apartment",
        person: "Sarah Abdullah",
        price: 100,
    },
    {
        title: "House 5454",
        image:
            "https://www.bezmirno.com/wp-content/uploads/2019/05/06.-Tiny-Apartments-kitchen.jpg",
        status: "Viewing",
        location: "Modern Apartment",
        person: "Sarah Abdullah",
        price: 100,
    },
];
