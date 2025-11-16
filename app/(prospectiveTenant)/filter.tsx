import PageTitle from "@/components/common/PageTitle";
import PrimaryButton from "@/components/common/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { BarChart } from "react-native-gifted-charts"; // ⬅ chart added
import { SafeAreaView } from "react-native-safe-area-context";

// Dropdown options
const propertyTypeOptions = [
    "All", "House", "Apartment", "Workspace", "Commercial", "Villa", "Cabin", "Cluster",
];

const amenitiesOptions = [
    "Pool", "Gym", "Parking", "Garden", "Security", "Central AC", "Balcony", "WiFi",
];

const securityOptions = [
    "Gated Community", "Security Cameras", "24/7 Security Guard", "Doorman",
    "Compound Security", "Secure Parking",
];

// Histogram data
const priceChartData = [
    { value: 20 }, { value: 35 }, { value: 25 }, { value: 45 },
    { value: 60 }, { value: 50 }, { value: 40 }, { value: 55 },
    { value: 32 }, { value: 28 }, { value: 20 }, { value: 15 },
];

// Select Dropdown Component
const SelectInput = ({
    label,
    value,
    options,
    onSelect
}: {
    label: string;
    value: string;
    options: string[];
    onSelect: (v: string) => void;
}) => {
    const [visible, setVisible] = useState(false);

    return (
        <View className="mb-4">
            <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                {label}
            </Text>

            <TouchableOpacity
                onPress={() => setVisible(true)}
                className="border border-gray-200 dark:border-gray-700 rounded-xl bg-card dark:bg-cardDark px-4 py-3 flex-row items-center justify-between"
                activeOpacity={0.8}
            >
                <Text className={`text-body ${value ? "text-text dark:text-textDark" : "text-gray-400"}`}>
                    {value || "Select"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <Modal visible={visible} transparent animationType="fade">
                <Pressable className="flex-1 bg-black/30" onPress={() => setVisible(false)}>
                    <View className="absolute left-5 right-5 top-1/4 bg-card dark:bg-cardDark rounded-xl p-4">
                        {options.map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => {
                                    onSelect(item);
                                    setVisible(false);
                                }}
                                className="px-3 py-3 border-b border-gray-200 dark:border-gray-700"
                            >
                                <Text className="text-body text-text dark:text-textDark">{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

// Screen Component
export default function FilterScreen() {
    const router = useRouter();

    const [filters, setFilters] = useState({
        propertyType: "All",
        priceMin: "",
        priceMax: "",
        rentalTerm: "",
        bedrooms: "",
        bathrooms: "",
        propertyTypeDetail: "",
        city: "",
        district: "",
        zipCode: "",
        furnishing: "",
        petsAllowed: "",
        availableFrom: null as Date | null,
        amenities: [] as string[],
        securityFeatures: [] as string[],
    });

    const [showDatePicker, setShowDatePicker] = useState(false);

    const updateField = (field: keyof typeof filters, value: any) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const toggleArrayValue = (field: "amenities" | "securityFeatures", value: string) => {
        setFilters((prev) => {
            const exists = prev[field].includes(value);
            return {
                ...prev,
                [field]: exists
                    ? prev[field].filter((i: string) => i !== value)
                    : [...prev[field], value],
            };
        });
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS !== "ios") setShowDatePicker(false);
        if (event?.type === "set" && selectedDate) {
            updateField("availableFrom", selectedDate);
        }
    };

    const formattedDate = filters.availableFrom
        ? filters.availableFrom.toLocaleDateString()
        : "";

    const applyFilters = () => {
        console.log("Filters:", filters);
    };

    const RenderRadioOption = ({
        label,
        selected,
        onPress,
    }: {
        label: string;
        selected: boolean;
        onPress: () => void;
    }) => (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center mb-3 mr-6"
            activeOpacity={0.7}
        >
            <Ionicons
                name={selected ? "radio-button-on" : "radio-button-off"}
                size={18}
                color={selected ? "#000000" : "#9CA3AF"}
            />
            <Text className="ml-2 text-small text-text dark:text-textDark">{label}</Text>
        </TouchableOpacity>
    );

    const LabeledInput = ({
        label,
        value,
        onChangeText,
        keyboardType = "default",
    }: {
        label: string;
        value: string;
        onChangeText: (t: string) => void;
        keyboardType?: "default" | "numeric";
    }) => (
        <View className="mb-4">
            <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                {label}
            </Text>
            <View className="border border-gray-200 dark:border-gray-700 rounded-xl bg-card dark:bg-cardDark px-4">
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    placeholder=""
                    className="text-body text-text dark:text-textDark"
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            <PageTitle text="Filter" leftIcon leftOnPress={() => router.back()} />
            <View className="my-3 border-b border-gray-200" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Property Type Pills */}
                <View className="mt-4 mb-4">
                    <Text className="text-subtitle text-secondary dark:text-secondaryDark mb-4">
                        Property Type
                    </Text>
                    <View className="flex-row flex-wrap">
                        {propertyTypeOptions.map((type) => {
                            const selected = filters.propertyType === type;
                            return (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => updateField("propertyType", type)}
                                    className={`px-4 py-2 rounded-full mr-2 mb-2 border ${selected
                                        ? "bg-primary border-primary"
                                        : "bg-background border-gray-200 dark:bg-cardDark dark:border-gray-700"
                                        }`}
                                    activeOpacity={0.8}
                                >
                                    <Text
                                        className={`text-body font-semibold ${selected ? "text-white" : "text-secondary dark:text-secondaryDark"
                                            }`}
                                    >
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>


                {/* Price Range */}
                <View className="mb-6">
                    <Text className="text-subtitle text-secondary dark:text-secondaryDark mb-2">
                        Price Range
                    </Text>

                    {/* Histogram Bar Chart */}
                    <View className="items-center mb-3">
                        <BarChart
                            data={priceChartData}
                            barWidth={14}
                            spacing={6}
                            hideRules
                            hideYAxisText
                            barBorderRadius={1}
                            frontColor="#000"
                            xAxisThickness={0}
                            yAxisThickness={0}
                            height={90}
                            width={300}

                        />
                    </View>

                    <View className="flex-row justify-between w-full">
                        <View className="rounded-full h-12 w-44 pl-7 border border-gray-200 flex-row items-center overflow-hidden">
                            <Text className="text-gray-400 font-semibold pr-5">Min</Text>
                            <TextInput
                                className="font-bold"
                                value={filters.priceMin}
                                onChangeText={(t) => updateField("priceMin", t)}
                                keyboardType="numeric"
                                placeholder="$ 3,000"
                            />
                        </View>

                        <View className="rounded-full h-12 w-44 pl-7 border border-gray-200 flex-row items-center overflow-hidden">
                            <Text className="text-gray-400 font-semibold pr-5">Max</Text>
                            <TextInput
                                value={filters.priceMax}
                                onChangeText={(t) => updateField("priceMax", t)}
                                keyboardType="numeric"
                                className="text-body font-bold text-text dark:text-textDark"
                                placeholder="$ 7,000"
                            />
                        </View>
                    </View>
                </View>

                {/* Additional Filters Label */}
                <Text className="text-subtitle text-secondary dark:text-secondaryDark mb-2">
                    Additional Filters :
                </Text>

                {/* Rental Term */}
                <LabeledInput
                    label="Rental Term"
                    value={filters.rentalTerm}
                    onChangeText={(t) => updateField("rentalTerm", t)}
                />

                {/* Bedrooms / Bathrooms */}
                <View className="flex-row justify-between">
                    <View className="flex-1 mr-3">
                        <LabeledInput
                            label="Bedrooms (min)"
                            value={filters.bedrooms}
                            onChangeText={(t) => updateField("bedrooms", t)}
                            keyboardType="numeric"
                        />
                    </View>
                    <View className="flex-1">
                        <LabeledInput
                            label="Bathrooms (min)"
                            value={filters.bathrooms}
                            onChangeText={(t) => updateField("bathrooms", t)}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                {/* Property Type Detail */}
                {/* Property Type Detail (Dropdown) */}
                <SelectInput
                    label="Property Type"
                    value={filters.propertyTypeDetail}
                    options={propertyTypeOptions}
                    onSelect={(v) => updateField("propertyTypeDetail", v)}
                />


                {/* City / District */}
                <View className="flex-row justify-between">
                    <View className="flex-1 mr-3">
                        <LabeledInput
                            label="City"
                            value={filters.city}
                            onChangeText={(t) => updateField("city", t)}
                        />
                    </View>
                    <View className="flex-1">
                        <LabeledInput
                            label="District"
                            value={filters.district}
                            onChangeText={(t) => updateField("district", t)}
                        />
                    </View>
                </View>

                {/* Zip Code */}
                <LabeledInput
                    label="Zip Code"
                    value={filters.zipCode}
                    onChangeText={(t) => updateField("zipCode", t)}
                />

                {/* Furnishing */}
                <LabeledInput
                    label="Furnishing"
                    value={filters.furnishing}
                    onChangeText={(t) => updateField("furnishing", t)}
                />

                {/* Pets Allowed */}
                <LabeledInput
                    label="Pets Allowed"
                    value={filters.petsAllowed}
                    onChangeText={(t) => updateField("petsAllowed", t)}
                />

                {/* Available From - Date Picker */}
                <View className="mb-4">
                    <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                        Available From
                    </Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        className="border border-gray-200 dark:border-gray-700 rounded-xl bg-card dark:bg-cardDark px-4 py-3"
                        activeOpacity={0.8}
                    >
                        <Text
                            className={`text-body ${formattedDate
                                ? "text-text dark:text-textDark"
                                : "text-gray-400 dark:text-gray-500"
                                }`}
                        >
                            {formattedDate || "Select date"}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={filters.availableFrom || new Date()}
                            mode="date"
                            display={Platform.OS === "ios" ? "inline" : "default"}
                            onChange={onDateChange}
                        />
                    )}
                </View>

                {/* Amenities */}
                <View className="mt-2 mb-4">
                    <Text className="text-subtitle text-secondary dark:text-secondaryDark mb-2">
                        Amenities
                    </Text>
                    <View className="border-b border-gray-200 mb-2" />
                    <View className="flex-row flex-wrap">
                        {amenitiesOptions.map((item) => (
                            <RenderRadioOption
                                key={item}
                                label={item}
                                selected={filters.amenities.includes(item)}
                                onPress={() => toggleArrayValue("amenities", item)}
                            />
                        ))}
                    </View>
                </View>

                {/* Security Features */}
                <View className="mb-4">
                    <Text className="text-subtitle text-secondary dark:text-secondaryDark mb-2">
                        Security Features
                    </Text>
                    <View className="border-b border-gray-200 mb-2" />
                    <View className="flex-row flex-wrap">
                        {securityOptions.map((item) => (
                            <RenderRadioOption
                                key={item}
                                label={item}
                                selected={filters.securityFeatures.includes(item)}
                                onPress={() => toggleArrayValue("securityFeatures", item)}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Apply Button */}
            <View className="left-0 right-0 bottom-0 px-4 pb-4">
                <PrimaryButton title="Apply Filter" onPress={applyFilters} />
            </View>
        </SafeAreaView>
    );
}
