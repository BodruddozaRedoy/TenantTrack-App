// app/(landlord)/operational-dashboard/index.tsx
import PageTitle from "@/components/common/PageTitle";
import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import {
    ScrollView,
    StatusBar,
    Text,
    View
} from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

type KPI = {
    id: number;
    icon: any;
    iconName: string;
    iconColor: string;
    value: string;
    label: string;
    change?: string;
    sparkData: any;
};

export default function OperationalDashboardScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            {/* <StatusBar barStyle={isDark ? "light-content" : "dark-content"} /> */}

            <ScrollView
                className="px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Header */}
                <PageTitle
                    text="Operational Dashboard"
                    leftIcon
                    leftOnPress={() => router.back()}
                />
                <View className="border-b border-gray-200 dark:border-gray-700 mb-5" />

                {/* TOP KPI CARDS */}
                <View className="flex-row flex-wrap justify-between">
                    {topKpis.slice(0, 4).map((kpi) => (
                        <View
                            key={kpi.id}
                            className="w-[48%] border border-gray-200 dark:border-gray-700 bg-card dark:bg-cardDark p-4 rounded-2xl mb-4"
                        >
                            {/* ICON */}
                            <View
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 12,
                                    backgroundColor: `${kpi.iconColor}20`,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <kpi.icon
                                    name={kpi.iconName}
                                    size={20}
                                    color={kpi.iconColor}
                                />
                            </View>

                            <Text className="text-small text-secondary dark:text-secondaryDark mt-2">
                                {kpi.label}
                            </Text>

                            <View className="flex-row items-center justify-between mt-1">
                                <Text className="text-[26px] font-bold text-text dark:text-textDark">
                                    {kpi.value}
                                </Text>

                                <Text
                                    className={`text-caption ${kpi.change?.startsWith("+")
                                            ? "text-green-600"
                                            : "text-red-500"
                                        }`}
                                >
                                    {kpi.change}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Work Order Status */}
                <View className="border border-gray-200 dark:border-gray-700 bg-card dark:bg-cardDark p-4 rounded-2xl mt-2">
                    <Text className="text-subtitle font-bold text-text dark:text-textDark mb-3">
                        Work Order Status
                    </Text>

                    <View className="items-center">
                        <PieChart
                            data={workOrderPie}
                            donut
                            radius={70}
                            innerRadius={48}
                            showText
                            textColor={isDark ? "white" : "black"}
                        />
                    </View>
                </View>

                {/* Resolution Time Trend */}
                <View className="border border-gray-200 dark:border-gray-700 bg-card dark:bg-cardDark p-4 rounded-2xl mt-4">
                    <Text className="text-subtitle font-bold text-text dark:text-textDark mb-3">
                        Resolution Time Trend
                    </Text>

                    <LineChart
                        data={resolutionTrend}
                        thickness={3}
                        curved
                        noOfSections={4}
                        yAxisColor="transparent"
                        xAxisColor="transparent"
                        rulesColor={isDark ? "#374151" : "#e5e7eb"}
                        color1="#16a34a"
                        width={330}
                        startFillColor={"#16a34a20"}
                        endFillColor={"transparent"}
                    />
                </View>

                {/* Vendor Performance */}
                <View className="border border-gray-200 dark:border-gray-700 bg-card dark:bg-cardDark p-4 rounded-2xl mt-4">
                    <Text className="text-subtitle font-bold text-text dark:text-textDark mb-3">
                        Vendor Performance
                    </Text>

                    <BarChart
                        data={vendorBars}
                        barWidth={28}
                        spacing={20}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        frontColor="#2563eb"
                        rulesColor={isDark ? "#374151" : "#e5e7eb"}
                        noOfSections={4}
                    />
                </View>

                {/* Operational Costs by City */}
                <View className="border border-gray-200 dark:border-gray-700 bg-card dark:bg-cardDark p-4 rounded-2xl mt-4">
                    <Text className="text-subtitle font-bold text-text dark:text-textDark mb-3">
                        Operational Costs by City
                    </Text>

                    <BarChart
                        data={costByCityBars}
                        barWidth={28}
                        spacing={20}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        frontColor="#f59e0b"
                        rulesColor={isDark ? "#374151" : "#e5e7eb"}
                        noOfSections={5}
                    />
                </View>

                {/* Top Vendors */}
                <View className="border border-gray-200 dark:border-gray-700 bg-card dark:bg-cardDark p-4 rounded-2xl mt-4">
                    <Text className="text-subtitle font-semibold mb-3 text-text dark:text-textDark">
                        Top Vendors
                    </Text>

                    <View className="bg-background dark:bg-backgroundDark rounded-md overflow-hidden">
                        <View className="flex-row px-2 py-3 border-b border-gray-200 dark:border-gray-700">
                            <Text className="w-1/2 text-small text-secondary dark:text-secondaryDark">
                                Vendor
                            </Text>
                            <Text className="w-1/4 text-small text-secondary dark:text-secondaryDark">
                                SLA
                            </Text>
                            <Text className="w-1/4 text-small text-secondary dark:text-secondaryDark">
                                Rating
                            </Text>
                        </View>

                        {topVendors.map((v, i) => (
                            <View
                                key={i}
                                className="flex-row items-center px-2 py-3 border-b last:border-b-0 border-gray-100 dark:border-gray-700"
                            >
                                <Text className="w-1/2 text-body text-text dark:text-textDark">
                                    {v.vendor}
                                </Text>

                                <Text
                                    className={`w-1/4 text-body font-semibold ${v.sla >= 90
                                            ? "text-green-600"
                                            : "text-orange-500"
                                        }`}
                                >
                                    {v.sla}%
                                </Text>

                                <View className="w-1/4 flex-row">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <Ionicons
                                            key={idx}
                                            name={idx < v.rating ? "star" : "star-outline"}
                                            size={14}
                                            color="#f59e0b"
                                        />
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Property Performance */}
                <View className="border border-gray-200 dark:border-gray-700 bg-card dark:bg-cardDark p-4 rounded-2xl mt-4 mb-8">
                    <Text className="text-subtitle font-semibold mb-3 text-text dark:text-textDark">
                        Property Performance
                    </Text>

                    <View className="bg-background dark:bg-backgroundDark rounded-md overflow-hidden">
                        <View className="flex-row px-2 py-3 border-b border-gray-200 dark:border-gray-700">
                            <Text className="w-1/2 text-small text-secondary dark:text-secondaryDark">
                                Property
                            </Text>
                            <Text className="w-1/4 text-small text-secondary dark:text-secondaryDark">
                                City
                            </Text>
                            <Text className="w-1/4 text-small text-secondary dark:text-secondaryDark">
                                Cost
                            </Text>
                        </View>

                        {propertyPerformance.map((p, i) => (
                            <View
                                key={i}
                                className="flex-row items-center px-2 py-3 border-b last:border-b-0 border-gray-100 dark:border-gray-700"
                            >
                                <Text className="w-1/2 text-body text-text dark:text-textDark">
                                    {p.property}
                                </Text>
                                <Text className="w-1/4 text-body text-secondary dark:text-secondaryDark">
                                    {p.city}
                                </Text>
                                <Text
                                    className={`w-1/4 text-body font-semibold ${p.isHigh ? "text-red-500" : "text-green-600"
                                        }`}
                                >
                                    {p.cost}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* =========================
   STATIC DATA
   ========================= */

const topKpis: KPI[] = [
    {
        id: 1,
        icon: Entypo,
        iconName: "check",
        iconColor: "#2563eb",
        value: "87%",
        label: "Work Orders Complete",
        change: "+12%",
        sparkData: [70, 75, 80, 78, 85, 87],
    },
    {
        id: 2,
        icon: Feather,
        iconName: "clock",
        iconColor: "#f97316",
        value: "4.2h",
        label: "Avg Response Time",
        change: "-8%",
        sparkData: [4.5, 4.4, 4.3, 4.25, 4.2],
    },
    {
        id: 3,
        icon: MaterialIcons,
        iconName: "build",
        iconColor: "#8b5cf6",
        value: "2.8d",
        label: "Avg Resolution",
        change: "+15%",
        sparkData: [3.1, 3.0, 2.95, 2.85, 2.8],
    },
    {
        id: 4,
        icon: Ionicons,
        iconName: "home-outline",
        iconColor: "#16a34a",
        value: "12d",
        label: "Unit Turnover",
        change: "+5%",
        sparkData: [13, 12.5, 12.2, 12, 12],
    },
];

const workOrderPie = [
    { value: 87, color: "#22c55e", text: "Completed 87%" },
    { value: 8, color: "#fb923c", text: "In Progress 8%" },
    { value: 5, color: "#ef4444", text: "Pending 5%" },
];

const resolutionTrend = [
    { value: 3.2, label: "Week 1" },
    { value: 3.0, label: "Week 2" },
    { value: 2.8, label: "Week 3" },
    { value: 2.8, label: "Week 4" },
];

const vendorBars = [
    { value: 90, label: "ABC Maintenance" },
    { value: 85, label: "Quick Fix Pro" },
    { value: 88, label: "Elite Services" },
];

const costByCityBars = [
    { value: 45, label: "New York" },
    { value: 50, label: "Los Angeles" },
    { value: 33, label: "Chicago" },
    { value: 28, label: "Miami" },
];

const topVendors = [
    { vendor: "ABC Maintenance", sla: 95, rating: 5 },
    { vendor: "Quick Fix Pro", sla: 87, rating: 4 },
    { vendor: "Elite Services", sla: 92, rating: 5 },
];

const propertyPerformance = [
    { property: "Sunset Apartments", city: "New York", cost: "$12,450", isHigh: false },
    { property: "Park View Complex", city: "Los Angeles", cost: "$18,920", isHigh: true },
    { property: "Metro Heights", city: "Chicago", cost: "$9,840", isHigh: false },
];
