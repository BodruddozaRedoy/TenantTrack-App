// app/(landlord)/add-property/index.tsx
import PageTitle from "@/components/common/PageTitle";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ---------------------------
   Types
   --------------------------- */
type DropdownOption = { label: string; value: string };

type PropertyData = {
  photoUri?: string | null;
  title: string;
  description: string;
  monthlyRent: string;
  area: string;
  status: string;
  rentalTerm: string;
  bedrooms: string;
  bathrooms: string;
  propertyType: string;
  city: string;
  district: string;
  zipCode: string;
  furnishing: string;
  petsAllowed: string;
  availableFrom?: Date | null;
  amenities: string[]; // values selected
  securityFeatures: string[]; // values selected
};

/* ---------------------------
   Reusable Dropdown component
   - inline minimal implementation
   --------------------------- */
function DropdownField({
  label,
  options,
  selected,
  onSelect,
  placeholder = "Any",
}: {
  label?: string;
  options: DropdownOption[];
  selected?: string;
  onSelect: (val: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View className="mb-3">
      {label ? <Text className="text-subtitle text-secondary dark:text-secondaryDark mb-2">{label}</Text> : null}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen((s) => !s)}
        className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-3 bg-white dark:bg-cardDark"
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-body text-secondary dark:text-secondaryDark">
            {selected ? options.find((o) => o.value === selected)?.label ?? selected : placeholder}
          </Text>
          <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#6B7280" />
        </View>
      </TouchableOpacity>

      {open && (
        <View className="mt-2 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-cardDark z-10">
          {options.map((o) => (
            <TouchableOpacity
              key={o.value}
              onPress={() => {
                onSelect(o.value);
                setOpen(false);
              }}
              className="px-3 py-3"
            >
              <Text className="text-body text-text dark:text-textDark">{o.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

/* ---------------------------
   Date picker field
   --------------------------- */
function DatePickerField({
  label,
  date,
  onChange,
  placeholder = "Select Date",
}: {
  label?: string;
  date?: Date | null;
  onChange: (d: Date) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);

  function onChangeInternal(event: any, selectedDate?: Date) {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      onChange(selectedDate);
    }
  }

  return (
    <View className="mb-3">
      {label ? <Text className="text-sm text-secondary dark:text-secondaryDark mb-2">{label}</Text> : null}

      <TouchableOpacity
        onPress={() => setShow(true)}
        className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-3 bg-white dark:bg-cardDark"
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-body text-secondary dark:text-secondaryDark">
            {date ? date.toLocaleDateString() : placeholder}
          </Text>
          <Ionicons name="calendar-outline" size={18} color="#6B7280" />
        </View>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date ?? new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          onChange={onChangeInternal}
          maximumDate={new Date(2100, 12, 31)}
        />
      )}
    </View>
  );
}

/* ---------------------------
   Main screen
   --------------------------- */
export default function AddPropertyScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { t } = useTranslation();

  const [propertyData, setPropertyData] = useState<PropertyData>({
    photoUri: null,
    title: "",
    description: "",
    monthlyRent: "",
    area: "",
    status: "",
    rentalTerm: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    city: "",
    district: "",
    zipCode: "",
    furnishing: "",
    petsAllowed: "",
    availableFrom: null,
    amenities: [],
    securityFeatures: [],
  });

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(t("permission_required"), t("permission_required_photos"));
      }
    })();
  }, []);

  /* Photo picker */
  async function pickImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.7,
      });

      if (!result.cancelled) {
        setPropertyData((prev) => ({ ...prev, photoUri: result.uri }));
      }
    } catch (err) {
      console.error("ImagePicker error", err);
    }
  }

  async function takePhoto() {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(t("camera_permission_required"));
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.7,
      });

      if (!result.cancelled) {
        setPropertyData((prev) => ({ ...prev, photoUri: result.uri }));
      }
    } catch (err) {
      console.error("Camera error", err);
    }
  }

  /* helper to toggle amenity/security selection */
  function toggleArrayField(field: "amenities" | "securityFeatures", value: string) {
    setPropertyData((prev) => {
      const arr = prev[field] ?? [];
      if (arr.includes(value)) {
        return { ...prev, [field]: arr.filter((x) => x !== value) } as PropertyData;
      } else {
        return { ...prev, [field]: [...arr, value] } as PropertyData;
      }
    });
  }

  /* submit */
  function onSubmit() {
    // Basic validation example
    if (!propertyData.title.trim()) {
      Alert.alert(t("error"), t("validation_enter_title"));
      return;
    }

    // Prepare payload (you can transform as needed)
    const payload = { ...propertyData };
    console.log("PROPERTY PAYLOAD:", payload);
    Alert.alert("Success", t("success_property_ready"));

    // TODO: call API here

    // Optional: navigate back
    router.back();
  }

  /* shared dropdown data (examples) */
  const statusOptions: DropdownOption[] = [
    { label: t("available"), value: "available" },
    { label: t("rented"), value: "rented" },
    { label: t("under_maintenance"), value: "maintenance" },
  ];

  const rentalTermOptions: DropdownOption[] = [
    { label: t("monthly"), value: "monthly" },
    { label: t("quarterly"), value: "quarterly" },
    { label: t("yearly"), value: "yearly" },
  ];

  const bedroomsOptions: DropdownOption[] = [
    { label: "Studio", value: "0" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4+", value: "4" },
  ];

  const bathroomsOptions: DropdownOption[] = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3+", value: "3" },
  ];

  const propertyTypeOptions: DropdownOption[] = [
    { label: t("apartment"), value: "apartment" },
    { label: t("villa"), value: "villa" },
    { label: "Shop", value: "shop" },
  ];

  const cityOptions: DropdownOption[] = [
    { label: "Riyadh", value: "riyadh" },
    { label: "Jeddah", value: "jeddah" },
    { label: "Dammam", value: "dammam" },
  ];

  const furnishingOptions: DropdownOption[] = [
    { label: t("furnished"), value: "furnished" },
    { label: t("semi_furnished"), value: "semi" },
    { label: t("unfurnished"), value: "unfurnished" },
  ];

  const petsOptions: DropdownOption[] = [
    { label: t("allowed"), value: "allowed" },
    { label: t("not_allowed"), value: "not_allowed" },
  ];

  const amenitiesList = [
    "Pool",
    "Parking",
    "Security",
    "Balcony",
    "Gym",
    "Garden",
    "Central AC",
    "WiFi",
  ];

  const securityList = ["Gated Community", "Security Cameras", "24/7 Guard", "Doorman", "Secure Parking"];

  /* small helper for text inputs */
  function TextField({
    label,
    value,
    onChangeText,
    placeholder = "Any",
    numeric = false,
  }: {
    label?: string;
    value: string;
    onChangeText: (v: string) => void;
    placeholder?: string;
    numeric?: boolean;
  }) {
    return (
      <View className="mb-3">
        {label ? <Text className="text-subtitle text-secondary dark:text-secondaryDark mb-2">{label}</Text> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={numeric ? "numeric" : "default"}
          className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-3 bg-white dark:bg-cardDark text-body text-text dark:text-textDark"
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
      {/* <StatusBar barStyle={isDark ? "light-content" : "dark-content"} /> */}
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} className="px-4">
        {/* Header */}
        <PageTitle text={t("add_properties")} leftIcon leftOnPress={() => router.back()} />
        <View className="border-b border-gray-200 dark:border-gray-700 mb-5" />
        {/* Photo uploader */}
        <View className="mb-5">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={pickImage}
            className="w-full h-44 rounded-2xl bg-gray-200 dark:bg-gray-700 items-center justify-center overflow-hidden"
            style={{ borderRadius: 14 }}
          >
            {propertyData.photoUri ? (
              <Image source={{ uri: propertyData.photoUri }} className="w-full h-full" style={{ resizeMode: "cover" }} />
            ) : (
                <TouchableOpacity onPress={takePhoto} className="items-center">
                <Ionicons name="camera" size={36} color="#ffffffb3" />
                <Text className="text-body text-white/80 mt-2">{t("upload_photo")}</Text>
                <View className="flex-row mt-2">
                    {/* <TouchableOpacity onPress={takePhoto} className="px-3 py-2 bg-black/20 rounded-md mr-2">
                    <Text className="text-sm text-white">Take</Text>
                  </TouchableOpacity> */}
                  </View>
                </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>

        {/* Form fields */}
        <TextField label={t("property_title")} value={propertyData.title} onChangeText={(v) => setPropertyData((p) => ({ ...p, title: v }))} placeholder="Any" />
        <TextField label={t("description")} value={propertyData.description} onChangeText={(v) => setPropertyData((p) => ({ ...p, description: v }))} placeholder="Any" />
        <TextField label={t("monthly_rent")} value={propertyData.monthlyRent} onChangeText={(v) => setPropertyData((p) => ({ ...p, monthlyRent: v }))} placeholder="Any" numeric />
        <TextField label={t("area_sqm")} value={propertyData.area} onChangeText={(v) => setPropertyData((p) => ({ ...p, area: v }))} placeholder="Any" numeric />

        <DropdownField label={t("status")} options={statusOptions} selected={propertyData.status} onSelect={(v) => setPropertyData((p) => ({ ...p, status: v }))} />
        <DropdownField label={t("rental_term")} options={rentalTermOptions} selected={propertyData.rentalTerm} onSelect={(v) => setPropertyData((p) => ({ ...p, rentalTerm: v }))} />

        <View className="flex-row gap-3">
          <View style={{ flex: 1 }}>
            <DropdownField label={t("bedrooms_min")} options={bedroomsOptions} selected={propertyData.bedrooms} onSelect={(v) => setPropertyData((p) => ({ ...p, bedrooms: v }))} />
          </View>
          <View style={{ flex: 1 }}>
            <DropdownField label={t("bathrooms_min")} options={bathroomsOptions} selected={propertyData.bathrooms} onSelect={(v) => setPropertyData((p) => ({ ...p, bathrooms: v }))} />
          </View>
        </View>

        <DropdownField label={t("property_type")} options={propertyTypeOptions} selected={propertyData.propertyType} onSelect={(v) => setPropertyData((p) => ({ ...p, propertyType: v }))} />

        <View className="flex-row gap-3">
          <View style={{ flex: 1 }}>
            <DropdownField label={t("city")} options={cityOptions} selected={propertyData.city} onSelect={(v) => setPropertyData((p) => ({ ...p, city: v }))} />
          </View>
          <View style={{ flex: 1 }}>
            <TextField label={t("district")} value={propertyData.district} onChangeText={(v) => setPropertyData((p) => ({ ...p, district: v }))} placeholder="Any" />
          </View>
        </View>

        <TextField label={t("zip_code")} value={propertyData.zipCode} onChangeText={(v) => setPropertyData((p) => ({ ...p, zipCode: v }))} placeholder="Any" />
        <DropdownField label={t("furnishing")} options={furnishingOptions} selected={propertyData.furnishing} onSelect={(v) => setPropertyData((p) => ({ ...p, furnishing: v }))} />
        <DropdownField label={t("pets_allowed")} options={petsOptions} selected={propertyData.petsAllowed} onSelect={(v) => setPropertyData((p) => ({ ...p, petsAllowed: v }))} />

        <DatePickerField label={t("available_from")} date={propertyData.availableFrom} onChange={(d) => setPropertyData((p) => ({ ...p, availableFrom: d }))} />

        {/* Amenities */}
        <View className="mt-4 mb-2">
          <Text className="text-subtitle font-semibold text-text dark:text-textDark">{t("amenities")}</Text>
          <View className="border-b border-gray-200 dark:border-gray-700 my-3" />
          <View className="flex-row flex-wrap justify-between">
            {amenitiesList.map((a) => {
              const selected = propertyData.amenities.includes(a);
              return (
                <TouchableOpacity
                  key={a}
                  onPress={() => toggleArrayField("amenities", a)}
                  className="flex-row items-center mb-3"
                  style={{ width: "48%" }}
                >
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: selected ? "#000" : "#cbd5e1",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 8,
                    }}
                  >
                    {selected ? <View style={{ width: 10, height: 10, borderRadius: 6, backgroundColor: "#000" }} /> : null}
                  </View>
                  <Text className="text-body text-text dark:text-textDark">{a}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Security Features */}
        <View className="mt-4 mb-2">
          <Text className="text-subtitle font-semibold text-text dark:text-textDark">{t("security_features")}</Text>
          <View className="border-b border-gray-200 dark:border-gray-700 my-3" />
          <View className="flex-row flex-wrap justify-between">
            {securityList.map((s) => {
              const selected = propertyData.securityFeatures.includes(s);
              return (
                <TouchableOpacity
                  key={s}
                  onPress={() => toggleArrayField("securityFeatures", s)}
                  className="flex-row items-center mb-3"
                  style={{ width: "48%" }}
                >
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: selected ? "#000" : "#cbd5e1",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 8,
                    }}
                  >
                    {selected ? <View style={{ width: 10, height: 10, borderRadius: 6, backgroundColor: "#000" }} /> : null}
                  </View>
                  <Text className="text-body text-text dark:text-textDark">{s}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Continue button */}
        <View className="mt-6 mb-12">
          <TouchableOpacity onPress={onSubmit} className="bg-primary dark:bg-primaryDark py-4 rounded-full items-center">
            <Text className="text-background dark:text-backgroundDark font-semibold">{t("continue")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================
   END OF FILE
   ========================= */

