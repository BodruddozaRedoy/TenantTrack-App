import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PropertyAnalyticsScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [selectedRegion, setSelectedRegion] = React.useState("By City");
    const [regionalData, setRegionalData] = React.useState(regionalBars);

    const regionOptions = [
        { label: "By City", data: regionalBars },
        {
            label: "By State",
            data: [
                { value: 380, label: "California" },
                { value: 250, label: "Texas" },
                { value: 210, label: "Florida" },
                { value: 120, label: "Nevada" },
            ],
        },
        {
            label: "By Country",
            data: [
                { value: 850, label: "USA" },
                { value: 420, label: "UAE" },
                { value: 310, label: "India" },
                { value: 260, label: "UK" },
            ],
        },
    ];


    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                className="px-5"
            >
                {/* HEADER */}
                <View className="flex-row items-center mt-4 mb-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2 rounded-full"
                    >
                        <Ionicons
                            name="chevron-back"
                            size={26}
                            color={isDark ? "#fff" : "#000"}
                        />
                    </TouchableOpacity>

                    <Text className="flex-1 text-center text-title font-bold text-text dark:text-textDark">
                        Property Analytics
                    </Text>

                    <View className="w-6" />
                </View>

                {/* TOP CARDS GRID (NO FLATLIST) */}
                <View className="flex-row flex-wrap justify-between">
                    {topCards.map((item) => (
                        <View
                            key={item.id}
                            className="w-[48%] border border-gray-200 dark:border-gray-700 p-4 rounded-2xl mb-4"
                        >
                            {/* ICON */}
                            <View
                                style={{
                                    width: 45,
                                    height: 45,
                                    borderRadius: 14,
                                    backgroundColor: `${item.iconColor}20`,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <item.icon
                                    name={item.iconName}
                                    size={22}
                                    color={item.iconColor}
                                />
                            </View>

                            <Text className="text-small text-secondary dark:text-secondaryDark mt-2">
                                {item.label}
                            </Text>

                            <Text className="text-[22px] font-bold text-text dark:text-textDark mt-1">
                                {item.value}
                            </Text>

                            <Text
                                className={`text-caption mt-1 ${item.change.startsWith("+")
                                    ? "text-green-600"
                                    : "text-red-500"
                                    }`}
                            >
                                {item.change}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* CASH FLOW FORECAST */}
                <View className="border border-gray-200  p-4 rounded-2xl mt-4">
                    <Text className="text-subtitle font-bold text-text dark:text-textDark mb-2">
                        Cash Flow Forecast
                    </Text>

                    <LineChart
                        data={cashFlowIncome}
                        data2={cashFlowExpenses}
                        color1="#22c55e"
                        color2="#ef4444"
                        thickness={3}
                        curved
                        hideDataPoints
                        yAxisLabel=""
                        maxValue={2000}
                        noOfSections={5}
                        backgroundColor="transparent"
                        rulesColor="#e5e7eb"
                        yAxisColor="transparent"
                        xAxisColor="transparent"
                    />

                    <View className="flex-row justify-center gap-6 mt-3">
                        <View className="flex-row items-center gap-2">
                            <View className="w-3 h-3 rounded-full bg-green-500" />
                            <Text className="text-small">Income</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <View className="w-3 h-3 rounded-full bg-red-500" />
                            <Text className="text-small">Expenses</Text>
                        </View>
                    </View>
                </View>

                {/* AR AGING ANALYSIS */}
                <View className="border border-gray-200 p-4 rounded-2xl mt-6">
                    <View className="flex-row justify-between">
                        <Text className="text-subtitle font-bold">AR Aging Analysis</Text>
                        <Text className="text-small text-blue-500">Export</Text>
                    </View>

                    {/* Table */}
                    <View className="mt-4">
                        {arAgingData.map((row, idx) => (
                            <View key={idx} className="flex-row justify-between mb-2">
                                <Text className="text-small">{row.period}</Text>
                                <Text className="text-small font-semibold">{row.amount}</Text>
                                <Text
                                    className={`text-small font-semibold ${row.color
                                        }`}
                                >
                                    {row.percent}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <BarChart
                        data={arAgingBars}
                        barWidth={28}
                        spacing={20}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        noOfSections={4}
                        roundToDigits={0}
                        barBorderRadius={6}
                        frontColor="green"
                        isAnimated
                        animationDuration={800}
                    />
                </View>

                {/* REGIONAL PERFORMANCE */}
                <View className="border border-gray-200 p-4 rounded-2xl mt-6">
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-subtitle font-bold text-text dark:text-textDark">
                            Regional Performance
                        </Text>

                        {/* DROPDOWN */}
                        <View>
                            <TouchableOpacity
                                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg flex-row items-center"
                                onPress={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <Text className="text-caption mr-1">
                                    {selectedRegion}
                                </Text>
                                <Ionicons
                                    name={dropdownOpen ? "chevron-up" : "chevron-down"}
                                    size={14}
                                    color="#555"
                                />
                            </TouchableOpacity>

                            {dropdownOpen && (
                                <View className="absolute right-0 mt-2 bg-white dark:bg-cardDark border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 w-32">
                                    {regionOptions.map((region, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                setSelectedRegion(region.label);
                                                setRegionalData(region.data);
                                                setDropdownOpen(false);
                                            }}
                                            className="px-3 py-2"
                                        >
                                            <Text className="text-small text-text dark:text-textDark">
                                                {region.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>

                    <BarChart
                        data={regionalData}
                        barWidth={28}
                        spacing={30}
                        noOfSections={5}
                        barBorderRadius={8}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        frontColor="#2563eb"
                        isAnimated
                    />
                </View>


                {/* EXPENSE BREAKDOWN */}
                <View className="border border-gray-200 p-4 rounded-2xl mt-6">
                    <Text className="text-subtitle font-bold mb-2 text-text dark:text-textDark">
                        Expense Breakdown
                    </Text>

                    <View className="items-center justify-center">
                        <PieChart
                        data={expenseBreakdown}
                        donut
                        radius={80}
                        innerRadius={45}
                        showText
                        textColor="white"
                        focusOnPress
                    />
                    </View>

                    <View className="mt-4 flex-row flex-wrap justify-center gap-6">
                        {expenseLabels.map((item, i) => (
                            <View key={i} className="flex-row items-center gap-2">
                                <View
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <Text className="text-small">{item.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

//
// TOP CARDS (NO FLATLIST)
//
const topCards = [
    {
        id: 1,
        icon: Entypo,
        iconName: "home",
        iconColor: "#22c55e",
        value: "92.5%",
        label: "Occupancy Rate",
        change: "+2.3% vs last month",
    },
    {
        id: 2,
        icon: MaterialIcons,
        iconName: "attach-money",
        iconColor: "#3b82f6",
        value: "$2,450",
        label: "Avg Rent/Unit",
        change: "+5.2% vs last month",
    },
    {
        id: 3,
        icon: Ionicons,
        iconName: "stats-chart",
        iconColor: "#22c55e",
        value: "96.8%",
        label: "Collection Rate",
        change: "+1.1% vs last month",
    },
    {
        id: 4,
        icon: Feather,
        iconName: "trending-up",
        iconColor: "#f59e0b",
        value: "$1.2M",
        label: "Net Operating Income",
        change: "+8.7% vs last month",
    },
    {
        id: 5,
        icon: Feather,
        iconName: "activity",
        iconColor: "#ef4444",
        value: "32.4%",
        label: "Expense Ratio",
        change: "-1.2% vs last month",
    },
    {
        id: 6,
        icon: Ionicons,
        iconName: "time",
        iconColor: "#64748b",
        value: "$45K",
        label: "AR 90+ Days",
        change: "+12% vs last month",
    },
];

//
// CASH FLOW
//
const cashFlowIncome = [
    { value: 900, label: "Jan" },
    { value: 950, label: "Feb" },
    { value: 1000, label: "Mar" },
    { value: 1100, label: "Apr" },
    { value: 1150, label: "May" },
    { value: 1300, label: "Jun" },
];

const cashFlowExpenses = [
    { value: 450, label: "Jan" },
    { value: 460, label: "Feb" },
    { value: 480, label: "Mar" },
    { value: 500, label: "Apr" },
    { value: 510, label: "May" },
    { value: 525, label: "Jun" },
];

//
// AR AGING
//
const arAgingData = [
    { period: "0–30 Days", amount: "$125K", percent: "65%", color: "text-green-600" },
    { period: "31–60 Days", amount: "$42K", percent: "22%", color: "text-yellow-500" },
    { period: "61–90 Days", amount: "$25K", percent: "13%", color: "text-orange-500" },
    { period: "90+ Days", amount: "$45K", percent: "23%", color: "text-red-500" },
];

const arAgingBars = [
    { value: 150, color: "#22c55e" },
    { value: 55, color: "#f59e0b" },
    { value: 25, color: "#fb923c" },
    { value: 40, color: "#ef4444" },
];

//
// REGIONAL PERFORMANCE
//
const regionalBars = [
    { value: 450, label: "Manhattan" },
    { value: 300, label: "Brooklyn" },
    { value: 280, label: "Queens" },
    { value: 180, label: "Bronx" },
];

//
// EXPENSE BREAKDOWN
//
const expenseBreakdown = [
    { value: 40, color: "#3b82f6" },
    { value: 25, color: "#22c55e" },
    { value: 15, color: "#ef4444" },
    { value: 12, color: "#f59e0b" },
    { value: 8, color: "#6b7280" },
];

const expenseLabels = [
    { label: "Maintenance", color: "#3b82f6" },
    { label: "Utilities", color: "#22c55e" },
    { label: "Property Tax", color: "#ef4444" },
    { label: "Insurance", color: "#f59e0b" },
    { label: "Other", color: "#6b7280" },
];
