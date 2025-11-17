import PageTitle from "@/components/common/PageTitle";
import PrimaryButton from "@/components/common/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileDetailScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const [showCountryModal, setShowCountryModal] = useState(false)

    const [selectedTab, setSelectedTab] = useState<"general" | "locations">(
        "general"
    );

    const [form, setForm] = useState({
        email: "brown@dumpmail.com",
        fullName: "Chris Brown",
        phone: "+62 8123 3456 7890",
        countryCode: "US",
        countryName: "United States",
        idNumber: "",
        nationality: "",
        employment: "",
        expiredDate: "",
        purpose: "",
    });

    const updateField = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const purposeOptions = ["N/A", "Business", "Travel", "Student", "Work Visa"];

    const [showPurpose, setShowPurpose] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
            <PageTitle text="Profile Detail" leftIcon />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
                className="px-4"
            >
                {/* User Header */}
                <View className="items-center mt-4 mb-6">
                    <View className="size-28 rounded-full bg-gray-200 dark:bg-gray-700 mb-3" />

                    <Text className="text-body font-semibold text-text dark:text-textDark">
                        {form.fullName}
                    </Text>
                    <Text className="text-small text-secondary dark:text-secondaryDark">
                        {form.email}
                    </Text>
                </View>

                {/* Tabs */}
                <View className="flex-row justify-center bg-gray-100 dark:bg-cardDark rounded-full p-1 mb-6">
                    <TouchableOpacity
                        onPress={() => setSelectedTab("general")}
                        className={`flex-1 items-center py-2 rounded-full ${selectedTab === "general"
                            ? "bg-background dark:bg-backgroundDark"
                            : ""
                            }`}
                    >
                        <Text
                            className={`text-small font-medium ${selectedTab === "general"
                                ? "text-text dark:text-textDark"
                                : "text-secondary dark:text-secondaryDark"
                                }`}
                        >
                            General
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setSelectedTab("locations")}
                        className={`flex-1 items-center py-2 rounded-full ${selectedTab === "locations"
                            ? "bg-background dark:bg-backgroundDark"
                            : ""
                            }`}
                    >
                        <Text
                            className={`text-small font-medium ${selectedTab === "locations"
                                ? "text-text dark:text-textDark"
                                : "text-secondary dark:text-secondaryDark"
                                }`}
                        >
                            Locations
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* ------- FORM -------- */}
                {selectedTab === "general" && (
                    <>
                        {/* Email */}
                        <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                            Email
                        </Text>
                        <TextInput
                            value={form.email}
                            onChangeText={(t) => updateField("email", t)}
                            className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
                        />

                        {/* Full Name */}
                        <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                            Full Name
                        </Text>
                        <TextInput
                            value={form.fullName}
                            onChangeText={(t) => updateField("fullName", t)}
                            className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
                        />

                        {/* Phone */}
                        <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                            Phone Number
                        </Text>
                        <TextInput
                            value={form.phone}
                            onChangeText={(t) => updateField("phone", t)}
                            className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
                        />

                        {/* Country Picker */}
                        <View className="flex-row items-center gap-1">
                            <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                                Country
                            </Text>
                            <Text className="text-xs font-semibold text-gray-400 dark:text-secondaryDark mb-1">
                                 (Select at flag to choose your country)
                            </Text>
                        </View>

                        <TouchableOpacity onPress={() => setShowCountryModal(false)} className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark p-3 rounded-xl flex-row items-center justify-between mb-4">
                            <View className="flex-row items-center">
                                <CountryPicker
                                    countryCode={form.countryCode as any}
                                    withFlag
                                    withFilter={false}
                                    withModal
                                    withCountryNameButton={false}
                                    onSelect={(country) => {
                                        updateField("countryCode", country.cca2);
                                        updateField("countryName", country.name);
                                    }}
                                    // disable button behavior so tap only happens via parent touchable
                                    containerButtonStyle={{ pointerEvents: "none" }}
                                />
                                <Text className="text-body text-text dark:text-textDark">
                                    {form.countryName}
                                </Text>
                            </View>

                            <Ionicons
                                name="chevron-down"
                                size={18}
                                color={isDark ? "#fff" : "#555"}
                            />
                        </TouchableOpacity>

                        {/* ID */}
                        <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                            ID
                        </Text>
                        <TextInput
                            value={form.idNumber}
                            onChangeText={(t) => updateField("idNumber", t)}
                            className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
                        />

                        {/* Nationality */}
                        <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                            Nationality
                        </Text>
                        <TextInput
                            value={form.nationality}
                            onChangeText={(t) => updateField("nationality", t)}
                            className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
                        />

                        {/* Employment */}
                        <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                            Employment Status
                        </Text>
                        <TextInput
                            value={form.employment}
                            onChangeText={(t) => updateField("employment", t)}
                            className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
                        />

                        {/* Expired Date */}
                        <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                            Expired Date
                        </Text>
                        <TextInput
                            value={form.expiredDate}
                            onChangeText={(t) => updateField("expiredDate", t)}
                            placeholder="DD/MM/YYYY"
                            className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
                        />

                        {/* Purpose Dropdown */}
                        <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                            Purpose
                        </Text>

                        <TouchableOpacity
                            onPress={() => setShowPurpose(!showPurpose)}
                            className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 flex-row justify-between items-center mb-4"
                        >
                            <Text className="text-body text-text dark:text-textDark">
                                {form.purpose || "N/A"}
                            </Text>
                            <Ionicons
                                name="chevron-down"
                                size={18}
                                color={isDark ? "#fff" : "#555"}
                            />
                        </TouchableOpacity>

                        {showPurpose && (
                            <View className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl mb-4">
                                {purposeOptions.map((item) => (
                                    <TouchableOpacity
                                        key={item}
                                        onPress={() => {
                                            updateField("purpose", item);
                                            setShowPurpose(false);
                                        }}
                                        className="px-4 py-3 border-b border-gray-200 dark:border-gray-700"
                                    >
                                        <Text className="text-body text-text dark:text-textDark">
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </>
                )}

                {/* ------- Save Button -------- */}
                <View className="mt-4">
                    <PrimaryButton title="Save Changes" onPress={() => console.log(form)} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
