import { IconConstants } from "@/constants/icons.constants";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

const TYPES = [
    { id: "house", label: "House" },
    { id: "apartment", label: "Apartment" },
    { id: "villa", label: "Villa" },
    { id: "workspace", label: "Workspace" },
    { id: "cabin", label: "Cabin" },
    { id: "cluster", label: "Cluster" },
];

const FEATURED = [
    {
        id: "f1",
        title: "The Minimalist",
        location: "Brooklyn, New York",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLdg6zA9EyI--oBs7ahniOD-Ae3ckRlewdmw&s",
    },
    {
        id: "f2",
        title: "Retro House",
        location: "Canarsie, New York",
        image:
            "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80",
    },
];

export default function HomeScreen() {
    const [selected, setSelected] = useState("house");

    return (
        <ScrollView
            className="flex-1 bg-background dark:bg-backgroundDark pt-14"
            showsVerticalScrollIndicator={false}
        >
            <StatusBar barStyle={"dark-content"} />
            {/* Header */}
            <View className="flex-row justify-between items-center mb-8 mt-4 px-5">
                <Text className="text-title font-bold text-text dark:text-textDark">
                    Explore
                </Text>

                <View className="flex-row gap-3 items-center">
                    <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/notification")}>
                        <Image
                            source={IconConstants.Notification}
                            className="size-8"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/resume")}>
                        <Image
                            source={IconConstants.Resume}
                            className="size-8"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Input */}
            <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/search")} className="flex-row items-center bg-gray-100 rounded-full pl-5 py-3 pr-3 mb-8 mx-4">
                <Ionicons name="search-outline" size={20} color="#999" />
                <TextInput

                    placeholder="Search anything"
                    placeholderTextColor="#9CA3AF"
                    editable={false}
                    className="flex-1 ml-2 text-text dark:text-textDark"
                />
                <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/filter")} className="bg-background p-3 rounded-full"><Ionicons name="options-outline" size={20} color="#999" /></TouchableOpacity>
            </TouchableOpacity>

            {/* Category Pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 border-b border-gray-200 pb-8 px-5">
                {TYPES.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => setSelected(item.id)}
                        className={`px-5 py-2 rounded-full mr-3 border ${selected === item.id
                            ? "bg-black border-black"
                            : "border-gray-300"
                            }`}
                    >
                        <Text
                            className={`text-subtitle ${selected === item.id ? "text-white" : "text-gray-700"
                                }`}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Featured */}
            <Text className="text-subtitle px-5 text-text dark:text-textDark mb-5">
                Featured
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5">
                {FEATURED.map((item) => (
                    <View key={item.id} className="mr-5 w-[250px]">
                        <Image
                            source={{ uri: item.image }}
                            className="w-full h-60 rounded-2xl"
                        />
                        <View className="flex-row items-center justify-between">
                            <View>
                                <Text className="text-body text-text dark:text-textDark mt-2 font-semibold">
                                    {item.title}
                                </Text>
                                <Text className="text-caption text-gray-500">{item.location}</Text>
                            </View>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="bookmark-minus" size={24} color="#CCCCCC" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Extra Bottom Space */}
            <View className="h-20 bg-background" />
        </ScrollView>
    );
}
