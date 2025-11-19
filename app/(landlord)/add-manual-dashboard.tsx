import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ------------------ FORM TYPES ------------------

type PropertyAnalyticsForm = {
    occupancyRate: string;
    avgRent: string;
    collectionRate: string;
    noi: string;
    expenseRatio: string;
    arAging: string;
    cashFlowForecast: string;
};

type OperationalDashboardForm = {
    workOrderStatus: string;
    avgResponseTime: string;
    avgResolutionTime: string;
    prRatio: string;
    unitTurnoverTime: string;
    vendorPerformance: string;
    operationalCosts: string;
};

type TenantExperienceForm = {
    satisfactionScore: string;
    retentionRate: string;
    leaseRenewalRatio: string;
    prMaintenanceRatio: string;
    complaintsPerTenant: string;
    digitalEngagementRate: string;
};

type PortfolioOverviewForm = {
    occupancyHeatmap: string;
    revenuePerSqFt: string;
    capexTracking: string;
    vacancyLoss: string;
    daysPropertyEmpty: string;
};

// Final Combined Object:
type DashboardData = {
    propertyAnalytics: PropertyAnalyticsForm;
    operationalDashboard: OperationalDashboardForm;
    tenantExperience: TenantExperienceForm;
    portfolioOverview: PortfolioOverviewForm;
};

export default function AddManualDashboardScreen() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    const [step, setStep] = useState(0);

    // ------------------ FORM STATES ------------------

    const [propertyAnalytics, setPropertyAnalytics] = useState<PropertyAnalyticsForm>({
        occupancyRate: "",
        avgRent: "",
        collectionRate: "",
        noi: "",
        expenseRatio: "",
        arAging: "",
        cashFlowForecast: "",
    });

    const [operationalDashboard, setOperationalDashboard] = useState<OperationalDashboardForm>({
        workOrderStatus: "",
        avgResponseTime: "",
        avgResolutionTime: "",
        prRatio: "",
        unitTurnoverTime: "",
        vendorPerformance: "",
        operationalCosts: "",
    });

    const [tenantExperience, setTenantExperience] = useState<TenantExperienceForm>({
        satisfactionScore: "",
        retentionRate: "",
        leaseRenewalRatio: "",
        prMaintenanceRatio: "",
        complaintsPerTenant: "",
        digitalEngagementRate: "",
    });

    const [portfolioOverview, setPortfolioOverview] = useState<PortfolioOverviewForm>({
        occupancyHeatmap: "",
        revenuePerSqFt: "",
        capexTracking: "",
        vacancyLoss: "",
        daysPropertyEmpty: "",
    });

    const stepTitles = [
        "Property Analytics",
        "Operational Dashboard",
        "Tenant Experience",
        "Portfolio Overview",
    ];


    // ------------------ FINAL SUBMIT ------------------

    const onComplete = () => {
        const dashboardData: DashboardData = {
            propertyAnalytics,
            operationalDashboard,
            tenantExperience,
            portfolioOverview,
        };

        console.log("FINAL DASHBOARD DATA:", dashboardData);

        router.back();
    };

    // ------------------ RENDER INPUT ------------------

    const Input = ({
        label,
        value,
        onChange,
        numeric = false,
    }: {
        label: string;
        value: string;
        onChange: (v: string) => void;
        numeric?: boolean;
    }) => (
        <View className="mb-4">
            <Text className="text-small mb-1 text-text dark:text-textDark">
                {label}
            </Text>

            <TextInput
                className="bg-white dark:bg-cardDark border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-text dark:text-textDark"
                placeholder="Any"
                placeholderTextColor={isDark ? "#9CA3AF" : "#9CA3AF"}
                keyboardType={numeric ? "decimal-pad" : "default"}
                value={value}
                onChangeText={onChange}
            />
        </View>
    );

    // ------------------ STEPS CONTENT ------------------

    const steps = [
        // STEP 1: PROPERTY ANALYTICS
        <View key={0}>
            <Input label="Occupancy Rate (%)" numeric value={propertyAnalytics.occupancyRate}
                onChange={(v) => setPropertyAnalytics({ ...propertyAnalytics, occupancyRate: v })} />

            <Input label="Average Rent per Unit" numeric value={propertyAnalytics.avgRent}
                onChange={(v) => setPropertyAnalytics({ ...propertyAnalytics, avgRent: v })} />

            <Input label="Rental Collection Rate (%)" numeric value={propertyAnalytics.collectionRate}
                onChange={(v) => setPropertyAnalytics({ ...propertyAnalytics, collectionRate: v })} />

            <Input label="Net Operating Income (NOI)" numeric value={propertyAnalytics.noi}
                onChange={(v) => setPropertyAnalytics({ ...propertyAnalytics, noi: v })} />

            <Input label="Expense Ratio (%)" numeric value={propertyAnalytics.expenseRatio}
                onChange={(v) => setPropertyAnalytics({ ...propertyAnalytics, expenseRatio: v })} />

            <Input label="AR Aging (%)" numeric value={propertyAnalytics.arAging}
                onChange={(v) => setPropertyAnalytics({ ...propertyAnalytics, arAging: v })} />

            <Input label="Cash Flow Forecast" value={propertyAnalytics.cashFlowForecast}
                onChange={(v) => setPropertyAnalytics({ ...propertyAnalytics, cashFlowForecast: v })} />
        </View>,

        // STEP 2: OPERATIONAL DASHBOARD
        <View key={1}>
            <Input label="Work Order Status" numeric value={operationalDashboard.workOrderStatus}
                onChange={(v) => setOperationalDashboard({ ...operationalDashboard, workOrderStatus: v })} />

            <Input label="Average Maintenance Response Time" numeric value={operationalDashboard.avgResponseTime}
                onChange={(v) => setOperationalDashboard({ ...operationalDashboard, avgResponseTime: v })} />

            <Input label="Average Resolution Time" numeric value={operationalDashboard.avgResolutionTime}
                onChange={(v) => setOperationalDashboard({ ...operationalDashboard, avgResolutionTime: v })} />

            <Input label="Preventive vs. Reactive Maintenance Ratio" value={operationalDashboard.prRatio}
                onChange={(v) => setOperationalDashboard({ ...operationalDashboard, prRatio: v })} />

            <Input label="Unit Turnover Time" numeric value={operationalDashboard.unitTurnoverTime}
                onChange={(v) => setOperationalDashboard({ ...operationalDashboard, unitTurnoverTime: v })} />

            <Input label="Vendor Performance Metrics" value={operationalDashboard.vendorPerformance}
                onChange={(v) => setOperationalDashboard({ ...operationalDashboard, vendorPerformance: v })} />

            <Input label="Operational costs" value={operationalDashboard.operationalCosts}
                onChange={(v) => setOperationalDashboard({ ...operationalDashboard, operationalCosts: v })} />
        </View>,

        // STEP 3: TENANT EXPERIENCE
        <View key={2}>
            <Input label="Tenant Satisfaction Score" value={tenantExperience.satisfactionScore}
                onChange={(v) => setTenantExperience({ ...tenantExperience, satisfactionScore: v })} />

            <Input label="Tenant Retention Rate (%)" numeric value={tenantExperience.retentionRate}
                onChange={(v) => setTenantExperience({ ...tenantExperience, retentionRate: v })} />

            <Input label="Lease Renewal vs. New Lease Ratio" value={tenantExperience.leaseRenewalRatio}
                onChange={(v) => setTenantExperience({ ...tenantExperience, leaseRenewalRatio: v })} />

            <Input label="Preventive vs. Reactive Maintenance Ratio" value={tenantExperience.prMaintenanceRatio}
                onChange={(v) => setTenantExperience({ ...tenantExperience, prMaintenanceRatio: v })} />

            <Input label="Complaints per Tenant" numeric value={tenantExperience.complaintsPerTenant}
                onChange={(v) => setTenantExperience({ ...tenantExperience, complaintsPerTenant: v })} />

            <Input label="Digital Engagement Rate" numeric value={tenantExperience.digitalEngagementRate}
                onChange={(v) => setTenantExperience({ ...tenantExperience, digitalEngagementRate: v })} />
        </View>,

        // STEP 4: PORTFOLIO OVERVIEW
        <View key={3}>
            <Input label="Portfolio Occupancy Heatmap" value={portfolioOverview.occupancyHeatmap}
                onChange={(v) => setPortfolioOverview({ ...portfolioOverview, occupancyHeatmap: v })} />

            <Input label="Revenue per Square Foot" numeric value={portfolioOverview.revenuePerSqFt}
                onChange={(v) => setPortfolioOverview({ ...portfolioOverview, revenuePerSqFt: v })} />

            <Input label="Capital Expenditure Tracking" value={portfolioOverview.capexTracking}
                onChange={(v) => setPortfolioOverview({ ...portfolioOverview, capexTracking: v })} />

            <Input label="Vacancy Loss" numeric value={portfolioOverview.vacancyLoss}
                onChange={(v) => setPortfolioOverview({ ...portfolioOverview, vacancyLoss: v })} />

            <Input label="Days a property is empty" numeric value={portfolioOverview.daysPropertyEmpty}
                onChange={(v) => setPortfolioOverview({ ...portfolioOverview, daysPropertyEmpty: v })} />
        </View>,
    ];

    // ------------------ MAIN UI ------------------

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            {/* HEADER */}
            <View className="flex-row items-center justify-between px-5 py-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color={isDark ? "#fff" : "#000"} />
                </TouchableOpacity>

                <Text className="text-title font-bold text-text dark:text-textDark">
                    {stepTitles[step]}
                </Text>

                <View style={{ width: 30 }} />
            </View>


            <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
                {steps[step]}
            </ScrollView>

            {/* FOOTER BUTTONS */}
            <View className="flex-row justify-between items-center px-5 py-4">
                {/* SKIP */}
                {step > 0 && (
                    <TouchableOpacity
                        onPress={() => setStep(step - 1)}
                        className="bg-gray-200 dark:bg-gray-700 rounded-full px-6 py-3"
                    >
                        <Text className="text-text dark:text-textDark">Back</Text>
                    </TouchableOpacity>
                )}

                {/* NEXT or COMPLETE */}
                <TouchableOpacity
                    onPress={() => (step === steps.length - 1 ? onComplete() : setStep(step + 1))}
                    className="bg-primary dark:bg-primaryDark rounded-full px-6 py-3 ml-auto"
                >
                    <Text className="text-white dark:text-text font-semibold">
                        {step === steps.length - 1 ? "Complete" : "Next Step"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
