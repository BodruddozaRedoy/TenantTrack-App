import { IconConstants } from "@/constants/icons.constants";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function AnalyticalDashboard() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";
    const { t } = useTranslation();

    // ----------------------------------------------------------------
    // 1. PROPERTY ANALYTICS (Line Chart)
    // ----------------------------------------------------------------
    const propertyAnalyticsData = [
        { value: 20, label: "Jan" },
        { value: 45, label: "Feb" },
        { value: 28, label: "Mar" },
        { value: 80, label: "Apr" },
        { value: 99, label: "May" },
        { value: 43, label: "Jun" },
    ];

    // ----------------------------------------------------------------
    // 2. OPERATIONAL DASHBOARD (Bar Chart)
    // ----------------------------------------------------------------
    const operationalData = [
        { value: 50, label: "M", frontColor: "#171717" },
        { value: 70, label: "T", frontColor: "#171717" },
        { value: 60, label: "W", frontColor: "#171717" },
        { value: 90, label: "T", frontColor: "#171717" },
        { value: 80, label: "F", frontColor: "#171717" },
        { value: 40, label: "S", frontColor: "#171717" },
        { value: 60, label: "S", frontColor: "#171717" },
    ];

    // ----------------------------------------------------------------
    // 3. TENANT EXPERIENCE (Pie Chart)
    // ----------------------------------------------------------------
    const tenantExperienceData = [
        { value: 70, color: "#000000", text: "70%" },
        { value: 30, color: "#E5E5E5", text: "30%" },
    ];

    // ----------------------------------------------------------------
    // 4. PORTFOLIO OVERVIEW (Bar Chart - Stacked/Grouped simulation)
    // ----------------------------------------------------------------
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
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                className="px-5"
            >
                {/* HEADER */}
                <View className="flex-row justify-between items-center mt-4 mb-6">
                    <Text className="text-title font-bold text-text dark:text-textDark">
                        {t('analytical_dashboard')}
                    </Text>
                    <View className="flex-row gap-4">
                        <TouchableOpacity onPress={() => router.push("/(tenant)/notification")}>
                            <Octicons
                                name="bell-fill"
                                size={24}
                                color={isDark ? "#fff" : "#A1A1A1"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/(landlord)/lease-documents")}>
                            <Image source={IconConstants.Resume} className="size-8" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 1. PROPERTY ANALYTICS */}
                <View className="bg-card dark:bg-cardDark p-4 rounded-3xl mb-5">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-body font-bold text-text dark:text-textDark">
                            {t('property_analytics')}
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {t('see_more')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <LineChart
                        data={propertyAnalyticsData}
                        color="#000"
                        thickness={3}
                        hideDataPoints
                        hideRules
                        hideYAxisText
                        hideAxesAndRules
                        curved
                        height={120}
                        width={width - 80}
                        adjustToWidth
                    />

                    <View className="flex-row justify-between mt-4">
                        <View>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {t('avg_rent_unit')}
                            </Text>
                            <Text className="text-body font-bold text-text dark:text-textDark">
                                SAR 2,500
                            </Text>
                            <Text className="text-caption text-green-500">+12% {t('vs_last_month')}</Text>
                        </View>
                        <View>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {t('collection_rate')}
                            </Text>
                            <Text className="text-body font-bold text-text dark:text-textDark">
                                98%
                            </Text>
                            <Text className="text-caption text-green-500">+5% {t('vs_last_month')}</Text>
                        </View>
                    </View>
                </View>

                {/* 2. OPERATIONAL DASHBOARD */}
                <View className="bg-card dark:bg-cardDark p-4 rounded-3xl mb-5">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-body font-bold text-text dark:text-textDark">
                            {t('operational_dashboard')}
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {t('see_more')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <BarChart
                        data={operationalData}
                        barWidth={20}
                        noOfSections={3}
                        barBorderRadius={4}
                        frontColor={isDark ? "#fff" : "#171717"}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        hideRules
                        hideYAxisText
                        height={120}
                        width={width - 80}
                    />

                    <View className="flex-row justify-between mt-4">
                        <View>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {t('work_orders_complete')}
                            </Text>
                            <Text className="text-body font-bold text-text dark:text-textDark">
                                45
                            </Text>
                            <Text className="text-caption text-green-500">+8% {t('vs_last_month')}</Text>
                        </View>
                        <View>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {t('avg_response_time')}
                            </Text>
                            <Text className="text-body font-bold text-text dark:text-textDark">
                                24h
                            </Text>
                            <Text className="text-caption text-green-500">-2h {t('vs_last_month')}</Text>
                        </View>
                    </View>
                </View>

                {/* 3. TENANT EXPERIENCE */}
                <View className="bg-card dark:bg-cardDark p-4 rounded-3xl mb-5">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-body font-bold text-text dark:text-textDark">
                            {t('tenant_experience')}
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {t('see_more')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center justify-between">
                        <PieChart
                            data={tenantExperienceData}
                            donut
                            radius={60}
                            innerRadius={40}
                            centerLabelComponent={() => (
                                <Text className="text-title font-bold text-text dark:text-textDark">
                                    4.8
                                </Text>
                            )}
                        />

                        <View className="flex-1 ml-6 gap-3">
                            <View>
                                <Text className="text-small text-secondary dark:text-secondaryDark">
                                    {t('satisfaction_score')}
                                </Text>
                                <Text className="text-body font-bold text-text dark:text-textDark">
                                    4.8 <Text className="text-caption font-normal">{t('out_of_10')}</Text>
                                </Text>
                            </View>
                            <View>
                                <Text className="text-small text-secondary dark:text-secondaryDark">
                                    {t('retention_rate')}
                                </Text>
                                <Text className="text-body font-bold text-text dark:text-textDark">
                                    92%
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="flex-row justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <View>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {t('renewal_ratio')}
                            </Text>
                            <Text className="text-body font-bold text-text dark:text-textDark">
                                85%
                            </Text>
                            <Text className="text-caption text-secondary dark:text-secondaryDark">
                                {t('renewals_vs_new')}
                            </Text>
                        </View>
                        <View>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {t('complaints_tenant')}
                            </Text>
                            <Text className="text-body font-bold text-text dark:text-textDark">
                                0.5
                            </Text>
                            <Text className="text-caption text-secondary dark:text-secondaryDark">
                                {t('per_month')}
                            </Text>
                        </View>
                        <View>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {t('digital_engagement')}
                            </Text>
                            <Text className="text-body font-bold text-text dark:text-textDark">
                                78%
                            </Text>
                            <Text className="text-caption text-secondary dark:text-secondaryDark">
                                {t('active_users')}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* 4. PORTFOLIO OVERVIEW */}
                <View className="bg-card dark:bg-cardDark p-4 rounded-3xl mb-5">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-body font-bold text-text dark:text-textDark">
                            {t('portfolio_overview')}
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {t('see_more')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <BarChart
                        data={portfolioData}
                        barWidth={30}
                        barBorderRadius={4}
                        frontColor={isDark ? "#fff" : "#171717"}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        hideRules
                        hideYAxisText
                        height={150}
                        width={width - 80}
                    />

                    <View className="flex-row justify-between mt-4">
                        <View>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {t('portfolio_occupancy')}
                            </Text>
                            <Text className="text-body font-bold text-text dark:text-textDark">
                                94%
                            </Text>
                            <Text className="text-caption text-green-500">+2% {t('vs_last_month')}</Text>
                        </View>
                        <View>
                            <Text className="text-small text-secondary dark:text-secondaryDark">
                                {t('revenue_per_sqft')}
                            </Text>
                            <Text className="text-body font-bold text-text dark:text-textDark">
                                SAR 18.5
                            </Text>
                            <Text className="text-caption text-secondary dark:text-secondaryDark">
                                {t('twelve_month_average')}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* ADD INFORMATION BUTTON */}
                <TouchableOpacity className="bg-primary p-4 rounded-full items-center mb-3">
                    <Text className="text-body font-bold text-white">{t('add_information')}</Text>
                </TouchableOpacity>

                {/* UPLOAD FILE BUTTON */}
                <TouchableOpacity className="border border-gray-300 dark:border-gray-700 p-4 rounded-full items-center flex-row justify-center gap-2 mb-3">
                    <Ionicons
                        name="cloud-upload-outline"
                        size={20}
                        color={isDark ? "#fff" : "#000"}
                    />
                    <Text className="text-body font-bold text-text dark:text-textDark">
                        {t('upload_file')}
                    </Text>
                </TouchableOpacity>

                <Text className="text-center text-secondary dark:text-secondaryDark mb-3">
                    {t('or')}
                </Text>

                {/* ADD MANUALLY BUTTON */}
                <TouchableOpacity className="border border-gray-300 dark:border-gray-700 p-4 rounded-full items-center flex-row justify-center gap-2">
                    <Ionicons name="add" size={20} color={isDark ? "#fff" : "#000"} />
                    <Text className="text-body font-bold text-text dark:text-textDark">
                        {t('add_manually')}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
