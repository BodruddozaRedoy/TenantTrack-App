import PageTitle from "@/components/common/PageTitle";
import { AntDesign, Entypo, Feather, FontAwesome5, FontAwesome6, Foundation, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const topCards = [
    {
        id: 1,
        icon: MaterialIcons,
        iconName: "apartment",
        iconColor: "#16a34a",
        value: "12",
        label: "Total Properties",
    },
    {
        id: 2,
        icon: MaterialIcons,
        iconName: "list-alt",
        iconColor: "#2563EB",
        value: "08",
        label: "Active Listings",
    },
    {
        id: 3,
        icon: Feather,
        iconName: "pie-chart",
        iconColor: "#16A34A",
        value: "89%",
        change: "+35.4",
        label: "Occupancy Rate",
    },
    {
        id: 4,
        icon: Ionicons,
        iconName: "cash-outline",
        iconColor: "#7C3AED",
        value: "120k",
        label: "Monthly Revenue",
    },
    {
        id: 5,
        icon: MaterialIcons,
        iconName: "pending-actions",
        iconColor: "#F59E0B",
        value: "03",
        label: "Pending Listings",
    },
];

//
// DATA
//

const propertyAnalytics = [
    {
        label: "Occupancy Rate", value: "92.5%", change: "+2.3% vs last month", icon: Entypo,
        iconName: "home", iconColor: "#22c55e",
    },
    {
        label: "Avg Rent/Unit", value: "$2,450", change: "+5.2% vs last month", icon: MaterialIcons,
        iconName: "attach-money", iconColor: "#3b82f6"
    },
    {
        label: "Collection Rate", value: "$2,450", change: "+5.2% vs last month", icon: Ionicons,
        iconName: "stats-chart", iconColor: "#22c55e"
    },
];

const operationalAnalytics = [
    {
        label: "Work Orders Complete",
        value: "87%",
        change: "+12%",
        icon: MaterialIcons,
        iconName: "work-outline",
        iconColor: "#2563EB",
    },
    {
        label: "Avg Response Time",
        value: "4.2h",
        change: "-8%",
        icon: Feather,
        iconName: "clock",
        iconColor: "#EF4444",
    },
    {
        label: "Work Orders Complete",
        value: "87%",
        change: "+12%",
        icon: MaterialIcons,
        iconName: "work-outline",
        iconColor: "#2563EB",
    },
];

const tenantExperience = [
    {
        label: "Satisfaction Score",
        value: "8.7",
        desc: "out of 10",
        change: "+5%",
        icon: AntDesign,
        iconName: "heart",
        iconColor: "#22c55e",
    },
    {
        label: "Retention Rate",
        value: "89%",
        desc: "12-month average",
        change: "+3%",
        icon: FontAwesome6,
        iconName: "people-group",
        iconColor: "#3b82f6",
    },
    {
        label: "Renewal Ratio",
        value: "3.2:1",
        desc: "renewals vs new",
        change: "+2%",
        icon: FontAwesome5,
        iconName: "home",
        iconColor: "#8b5cf6",
    },
    {
        label: "Complaints/Tenant",
        value: "0.3",
        desc: "per month",
        change: "-12%",
        icon: Foundation,
        iconName: "alert",
        iconColor: "#ef4444",
    },
    {
        label: "Digital Engagement",
        value: "76%",
        desc: "active users",
        change: "+8%",
        icon: Entypo,
        iconName: "mobile",
        iconColor: "#f59e0b",
    },
];

const portfolioOverview = [
    {
        label: "Portfolio Occupancy",
        value: "94.2%",
        change: "+2.3%",
        icon: Ionicons,
        iconName: "business-outline",
        iconColor: "#22c55e",
    },
    {
        label: "Revenue per Sq.Ft",
        value: "$42.8",
        change: "+5.1%",
        icon: MaterialIcons,
        iconName: "monetization-on",
        iconColor: "#3b82f6",
    },
    {
        label: "Portfolio Occupancy",
        value: "94.2%",
        change: "+2.3%",
        icon: Ionicons,
        iconName: "business-outline",
        iconColor: "#22c55e",
    },
];

export default function AnalyticalDashboard() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const { t } = useTranslation();

    const propertyAnalyticsData = [
        { value: 20, label: "Jan" },
        { value: 45, label: "Feb" },
        { value: 28, label: "Mar" },
        { value: 80, label: "Apr" },
        { value: 99, label: "May" },
        { value: 43, label: "Jun" },
    ];

    const operationalData = [
        { value: 50, label: "M", frontColor: "#171717" },
        { value: 70, label: "T", frontColor: "#171717" },
        { value: 60, label: "W", frontColor: "#171717" },
        { value: 90, label: "T", frontColor: "#171717" },
        { value: 80, label: "F", frontColor: "#171717" },
        { value: 40, label: "S", frontColor: "#171717" },
        { value: 60, label: "S", frontColor: "#171717" },
    ];

    const tenantExperienceData = [
        { value: 70, color: "#000000", text: "70%" },
        { value: 30, color: "#E5E5E5", text: "30%" },
    ];

    const portfolioData = [
        { value: 40, label: "Jan", frontColor: "#171717" },
        { value: 60, label: "Feb", frontColor: "#171717" },
        { value: 50, label: "Mar", frontColor: "#171717" },
        { value: 80, label: "Apr", frontColor: "#171717" },
        { value: 70, label: "May", frontColor: "#171717" },
        { value: 90, label: "Jun", frontColor: "#171717" },
    ];

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* HEADER */}
                <PageTitle text="Analytical Dashboard" />
                <View className="border-b border-gray-200 dark:border-gray-700 mb-5" />

                {/* TOP CARDS */}
                <FlatList
                    data={topCards}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingTop: 10 }}
                    renderItem={({ item }) => (
                        <View className="w-40 border border-gray-200 dark:border-gray-700  dark:bg-cardDark p-4 items-start rounded-2xl">

                            {/* ICON */}
                            <View className="w-10 h-10  mb-3">
                                <item.icon name={item.iconName} size={30} color={item.iconColor} />
                            </View>

                            <View className="flex-row items-center gap-2">
                                <Text className="text-title font-bold text-text dark:text-textDark">
                                    {item.value}
                                </Text>

                                {item.change && (
                                    <Text
                                        className={`text-caption mt-1 ${item.change.startsWith("+") ? "text-green-600" : "text-red-500"
                                            }`}
                                    >
                                        {item.change}
                                    </Text>
                                )}
                            </View>
                            <Text className="text-small text-secondary dark:text-secondaryDark mt-1">{item.label}</Text>
                        </View>)} />

                {/* 1. PROPERTY ANALYTICS */}
                <View className="flex-row justify-between items-center mt-8 mx-5">
                    <Text className="text-subtitle font-semibold text-text dark:text-textDark">
                        Property Analytics
                    </Text>
                    <TouchableOpacity onPress={() => router.push("/(landlord)/property-analytics")}>
                        <Text className="text-small text-secondary dark:text-secondaryDark">
                            See more
                        </Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={propertyAnalytics}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingTop: 10 }}
                    renderItem={({ item }) => (
                        <View className="w-40 border border-gray-200 dark:border-gray-700  dark:bg-cardDark p-4 items-start rounded-2xl">

                            {/* ICON */}
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 12,
                                    backgroundColor: `${item.iconColor}20`,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 12,
                                }}
                            >
                                <item.icon name={item.iconName} size={22} color={item.iconColor} />
                            </View>

                            {/* FIXED BLOCK */}
                            <View>
                                <Text className="text-small text-gray-400 mt-1">
                                    {item.label}
                                </Text>

                                <View className=" gap-2 mt-1">
                                    <Text className="text-title font-bold text-text dark:text-textDark">
                                        {item.value}
                                    </Text>

                                    {item.change && (
                                        <Text
                                            className={`text-caption mt-1 ${item.change.startsWith("+") ? "text-green-600" : "text-red-500"
                                                }`}
                                        >
                                            {item.change}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    )}
                />

                {/* 2. OPERATIONAL DASHBOARD */}
                <View className="flex-row justify-between items-center mt-6 mx-5">
                    <Text className="text-subtitle font-semibold text-text dark:text-textDark">
                        Operational Dashboard
                    </Text>

                    <TouchableOpacity onPress={() => router.push("/(landlord)/operational-dashboard")}>
                        <Text className="text-small text-secondary dark:text-secondaryDark">
                            See more
                        </Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={operationalAnalytics}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingTop: 10 }}
                    renderItem={({ item }) => (
                        <View className="w-42 border border-gray-200 dark:border-gray-700 dark:bg-cardDark p-4 rounded-2xl">

                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 12,
                                    backgroundColor: `${item.iconColor}20`,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 12,
                                }}
                            >
                                <item.icon name={item.iconName} size={22} color={item.iconColor} />
                            </View>

                            {/* FIXED */}
                            <View>
                                <Text className="text-small text-gray-400 mt-1">
                                    {item.label}
                                </Text>

                                <Text className="text-title font-bold text-text dark:text-textDark mt-1">
                                    {item.value}
                                </Text>

                                <Text
                                    className={`text-caption mt-1 ${item.change.startsWith("+") ? "text-green-600" : "text-red-500"
                                        }`}
                                >
                                    {item.change}
                                </Text>
                            </View>
                        </View>
                    )}
                />

                {/* 3. TENANT EXPERIENCE */}
                <View className="flex-row justify-between items-center mt-6 mb-2 mx-5">
                    <Text className="text-subtitle font-semibold text-text dark:text-textDark">
                        Tenant Experience
                    </Text>

                    <TouchableOpacity onPress={() => router.push("/(landlord)/tenantDashboard")}>
                        <Text className="text-small text-secondary dark:text-secondaryDark">
                            See more
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="gap-4 mx-5">
                    {tenantExperience.map((item, i) => (
                        <View
                            key={i}
                            className="bg-card dark:bg-cardDark p-4 rounded-2xl"
                        >
                            <View className="flex-row justify-between items-center">
                                <View>
                                    <View className="flex-row items-center gap-2">
                                        <View style={{ backgroundColor: `${item.iconColor}20` }} className="size-12 justify-center items-center rounded-2xl">
                                            <item.icon name={item.iconName} size={22} color={item.iconColor} />
                                        </View>
                                        <Text className="text-small text-secondary dark:text-secondaryDark">
                                            {item.label}
                                        </Text>
                                    </View>

                                    <Text className="text-title font-bold text-text dark:text-textDark mt-2">
                                        {item.value}
                                    </Text>

                                    <Text className="text-caption text-secondary dark:text-secondaryDark">
                                        {item.desc}
                                    </Text>
                                </View>

                                <View className="items-end">
                                    <Text className="text-caption text-green-600">
                                        {item.change}
                                    </Text>

                                    <View className="w-12 h-10 bg-green-100 rounded-lg mt-1 items-center justify-center">
                                        <Ionicons name="stats-chart" size={24} color="#22c55e" />
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* 4. PORTFOLIO OVERVIEW */}
                <View className="flex-row justify-between items-center mt-8 mx-5">
                    <Text className="text-subtitle font-semibold text-text dark:text-textDark">
                        Portfolio Overview
                    </Text>
                    <TouchableOpacity onPress={() => router.push("/(landlord)/portfolio-dashboard")}>
                        <Text className="text-small text-secondary dark:text-secondaryDark">
                            See more
                        </Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={portfolioOverview}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingTop: 10 }}
                    renderItem={({ item }) => (
                        <View className="w-40 border border-gray-200 dark:border-gray-700 dark:bg-cardDark p-4 rounded-2xl">

                            {/* ICON */}
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 12,
                                    backgroundColor: `${item.iconColor}20`,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 12,
                                }}
                            >
                                <item.icon name={item.iconName} size={22} color={item.iconColor} />
                            </View>

                            <Text className="text-small text-gray-400 mt-1">
                                {item.label}
                            </Text>

                            <Text className="text-title font-bold text-text dark:text-textDark mt-1">
                                {item.value}
                            </Text>

                            <Text className="text-caption text-green-600 mt-1">
                                {item.change}
                            </Text>
                        </View>
                    )}
                />

                {/* ADD INFORMATION BUTTON */}
                <TouchableOpacity onPress={() => router.push("/(landlord)/add-manual-dashboard")} className="bg-primary p-4 rounded-full items-center mb-3 mx-4 mt-5">
                    <Text className="text-body font-bold text-white">{t('add_information')}</Text>
                </TouchableOpacity>

                {/* UPLOAD FILE BUTTON */}
                {/* <TouchableOpacity className="border border-gray-300 dark:border-gray-700 p-4 rounded-full items-center flex-row justify-center gap-2 mb-3">
                    <Ionicons
                        name="cloud-upload-outline"
                        size={20}
                        color={isDark ? "#fff" : "#000"}
                    />
                    <Text className="text-body font-bold text-text dark:text-textDark">
                        {t('upload_file')}
                    </Text>
                </TouchableOpacity> */}

                {/* <Text className="text-center text-secondary dark:text-secondaryDark mb-3">
                    {t('or')}
                </Text> */}

                {/* ADD MANUALLY BUTTON */}
                {/* <TouchableOpacity className="border border-gray-300 dark:border-gray-700 p-4 rounded-full items-center flex-row justify-center gap-2 mx-4 mt-5">
                    <Ionicons name="add" size={20} color={isDark ? "#fff" : "#000"} />
                    <Text className="text-body font-bold text-text dark:text-textDark">
                        {t('add_manually')}
                    </Text>
                </TouchableOpacity> */}
            </ScrollView>
        </SafeAreaView>
    );
}
