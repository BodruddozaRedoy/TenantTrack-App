import BottomButtonsFixed from "@/components/common/BottomButtonsFixed";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const PAYMENT_TERMS = ["Monthly", "Quarterly", "Yearly"];

export default function AppointmentRequestScreen() {
    const [form, setForm] = useState({
        date: null as Date | null,
        paymentTerm: "",
        moveIn: "",
        leaseDuration: "",
        employmentStatus: "",
        phone: "",
        email: "",
    });

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const update = (field: keyof typeof form, value: any) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const formattedDate = form.date
        ? form.date.toLocaleDateString()
        : "";

    return (
        <View className="flex-1 bg-background dark:bg-backgroundDark">

            {/* Top image + overlaid header buttons */}
            <View className="w-full h-80 bg-gray-200">
                <Image
                    source={{
                        uri: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200&q=80",
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                />

                {/* Overlay header */}
                <View className="absolute top-4 left-4 right-4 flex-row items-center justify-between mt-10">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 rounded-full bg-background/80 items-center justify-center"
                    >
                        <Ionicons name="chevron-back" size={22} color="#000" />
                    </TouchableOpacity>


                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >

                {/* Property Info */}
                <View className="px-4 pt-4">
                    <Text className="text-body font-semibold text-text dark:text-textDark">
                        The Minimalist
                    </Text>
                    <Text className="text-small text-secondary dark:text-secondaryDark mb-3">
                        Brooklyn, New York
                    </Text>

                    {/* Badges */}
                    <View className="flex-row mb-5">
                        <InfoBadge icon="bed-outline" label="3 Bedrooms" />
                        <InfoBadge icon="layers-outline" label="Well Furnished" />
                        <InfoBadge icon="water-outline" label="2 Baths" />
                    </View>
                </View>

                {/* Form */}

                <View className="px-4">

                    {/* Select Date */}
                    <FormButton
                        icon="calendar-outline"
                        label={formattedDate || "Select Date"}
                        onPress={() => setShowDatePicker(true)}
                    />

                    {showDatePicker && (
                        <DateTimePicker
                            value={form.date || new Date()}
                            mode="date"
                            display={Platform.OS === "ios" ? "inline" : "default"}
                            onChange={(e, selected) => {
                                if (Platform.OS !== "ios") setShowDatePicker(false);
                                if (selected) update("date", selected);
                            }}
                        />
                    )}

                    {/* Payment Term */}
                    <FormButton
                        icon="wallet-outline"
                        label={form.paymentTerm || "Payment Term"}
                        onPress={() => setDropdownOpen(true)}
                    />

                    {/* Dropdown Modal */}
                    <Modal transparent visible={dropdownOpen} animationType="fade">
                        <Pressable
                            className="flex-1 bg-black/40"
                            onPress={() => setDropdownOpen(false)}
                        >
                            <View className="absolute left-6 right-6 top-1/3 bg-background dark:bg-backgroundDark rounded-xl p-3">
                                {PAYMENT_TERMS.map((term) => (
                                    <TouchableOpacity
                                        key={term}
                                        onPress={() => {
                                            update("paymentTerm", term);
                                            setDropdownOpen(false);
                                        }}
                                        className="py-3 border-b border-gray-200 dark:border-gray-700"
                                    >
                                        <Text className="text-body text-text dark:text-textDark">{term}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </Pressable>
                    </Modal>

                    <FormInput
                        icon="home-outline"
                        placeholder="Desired Move-in Date"
                        value={form.moveIn}
                        onChange={(v) => update("moveIn", v)}
                    />

                    <FormInput
                        icon="receipt-outline"
                        placeholder="Lease Duration (months)"
                        value={form.leaseDuration}
                        keyboardType="numeric"
                        onChange={(v) => update("leaseDuration", v)}
                    />

                    <FormInput
                        icon="briefcase-outline"
                        placeholder="Employment Status"
                        value={form.employmentStatus}
                        onChange={(v) => update("employmentStatus", v)}
                    />

                    <FormInput
                        icon="call-outline"
                        placeholder="Your phone number"
                        value={form.phone}
                        keyboardType="phone-pad"
                        onChange={(v) => update("phone", v)}
                    />

                    <FormInput
                        icon="mail-outline"
                        placeholder="Your email"
                        value={form.email}
                        keyboardType="email-address"
                        onChange={(v) => update("email", v)}
                    />
                </View>
            </ScrollView>

            {/* Continue Button */}
            {/* <TouchableOpacity onPress={() => router.push("/(prospectiveTenant)/appointment-success")} className="absolute bottom-6 left-4 right-4 bg-text dark:bg-white py-4 rounded-full items-center">
                <Text className="text-body font-semibold text-white dark:text-backgroundDark">
                    Continue
                </Text>
            </TouchableOpacity> */}
            <BottomButtonsFixed secondButtonText="Continue" secondButtonOnPress={() => router.push("/(prospectiveTenant)/appointment-success")} />

        </View>
    );
}

/* UI COMPONENTS */

const InfoBadge = ({ icon, label }: any) => (
    <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5 mr-2">
        <Ionicons name={icon} size={14} color="#6B7280" style={{ marginRight: 4 }} />
        <Text className="text-caption text-secondary dark:text-secondaryDark">{label}</Text>
    </View>
);

const FormInput = ({ icon, placeholder, value, onChange, keyboardType }: any) => (
    <View className="flex-row items-center border border-gray-300 dark:border-gray-700 rounded-xl px-3 mb-4">
        <Ionicons name={icon} size={18} color="#6B7280" style={{ marginRight: 8 }} />
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            value={value}
            onChangeText={onChange}
            className="flex-1 text-text dark:text-textDark py-3"
            keyboardType={keyboardType}
        />
    </View>
);

const FormButton = ({ icon, label, onPress }: any) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-between border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-3 mb-4"
        activeOpacity={0.8}
    >
        <View className="flex-row items-center">
            <Ionicons name={icon} size={18} color="#6B7280" style={{ marginRight: 8 }} />
            <Text
                className={`text-body ${label.includes("Date") || label.includes("Payment") ? "text-secondary dark:text-secondaryDark" : "text-text dark:text-textDark"
                    }`}
            >
                {label}
            </Text>
        </View>
        <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
    </TouchableOpacity>
);
