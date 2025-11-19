// app/(landlord)/portfolio-overview/index.tsx
import PageTitle from "@/components/common/PageTitle";
import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

type TopMetric = {
    id: number;
    icon: any;
    iconName: string;
    iconColor: string;
    value: string;
    label: string;
    change?: string;
    sparkData?: number[];
};

export default function PortfolioOverviewScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const Icon5 = topMetrics[4].icon;
    const metric5 = topMetrics[4];

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: isDark ? "#000" : "#fff" }]}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 18 }} // using ~18px padding (option B)
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <PageTitle text="Portfolio Overview" leftIcon leftOnPress={() => router.back()}/>
                <View className="border-b border-gray-200 dark:border-gray-700 mb-5" />
                {/* Top KPI cards (2x2 grid) */}
                <View style={styles.gridRow}>
                    {topMetrics.slice(0, 4).map((m) => (
                        <View
                            key={m.id}
                            style={[
                                styles.kpiCard,
                                { borderColor: isDark ? "#2b2b2b" : "#e6e6e6", backgroundColor: isDark ? "#0f1724" : "#fff" },
                            ]}
                        >
                            <View
                                style={[
                                    styles.iconBubble,
                                    { backgroundColor: `${m.iconColor}20` }, // light bg from color
                                ]}
                            >
                                <m.icon name={m.iconName} size={18} color={m.iconColor} />
                            </View>

                            <Text style={[styles.kpiLabel, { color: isDark ? "#9CA3AF" : "#6B7280" }]}>{m.label}</Text>

                            <View style={styles.kpiValueRow}>
                                <Text style={[styles.kpiValue, { color: isDark ? "#fff" : "#000" }]}>{m.value}</Text>
                                <Text style={[styles.kpiChange, { color: m.change?.startsWith("+") ? "#16a34a" : "#ef4444" }]}>
                                    {m.change}
                                </Text>
                            </View>

                            {/* sparkline small */}
                            {/* <View style={{ marginTop: 8 }}>
                                <LineChart
                                    data={m.sparkData ?? [0, 0, 0, 0]}
                                    thickness={2}
                                    curved
                                    noOfSections={0}
                                    yAxisColor="transparent"
                                    xAxisColor="transparent"
                                    rulesColor="transparent"
                                    color1={m.iconColor}
                                    hideDataPoints
                                    isInteractive={false}
                                />
                            </View> */}
                        </View>
                    ))}
                </View>

                {/* Single wide metric card */}
                <View
                    style={[
                        styles.fullCard,
                        {
                            borderColor: isDark ? "#2b2b2b" : "#e6e6e6",
                            backgroundColor: isDark ? "#0f1724" : "#fff",
                        },
                    ]}
                >
                    <View style={styles.fullIconRow}>
                        {/* ICON */}
                        <View style={[styles.iconBubble, { backgroundColor: `${metric5.iconColor}15` }]}>
                            <Icon5 name={metric5.iconName} size={18} color={metric5.iconColor} />
                        </View>

                        {/* LABEL + VALUE */}
                        <View style={{ marginLeft: 10 }}>
                            <Text style={[styles.kpiValue, { color: isDark ? "#fff" : "#000" }]}>
                                {metric5.value}
                            </Text>
                            <Text style={[styles.kpiLabel, { color: isDark ? "#9CA3AF" : "#6B7280" }]}>
                                {metric5.label}
                            </Text>
                        </View>

                        {/* CHANGE */}
                        <Text
                            style={{
                                marginLeft: "auto",
                                color: metric5.change.startsWith("-") ? "#ef4444" : "#16a34a",
                                fontWeight: "600",
                            }}
                        >
                            {metric5.change}
                        </Text>
                    </View>
                </View>


                {/* Heatmap (Portfolio Occupancy) */}
                <View style={[styles.fullCard, { borderColor: isDark ? "#2b2b2b" : "#e6e6e6", backgroundColor: isDark ? "#0f1724" : "#fff" }]}>
                    <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Portfolio Occupancy Heatmap</Text>
                    <Text style={[styles.sectionSub, { color: isDark ? "#9CA3AF" : "#6B7280" }]}>By property and location</Text>

                    <View style={{ marginTop: 12, alignItems: "center" }}>
                        <View style={styles.heatmapContainer}>
                            {/* header row: cities */}
                            <View style={styles.heatmapRow}>
                                <View style={[styles.heatmapCell, { width: 70, backgroundColor: "transparent", borderWidth: 0 }]} />
                                {heatmapCities.map((c, i) => (
                                    <View key={i} style={[styles.heatmapCell, { justifyContent: "center" }]}>
                                        <Text style={styles.heatmapCity}>{c}</Text>
                                    </View>
                                ))}
                            </View>

                            {/* data rows */}
                            {heatmapData.map((row, rIdx) => (
                                <View key={rIdx} style={styles.heatmapRow}>
                                    <View style={[styles.heatmapCell, { width: 70, justifyContent: "center" }]}>
                                        <Text style={styles.heatmapRowLabel}>{row.region}</Text>
                                    </View>

                                    {row.values.map((val, cIdx) => (
                                        <View key={cIdx} style={[styles.heatmapCell]}>
                                            <View style={[styles.heatmapInner, { backgroundColor: heatColor(val) }]}>
                                                <Text style={styles.heatmapNumber}>{val}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Revenue per Square Foot - bar chart */}
                <View style={[styles.fullCard, { borderColor: isDark ? "#2b2b2b" : "#e6e6e6", backgroundColor: isDark ? "#0f1724" : "#fff" }]}>
                    <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Revenue per Square Foot</Text>
                    <Text style={[styles.sectionSub, { color: isDark ? "#9CA3AF" : "#6B7280" }]}>By property comparison</Text>

                    <View style={{ marginTop: 12 }}>
                        <BarChart
                            data={revenuePerSqFtBars}
                            barWidth={28}
                            spacing={20}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            frontColor="#2563eb"
                            noOfSections={4}
                        />
                    </View>
                </View>

                {/* CapEx Planned vs Actual (grouped bars emulation) */}
                <View style={[styles.fullCard, { borderColor: isDark ? "#2b2b2b" : "#e6e6e6", backgroundColor: isDark ? "#0f1724" : "#fff" }]}>
                    <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>CapEx: Planned vs Actual</Text>
                    <Text style={[styles.sectionSub, { color: isDark ? "#9CA3AF" : "#6B7280" }]}>Capital expenditure tracking</Text>

                    <View style={{ marginTop: 12 }}>
                        {/* We'll render two adjacent bars per quarter by alternating entries */}
                        <BarChart
                            data={capexGroupedBars}
                            barWidth={12}
                            spacing={10}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            frontColor="#f59e0b"
                            noOfSections={4}
                        />

                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                            <View style={{ width: 10, height: 10, backgroundColor: "#e5e7eb", borderRadius: 3, marginRight: 6 }} />
                            <Text style={styles.legendLabel}>Planned</Text>

                            <View style={{ width: 10, height: 10, backgroundColor: "#f59e0b", borderRadius: 3, marginLeft: 16, marginRight: 6 }} />
                            <Text style={styles.legendLabel}>Actual</Text>
                        </View>
                    </View>
                </View>

                {/* Vacancy Loss Trend (area) */}
                <View style={[styles.fullCard, { borderColor: isDark ? "#2b2b2b" : "#e6e6e6", backgroundColor: isDark ? "#0f1724" : "#fff" }]}>
                    <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Vacancy Loss Trend</Text>
                    <Text style={[styles.sectionSub, { color: isDark ? "#9CA3AF" : "#6B7280" }]}>Monthly loss tracking</Text>

                    <View style={{ marginTop: 12 }}>
                        <LineChart
                            data={vacancyLossTrend}
                            curved
                            thickness={2}
                            noOfSections={4}
                            yAxisColor="transparent"
                            xAxisColor="transparent"
                            rulesColor="#eee"
                            color1="#ef4444" // red line
                            startFillColor={"#ef444420"}
                            endFillColor={"transparent"}
                        />
                    </View>
                </View>

                {/* bottom spacing */}
                <View style={{ height: 24 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

/* =========================
   STYLES
   ========================= */

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 12,
    },
    backBtn: {
        padding: 6,
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
    },
    gridRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    kpiCard: {
        width: "48%",
        borderRadius: 16,
        borderWidth: 1,
        padding: 14,
        marginBottom: 12,
    },
    iconBubble: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    kpiLabel: {
        marginTop: 10,
        fontSize: 12,
    },
    kpiValueRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 6,
    },
    kpiValue: {
        fontSize: 22,
        fontWeight: "700",
    },
    kpiChange: {
        fontSize: 12,
        fontWeight: "600",
    },
    fullCard: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 14,
        marginBottom: 12,
        backgroundColor: "#fff",
    },
    fullIconRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
    },
    sectionSub: {
        fontSize: 12,
        marginTop: 4,
    },
    heatmapContainer: {
        width: "100%",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#eee",
        padding: 8,
    },
    heatmapRow: {
        flexDirection: "row",
    },
    heatmapCell: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: "#eee",
        padding: 6,
        alignItems: "center",
    },
    heatmapInner: {
        width: 46,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
    },
    heatmapCity: {
        fontSize: 11,
        color: "#6B7280",
        transform: [{ rotate: "-12deg" }],
    },
    heatmapRowLabel: {
        fontSize: 12,
        color: "#6B7280",
    },
    heatmapNumber: {
        fontSize: 12,
        fontWeight: "700",
        color: "#fff",
    },
    legendLabel: {
        fontSize: 12,
        color: "#6B7280",
    },
});

/* =========================
   DATA ARRAYS - replace with API later
   ========================= */

/* Top KPI metrics (we render first 4 as 2x2, 5th used as large single card) */
const topMetrics: TopMetric[] = [
    {
        id: 1,
        icon: Entypo,
        iconName: "home",
        iconColor: "#22c55e",
        value: "94.2%",
        label: "Portfolio Occupancy",
        change: "+2.3%",
        sparkData: [88, 90, 92, 93, 94, 94.2],
    } as any,
    {
        id: 2,
        icon: MaterialIcons,
        iconName: "attach-money",
        iconColor: "#3b82f6",
        value: "$42.8",
        label: "Revenue per Sq.Ft",
        change: "+5.1%",
        sparkData: [38, 40, 41, 42, 42.5],
    } as any,
    {
        id: 3,
        icon: Feather,
        iconName: "settings",
        iconColor: "#f59e0b",
        value: "$1.2M",
        label: "CapEx Utilization",
        change: "-12%",
        sparkData: [1.1, 1.2, 1.15, 1.25],
    } as any,
    {
        id: 4,
        icon: Ionicons,
        iconName: "warning-outline",
        iconColor: "#ef4444",
        value: "$89K",
        label: "Vacancy Loss",
        change: "+8.2%",
        sparkData: [70, 85, 95, 90],
    } as any,
    {
        id: 5,
        icon: Ionicons,
        iconName: "calendar-outline",
        iconColor: "#8b5cf6",
        value: "28 Days",
        label: "Avg. Vacancy Duration",
        change: "-3 days",
        sparkData: [30, 29, 28, 28],
    } as any,
];

/* Heatmap: cities and rows (values percentage occupancy) */
const heatmapCities = ["NYC", "LA", "CHI", "MIA", "SEA"];
const heatmapData = [
    { region: "Residential", values: [94, 96, 93, 91, 97] },
    { region: "Commercial", values: [88, 91, 87, 85, 92] },
    { region: "Mixed", values: [92, 89, 95, 88, 94] },
];

/* revenue per sq ft bars */
const revenuePerSqFtBars = [
    { value: 42.8, label: "Property A" },
    { value: 38.5, label: "Property B" },
    { value: 45.2, label: "Property C" },
    { value: 41.1, label: "Property D" },
    { value: 39.8, label: "Property E" },
];

/* CapEx grouped bars (we interleave planned & actual to simulate grouped bars visually) */
/* planned: light gray, actual: orange */
const capexGroupedBars = [
    { value: 1.2, label: "Q1" }, // planned
    { value: 1.0, label: "Q1" }, // actual
    { value: 1.5, label: "Q2" },
    { value: 1.3, label: "Q2" },
    { value: 2.0, label: "Q3" },
    { value: 1.8, label: "Q3" },
    { value: 1.8, label: "Q4" },
    { value: 1.6, label: "Q4" },
];

/* Vacancy loss trend (line with area) */
const vacancyLossTrend = [
    { value: 70, label: "Jan" },
    { value: 85, label: "Feb" },
    { value: 95, label: "Mar" },
    { value: 100, label: "Apr" },
    { value: 95, label: "May" },
    { value: 90, label: "Jun" },
];

/* helper to color heatmap cells (greens = high occupancy) */
function heatColor(v: number) {
    if (v >= 95) return "#16a34a"; // green
    if (v >= 90) return "#a3e635"; // lime
    if (v >= 85) return "#f59e0b"; // amber
    return "#ef4444"; // red-ish
}
