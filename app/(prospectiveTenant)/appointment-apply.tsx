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
const PURPOSES = ["Rent", "Lease", "Business", "Other"];

export default function AppointmentApplyScreen() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        idNumber: "",
        nationality: "",
        paymentTerm: "",
        moveInDate: "",
        leaseDuration: "",
        employmentStatus: "",
        purpose: "",
        selectDate: null as Date | null,
    });

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dropdownField, setDropdownField] = useState<null | "payment" | "purpose">(null);

    const updateField = (field: keyof typeof form, value: string | any) =>
        setForm((p) => ({ ...p, [field]: value }));

    const formattedDate = form.selectDate
        ? form.selectDate.toLocaleDateString()
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

            {/* Scrollable Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100, paddingTop: 20 }}
            >
                {/* Property Image Placeholder */}
                {/* <View className="w-full h-56 bg-gray-200 rounded-2xl mb-4" /> */}

                {/* Property Info */}
                <Text className="text-body font-semibold text-text dark:text-textDark">
                    The Minimalist
                </Text>
                <Text className="text-small text-secondary dark:text-secondaryDark mb-3">
                    Brooklyn, New York
                </Text>

                {/* Badges */}
                <View className="flex-row items-center mb-5">
                    <Badge label="3 Bedrooms" icon="bed-outline" />
                    <Badge label="Well Furnished" icon="layers-outline" />
                    <Badge label="2 Baths" icon="water-outline" />
                </View>

                {/* Form Fields */}
                <FormInput label="Name" value={form.name} onChange={(v) => updateField("name", v)} />
                <FormInput label="Your phone number" value={form.phone} onChange={(v) => updateField("phone", v)} keyboardType="phone-pad" />
                <FormInput label="Your email" value={form.email} onChange={(v) => updateField("email", v)} keyboardType="email-address" />
                <FormInput label="ID" value={form.idNumber} onChange={(v) => updateField("idNumber", v)} />
                <FormInput label="Nationality" value={form.nationality} onChange={(v) => updateField("nationality", v)} />

                {/* Date Picker */}
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    className="border border-gray-300 dark:border-gray-700 rounded-xl p-3 mb-4 flex-row justify-between items-center"
                >
                    <Text className={`text-body ${formattedDate ? "text-text dark:text-textDark" : "text-gray-400"}`}>
                        {formattedDate || "Select Date"}
                    </Text>
                    <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={form.selectDate || new Date()}
                        mode="date"
                        display={Platform.OS === "ios" ? "inline" : "default"}
                        onChange={(e, selected) => {
                            if (Platform.OS !== "ios") setShowDatePicker(false);
                            if (selected) updateField("selectDate", selected);
                        }}
                    />
                )}

                {/* Dropdowns */}
                <DropdownInput
                    label="Payment Term"
                    value={form.paymentTerm}
                    onSelect={(v) => updateField("paymentTerm", v)}
                    options={PAYMENT_TERMS}
                    onOpen={() => setDropdownField("payment")}
                    isOpen={dropdownField === "payment"}
                    onClose={() => setDropdownField(null)}
                />

                <FormInput label="Desired Move-in Date" value={form.moveInDate} onChange={(v) => updateField("moveInDate", v)} />
                <FormInput label="Lease Duration (months)" value={form.leaseDuration} onChange={(v) => updateField("leaseDuration", v)} keyboardType="numeric" />
                <FormInput label="Employment Status" value={form.employmentStatus} onChange={(v) => updateField("employmentStatus", v)} />

                <DropdownInput
                    label="Purpose"
                    value={form.purpose}
                    onSelect={(v) => updateField("purpose", v)}
                    options={PURPOSES}
                    onOpen={() => setDropdownField("purpose")}
                    isOpen={dropdownField === "purpose"}
                    onClose={() => setDropdownField(null)}
                />

            </ScrollView>

            {/* Fixed Bottom Button */}
            <BottomButtonsFixed secondButtonOnPress={() => router.push("/(prospectiveTenant)/appointment-success")} secondButtonText="Continue" />

        </View>
    );
}

/* COMPONENTS */

const Badge = ({ label, icon }: any) => (
    <View className="flex-row items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mr-2">
        <Ionicons name={icon} size={14} color="#6B7280" style={{ marginRight: 4 }} />
        <Text className="text-caption text-secondary dark:text-secondaryDark">{label}</Text>
    </View>
);

const FormInput = ({ label, value, onChange, keyboardType }: any) => (
    <TextInput
        placeholder={label}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        placeholderTextColor="#9CA3AF"
        className="border border-gray-300 dark:border-gray-700 text-text dark:text-textDark rounded-xl p-3 mb-4"
    />
);

const DropdownInput = ({ label, value, onSelect, options, onOpen, isOpen, onClose }: any) => (
    <>
        <TouchableOpacity
            onPress={onOpen}
            className="border border-gray-300 dark:border-gray-700 rounded-xl p-3 mb-4 flex-row justify-between items-center"
        >
            <Text className={`text-body ${value ? "text-text dark:text-textDark" : "text-gray-400"}`}>
                {value || label}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        <Modal visible={isOpen} transparent animationType="fade">
            <Pressable className="flex-1 bg-black/40" onPress={onClose}>
                <View className="absolute left-6 right-6 top-1/3 bg-background dark:bg-backgroundDark rounded-xl p-3">
                    {options.map((o: string) => (
                        <TouchableOpacity
                            key={o}
                            onPress={() => {
                                onSelect(o);
                                onClose();
                            }}
                            className="py-3 border-b border-gray-200 dark:border-gray-700"
                        >
                            <Text className="text-body text-text dark:text-textDark">{o}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Pressable>
        </Modal>
    </>
);
