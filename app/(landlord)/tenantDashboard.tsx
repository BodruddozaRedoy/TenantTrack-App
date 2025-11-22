import PageTitle from "@/components/common/PageTitle";
import {
    AntDesign,
    Entypo,
    Feather,
    FontAwesome5,
    FontAwesome6,
    Foundation,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TenantExperienceScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            {/* <StatusBar barStyle={isDark ? "light-content" : "dark-content"} /> */}

            <ScrollView
                contentContainerStyle={{ paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
                className="px-5"
            >
                {/* Header */}
                <PageTitle
                    text="Tenant Dashboard"
                    leftIcon
                    leftOnPress={() => router.back()}
                />
                <View className="border-b border-gray-200 dark:border-gray-700 mb-5" />

                {/* Metric Cards */}
                <View className="gap-4">
                    {tenantExperience.map((t, idx) => (
                        <View
                            key={idx}
                            className="bg-card dark:bg-cardDark p-4 rounded-2xl flex-row justify-between items-center"
                        >
                            <View className="flex-row items-start gap-3">
                                <View
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 12,
                                        backgroundColor: `${t.iconColor}20`,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <t.icon name={t.iconName as any} size={20} color={t.iconColor} />
                                </View>

                                <View>
                                    <Text className="text-small text-secondary dark:text-secondaryDark">
                                        {t.label}
                                    </Text>
                                    <Text className="text-[26px] font-bold text-text dark:text-textDark mt-1">
                                        {t.value}
                                    </Text>
                                    <Text className="text-caption text-secondary dark:text-secondaryDark">
                                        {t.desc}
                                    </Text>
                                </View>
                            </View>

                            <View className="items-end">
                                <Text
                                    className={`text-caption ${t.change.startsWith("+")
                                        ? "text-green-600"
                                        : "text-red-500"
                                        }`}
                                >
                                    {t.change}
                                </Text>

                                {/* Fake spark mini-chart */}
                                <View
                                    style={{
                                        width: 44,
                                        height: 32,
                                        backgroundColor: isDark ? "#0f172a" : "#f3f4f6",
                                        borderRadius: 6,
                                        marginTop: 8,
                                        padding: 6,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "flex-end",
                                            height: 20,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: 5,
                                                height: 6,
                                                backgroundColor: t.iconColor,
                                                marginRight: 3,
                                                borderRadius: 2,
                                            }}
                                        />
                                        <View
                                            style={{
                                                width: 5,
                                                height: 8,
                                                backgroundColor: t.iconColor,
                                                marginRight: 3,
                                                borderRadius: 2,
                                            }}
                                        />
                                        <View
                                            style={{
                                                width: 5,
                                                height: 10,
                                                backgroundColor: t.iconColor,
                                                marginRight: 3,
                                                borderRadius: 2,
                                            }}
                                        />
                                        <View
                                            style={{
                                                width: 5,
                                                height: 12,
                                                backgroundColor: t.iconColor,
                                                borderRadius: 2,
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Satisfaction Gauge */}
                <View className="border border-gray-200 dark:border-gray-700 bg-card dark:bg-cardDark p-4 rounded-2xl mt-4">
                    <View className="flex-row gap-2 mb-5 items-center">
                        <View
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 5,
                                backgroundColor: `#22c55e20`,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <AntDesign name="heart" size={16} color="#22c55e" />
                        </View>
                        <Text className="text-subtitle font-semibold text-text dark:text-textDark">
                            Tenant Satisfaction
                        </Text>
                    </View>

                    <View style={{ alignItems: "start", overflow: "hidden", height: 110 }}>
                        <View style={{ transform: [{ rotate: "-90deg" }], marginTop: -18 }}>
                            <PieChart
                                data={satisfactionGaugeData}
                                donut
                                radius={120}
                                innerRadius={80}
                                showText
                                textColor="transparent"
                                onPress={() => { }}
                            />
                        </View>
                    </View>

                    <View className="mt-3">
                        <Text className="text-small text-secondary dark:text-secondaryDark">0</Text>
                        <View style={{ position: "absolute", right: 20, top: 118 }}>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                10
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Retention Trend */}
                <View className="border border-gray-200 dark:border-gray-700 bg-card dark:bg-cardDark p-4 rounded-2xl mt-4">
                    <View className="flex-row gap-2 mb-5 items-center">
                        <View
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 5,
                                backgroundColor: `#3b82f620`,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Feather name="trending-up" size={16} color="#3b82f6" />
                        </View>
                        <Text className="text-subtitle font-semibold text-text dark:text-textDark">
                            Retention Rate Trend
                        </Text>
                    </View>

                    <LineChart
                        data={retentionTrend}
                        thickness={3}
                        curved
                        noOfSections={4}
                        yAxisColor="transparent"
                        xAxisColor="transparent"
                        rulesColor={isDark ? "#374151" : "#e6e6e6"}
                        color1="#3b82f6"
                        startFillColor={"#3b82f620"}
                        endFillColor={"transparent"}
                    />
                </View>

                {/* Renewal vs New Leases */}
                <View className="border border-gray-200 dark:border-gray-700 bg-card dark:bg-cardDark p-4 rounded-2xl mt-4">
                    <View className="flex-row gap-2 mb-5 items-center">
                        <View
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 5,
                                backgroundColor: `#8b5cf620`,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <FontAwesome5 name="list-ul" size={16} color="#8b5cf6" />
                        </View>
                        <Text className="text-subtitle font-semibold text-text dark:text-textDark">
                            Renewals vs New Leases
                        </Text>
                    </View>

                    <BarChart
                        data={renewalsVsNewBars}
                        barWidth={12}
                        spacing={12}
                        noOfSections={4}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        frontColor="#8b5cf6"
                        isAnimated
                        rulesColor={isDark ? "#374151" : "#e5e7eb"}
                    />

                    <View className="flex-row items-center gap-4 mt-3">
                        <View className="flex-row items-center gap-2">
                            <View
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 3,
                                    backgroundColor: "#8b5cf6",
                                }}
                            />
                            <Text className="text-small text-text dark:text-textDark">
                                Renewals
                            </Text>
                        </View>

                        <View className="flex-row items-center gap-2">
                            <View
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 3,
                                    backgroundColor: "#c4b5fd",
                                }}
                            />
                            <Text className="text-small text-text dark:text-textDark">
                                New Leases
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Complaints Heatmap (updated with horizontal scroll fix) */}
                <View className="border border-gray-200 dark:border-gray-700 bg-card dark:bg-cardDark p-5 rounded-2xl mt-4">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-subtitle font-semibold text-text dark:text-textDark">
                            Complaints by Category
                        </Text>

                        <TouchableOpacity>
                            <Text className="text-small text-blue-500">View Details</Text>
                        </TouchableOpacity>
                    </View>

                    {/* HORIZONTAL SCROLL FIX */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                    >
                        <View>

                            {/* Header Row */}
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ width: 90 }} />
                                {complaintsCategories.map((c, i) => (
                                    <View
                                        key={i}
                                        style={{
                                            width: 70,
                                            alignItems: "center",
                                            paddingVertical: 6,
                                        }}
                                    >
                                        <Text className="text-caption text-secondary dark:text-secondaryDark">
                                            {c}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            {/* Data Rows */}
                            {complaintsHeatmap.map((row, rIdx) => (
                                <View
                                    key={rIdx}
                                    style={{ flexDirection: "row", alignItems: "center" }}
                                >
                                    {/* Row Label */}
                                    <View
                                        style={{
                                            width: 90,
                                            paddingVertical: 10,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text className="text-small text-text dark:text-textDark">
                                            {row.building}
                                        </Text>
                                    </View>

                                    {/* Cells */}
                                    {row.values.map((val, cIdx) => (
                                        <View
                                            key={cIdx}
                                            style={{
                                                width: 70,
                                                paddingVertical: 6,
                                                alignItems: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    backgroundColor: heatColorForValue(val),
                                                    paddingVertical: 10,
                                                    paddingHorizontal: 6,
                                                    borderRadius: 6,
                                                    width: 50,
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Text style={{ fontSize: 12, color: "#000" }}>
                                                    {val}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            ))}

                        </View>
                    </ScrollView>
                </View>


                {/* Digital Engagement */}
                <View className="border border-gray-200 dark:border-gray-700 bg-card dark:bg-cardDark p-4 rounded-2xl mt-4 mb-10">
                    <Text className="text-subtitle font-semibold text-text dark:text-textDark mb-3">
                        Digital Engagement
                    </Text>

                    <View className="flex-row items-center justify-between">
                        <View style={{ width: 120, height: 120 }}>
                            <PieChart
                                data={digitalDonut}
                                donut
                                radius={70}
                                innerRadius={50}
                                showText
                                textColor="transparent"
                                onPress={() => { }}
                            />
                        </View>

                        <View style={{ flex: 1, marginLeft: 12 }}>
                            {digitalEngagementList.map((d, i) => (
                                <View key={i} className="mb-3">
                                    <View className="flex-row justify-between">
                                        <Text className="text-small text-secondary dark:text-secondaryDark">
                                            {d.label}
                                        </Text>
                                        <Text className="text-small font-semibold text-text dark:text-textDark">
                                            {d.value}%
                                        </Text>
                                    </View>

                                    <View className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <View
                                            style={{
                                                width: `${d.value}%`,
                                                height: 8,
                                                backgroundColor: d.color,
                                            }}
                                        />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* =========================
   DATA
   ========================= */

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
        desc: "12-month avg",
        change: "+3%",
        icon: FontAwesome6,
        iconName: "users",
        iconColor: "#3b82f6",
    },
    {
        label: "Renewal Ratio",
        value: "3.2:1",
        desc: "Renewals vs New",
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
        iconColor: "#f97316",
    },
    {
        label: "Digital Engagement",
        value: "76%",
        desc: "active users",
        change: "+8%",
        icon: Entypo,
        iconName: "mobile",
        iconColor: "#7c3aed",
    },
];

const satisfactionGaugeData = [
    { value: 75, color: "#22c55e" },
    { value: 25, color: "#e5e7eb" },
];

const retentionTrend = [
    { value: 86, label: "Jan" },
    { value: 89, label: "Feb" },
    { value: 85, label: "Mar" },
    { value: 90, label: "Apr" },
    { value: 92, label: "May" },
    { value: 90, label: "Jun" },
];

const renewalsVsNewBars = [
    { value: 45, label: "Jan" },
    { value: 12, label: "Jan" },
    { value: 50, label: "Feb" },
    { value: 8, label: "Feb" },
    { value: 48, label: "Mar" },
    { value: 14, label: "Mar" },
    { value: 55, label: "Apr" },
    { value: 10, label: "Apr" },
    { value: 58, label: "May" },
    { value: 12, label: "May" },
    { value: 52, label: "Jun" },
    { value: 9, label: "Jun" },
];

const complaintsCategories = ["Maintenance", "Noise", "Parking", "Utilities", "Security"];

const complaintsHeatmap = [
    { building: "Building A", values: [12, 4, 7, 14, 3] },
    { building: "Building B", values: [8, 18, 5, 12, 7] },
    { building: "Building C", values: [15, 9, 22, 8, 4] },
    { building: "Building D", values: [6, 3, 11, 8, 16] },
];

// digital engagement
const digitalDonut = [
    { value: 76, color: "#3b82f6" },
    { value: 24, color: "#e5e7eb" },
];

const digitalEngagementList = [
    { label: "App Users", value: 68, color: "#3b82f6" },
    { label: "Portal Users", value: 84, color: "#60a5fa" },
    { label: "Digital Payments", value: 92, color: "#10b981" },
];

/* Heatmap color helper */
function heatColorForValue(v: number) {
    if (v >= 20) return "#ef4444";
    if (v >= 12) return "#fb923c";
    if (v >= 6) return "#f59e0b";
    return "#f3f4f6";
}
