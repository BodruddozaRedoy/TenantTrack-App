import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import CountryPicker from "react-native-country-picker-modal";

export default function GeneralTab({form, updateField, isDark, showPurpose, setShowPurpose, purposeOptions}:any) {
    const { t } = useTranslation();

    return (
        <>
            {/* Email */}
            <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                {t('email')}
            </Text>
            <TextInput
                value={form.email}
                onChangeText={(t) => updateField("email", t)}
                className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
            />

            {/* Full Name */}
            <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                {t('full_name').replace(' *', '')}
            </Text>
            <TextInput
                value={form.fullName}
                onChangeText={(t) => updateField("fullName", t)}
                className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
            />

            {/* Phone */}
            <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                {t('phone_number')}
            </Text>
            <TextInput
                value={form.phone}
                onChangeText={(t) => updateField("phone", t)}
                className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
            />

            {/* Country Picker */}
            <View className="flex-row items-center gap-1">
                <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                    {t('country')}
                </Text>
                <Text className="text-xs font-semibold text-gray-400 dark:text-secondaryDark mb-1">
                    {t('select_country_flag')}
                </Text>
            </View>

            <TouchableOpacity className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark p-3 rounded-xl flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                    <CountryPicker
                        countryCode={form.countryCode as any}
                        withFlag
                        withFilter={false}
                        withModal
                        withCountryNameButton={false}
                        onSelect={(country:any) => {
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
                {t('id_number')}
            </Text>
            <TextInput
                value={form.idNumber}
                onChangeText={(t) => updateField("idNumber", t)}
                className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
            />

            {/* Nationality */}
            <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                {t('nationality')}
            </Text>
            <TextInput
                value={form.nationality}
                onChangeText={(t) => updateField("nationality", t)}
                className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
            />

            {/* Employment */}
            <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                {t('employment_status')}
            </Text>
            <TextInput
                value={form.employment}
                onChangeText={(t) => updateField("employment", t)}
                className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
            />

            {/* Expired Date */}
            <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                {t('expired_date')}
            </Text>
            <TextInput
                value={form.expiredDate}
                onChangeText={(t) => updateField("expiredDate", t)}
                placeholder="DD/MM/YYYY"
                className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 text-text dark:text-textDark mb-4"
            />

            {/* Purpose Dropdown */}
            <Text className="text-small font-semibold text-secondary dark:text-secondaryDark mb-1">
                {t('purpose')}
            </Text>

            <TouchableOpacity
                onPress={() => setShowPurpose(!showPurpose)}
                className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl px-4 py-3 flex-row justify-between items-center mb-4"
            >
                <Text className="text-body text-text dark:text-textDark">
                    {form.purpose || t('na')}
                </Text>
                <Ionicons
                    name="chevron-down"
                    size={18}
                    color={isDark ? "#fff" : "#555"}
                />
            </TouchableOpacity>

            {showPurpose && (
                <View className="border border-gray-200 dark:border-gray-700 bg-background dark:bg-cardDark rounded-xl mb-4">
                    {purposeOptions.map((item:any) => (
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
    )
}