// app/(landlord)/portfolio-overview/index.tsx

import PageTitle from "@/components/common/PageTitle";
import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PortfolioOverviewScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            {/* <StatusBar barStyle={isDark ? "light-content" : "dark-content"} /> */}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                className="px-5"
            >
                {/* HEADER */}
                <PageTitle text="Portfolio Overview" leftIcon leftOnPress={() => router.back()} />
                <View className="border-b border-gray-200 dark:border-gray-700 mb-5" />

                {/* TOP METRICS: 2x2 GRID */}
                <View className="flex-row flex-wrap justify-between">
                    {topMetrics.slice(0, 4).map((m) => (
                        <View
                            key={m.id}
                            className="w-[48%] bg-card dark:bg-cardDark p-4 rounded-2xl border border-gray-200 dark:border-gray-700 mb-4"
                        >
                            {/* ICON */}
                            <View
                                className="w-10 h-10 rounded-xl items-center justify-center"
                                style={{ backgroundColor: `${m.iconColor}20` }}
                            >
                                <m.icon name={m.iconName} size={18} color={m.iconColor} />
                            </View>

                            {/* LABEL */}
                            <Text className="text-secondary dark:text-secondaryDark text-[12px] mt-2">
                                {m.label}
                            </Text>

                            {/* VALUE & CHANGE */}
                            <View className="flex-row justify-between items-center mt-1">
                                <Text className="text-text dark:text-textDark text-xl font-bold">
                                    {m.value}
                                </Text>
                                <Text
                                    className={`text-xs font-semibold ${m.change.startsWith("+")
                                            ? "text-green-600"
                                            : "text-red-500"
                                        }`}
                                >
                                    {m.change}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* WIDE METRIC CARD */}
                <View className="bg-card dark:bg-cardDark p-4 rounded-2xl border border-gray-200 dark:border-gray-700 mb-4">
                    {(() => {
                        const m = topMetrics[4];
                        return (
                            <View className="flex-row items-center">
                                <View
                                    className="w-10 h-10 rounded-xl items-center justify-center"
                                    style={{ backgroundColor: `${m.iconColor}20` }}
                                >
                                    <m.icon name={m.iconName} size={18} color={m.iconColor} />
                                </View>

                                <View className="ml-3">
                                    <Text className="text-text dark:text-textDark text-xl font-bold">
                                        {m.value}
                                    </Text>
                                    <Text className="text-secondary dark:text-secondaryDark text-xs">
                                        {m.label}
                                    </Text>
                                </View>

                                <Text
                                    className={`ml-auto text-xs font-semibold ${m.change.startsWith("-")
                                            ? "text-red-500"
                                            : "text-green-600"
                                        }`}
                                >
                                    {m.change}
                                </Text>
                            </View>
                        );
                    })()}
                </View>

                {/* HEATMAP (HORIZONTAL SCROLL FIX) */}
                <View className="bg-card dark:bg-cardDark p-4 rounded-2xl border border-gray-200 dark:border-gray-700 mb-4">
                    <Text className="text-text dark:text-textDark text-base font-semibold">
                        Portfolio Occupancy Heatmap
                    </Text>
                    <Text className="text-secondary dark:text-secondaryDark text-xs mt-1">
                        By property and location
                    </Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mt-4"
                    >
                        <View>

                            {/* Header Row */}
                            <View className="flex-row">
                                <View className="w-20" />
                                {heatmapCities.map((c, i) => (
                                    <View key={i} className="w-14 items-center">
                                        <Text className="text-caption text-secondary dark:text-secondaryDark">
                                            {c}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            {/* Data Rows */}
                            {heatmapData.map((row, rIdx) => (
                                <View key={rIdx} className="flex-row items-center mt-2">
                                    <View className="w-20">
                                        <Text className="text-small text-secondary dark:text-secondaryDark">
                                            {row.region}
                                        </Text>
                                    </View>

                                    {row.values.map((val, cIdx) => {
                                        // dynamic color
                                        const bg = heatColor(val);
                                        const textColor =
                                            val >= 90 ? "#fff" : "#000"; // contrast logic

                                        return (
                                            <View key={cIdx} className="w-14 items-center">
                                                <View
                                                    className="w-12 h-12 rounded-lg items-center justify-center"
                                                    style={{ backgroundColor: bg }}
                                                >
                                                    <Text style={{ color: textColor, fontSize: 12 }}>
                                                        {val}
                                                    </Text>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* REVENUE PER SQ FT */}
                <View className="bg-card dark:bg-cardDark p-4 rounded-2xl border border-gray-200 dark:border-gray-700 mb-4">
                    <Text className="text-text dark:text-textDark text-base font-semibold">
                        Revenue per Square Foot
                    </Text>
                    <Text className="text-secondary dark:text-secondaryDark text-xs mt-1">
                        By property comparison
                    </Text>

                    <BarChart
                        data={revenuePerSqFtBars}
                        barWidth={18}
                        spacing={12}
                        frontColor="#2563eb"
                        adjustToWidth
                        initialSpacing={0}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        noOfSections={4}
                        rulesColor={isDark ? "#374151" : "#e5e7eb"}
                        className="mt-4"
                    />
                </View>

                {/* CAPEX GROUPED BARS */}
                <View className="bg-card dark:bg-cardDark p-4 rounded-2xl border border-gray-200 dark:border-gray-700 mb-4">
                    <Text className="text-text dark:text-textDark text-base font-semibold">
                        CapEx: Planned vs Actual
                    </Text>
                    <Text className="text-secondary dark:text-secondaryDark text-xs mt-1">
                        Capital expenditure tracking
                    </Text>

                    <BarChart
                        data={capexGroupedBars}
                        barWidth={12}
                        spacing={10}
                        adjustToWidth
                        initialSpacing={0}
                        frontColor="#f59e0b"
                        yAxisThickness={0}
                        xAxisThickness={0}
                        noOfSections={4}
                        rulesColor={isDark ? "#374151" : "#e5e7eb"}
                        className="mt-4"
                    />

                    <View className="flex-row items-center mt-3">
                        <View className="w-3 h-3 rounded-sm bg-gray-300 dark:bg-gray-600 mr-2" />
                        <Text className="text-secondary dark:text-secondaryDark text-xs">Planned</Text>

                        <View className="w-3 h-3 rounded-sm bg-orange-500 ml-4 mr-2" />
                        <Text className="text-secondary dark:text-secondaryDark text-xs">Actual</Text>
                    </View>
                </View>

                {/* VACANCY LOSS TREND */}
                <View className="bg-card dark:bg-cardDark p-4 rounded-2xl border border-gray-200 dark:border-gray-700 mb-4">
                    <Text className="text-text dark:text-textDark text-base font-semibold">
                        Vacancy Loss Trend
                    </Text>
                    <Text className="text-secondary dark:text-secondaryDark text-xs mt-1">
                        Monthly loss tracking
                    </Text>

                    <LineChart
                        data={vacancyLossTrend}
                        curved
                        adjustToWidth
                        initialSpacing={0}
                        thickness={3}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        rulesColor={isDark ? "#374151" : "#eee"}
                        color1="#ef4444"
                        startFillColor="#ef444420"
                        endFillColor="transparent"
                        className="mt-4"
                    />
                </View>

                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
}

/* DATA ARRAYS (same as before) */
const topMetrics = [
    {
        id: 1,
        icon: Entypo,
        iconName: "home",
        iconColor: "#22c55e",
        value: "94.2%",
        label: "Portfolio Occupancy",
        change: "+2.3%",
    },
    {
        id: 2,
        icon: MaterialIcons,
        iconName: "attach-money",
        iconColor: "#3b82f6",
        value: "$42.8",
        label: "Revenue per Sq.Ft",
        change: "+5.1%",
    },
    {
        id: 3,
        icon: Feather,
        iconName: "settings",
        iconColor: "#f59e0b",
        value: "$1.2M",
        label: "CapEx Utilization",
        change: "-12%",
    },
    {
        id: 4,
        icon: Ionicons,
        iconName: "warning-outline",
        iconColor: "#ef4444",
        value: "$89K",
        label: "Vacancy Loss",
        change: "+8.2%",
    },
    {
        id: 5,
        icon: Ionicons,
        iconName: "calendar-outline",
        iconColor: "#8b5cf6",
        value: "28 Days",
        label: "Avg. Vacancy Duration",
        change: "-3 days",
    },
];

const heatmapCities = ["NYC", "LA", "CHI", "MIA", "SEA"];

const heatmapData = [
    { region: "Residential", values: [94, 96, 93, 91, 97] },
    { region: "Commercial", values: [88, 91, 87, 85, 92] },
    { region: "Mixed", values: [92, 89, 95, 88, 94] },
];

const revenuePerSqFtBars = [
    { value: 42.8, label: "A" },
    { value: 38.5, label: "B" },
    { value: 45.2, label: "C" },
    { value: 41.1, label: "D" },
];

const capexGroupedBars = [
    { value: 1.2, label: "Q1" },
    { value: 1.0, label: "Q1" },
    { value: 1.5, label: "Q2" },
    { value: 1.3, label: "Q2" },
    { value: 2.0, label: "Q3" },
    { value: 1.8, label: "Q3" },
    { value: 1.8, label: "Q4" },
    { value: 1.6, label: "Q4" },
];

const vacancyLossTrend = [
    { value: 70, label: "Jan" },
    { value: 85, label: "Feb" },
    { value: 95, label: "Mar" },
    { value: 100, label: "Apr" },
    { value: 95, label: "May" },
    { value: 90, label: "Jun" },
];

// heatmap color helper
function heatColor(v: number) {
    if (v >= 95) return "#16a34a";
    if (v >= 90) return "#84cc16";
    if (v >= 85) return "#f59e0b";
    return "#ef4444";
}
