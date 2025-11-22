import PageTitle from "@/components/common/PageTitle";
import PrimaryButton from "@/components/common/PrimaryButton";
import { IconConstants } from "@/constants/icons.constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const TYPES = [
  {
    id: "house",
    label: "house",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&w=800&q=80",
  },
  {
    id: "villa",
    label: "villa",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&w=800&q=80",
  },
  {
    id: "apartment",
    label: "apartment",
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&w=800&q=80",
  },
  {
    id: "workspace",
    label: "workspace",
    image:
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&w=800&q=80",
  },
  {
    id: "cabin",
    label: "cabin",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&w=800&q=80",
  },
  {
    id: "cluster",
    label: "cluster",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&w=800&q=80",
  },
];


export default function RealEstateTypeScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [role, setRole] = useState<null | string>("")
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const role: string | null = await AsyncStorage.getItem("role")
        setRole(role)
        console.log(role)
      } catch (error) {
        console.log(error)
        toast.error("Cant fetch storage!")
      } finally {
      }
    }
    fetchStorage()
  }, [])

  const handleContinue = async () => {
    try {
      if (!selected) return toast.error(t('please_select_type'));
      await AsyncStorage.setItem("real-estate-type", selected)
      if (role === "prospective") return router.push("/(prospectiveTenant)/(tabs)")
      if (role === "tenant") return router.push("/(tenant)/(tabs)")
      if (role === "landlord") return router.push("/(landlord)/(tabs)")
      if (role === "agent") return router.push("/(landlord)/(tabs)")

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <PageTitle leftIcon={true} text="" leftOnPress={() => router.back()} />

        {/* arrow image  */}
        <Image
          source={IconConstants.FourSideArrow}
          className="size-10 ml-5 mt-4"

        />

        {/* Title */}
        <View className="px-6 mt-4">
          <Text className="text-subtitle font-bold text-text dark:text-textDark mb-1">
            {t('choose_real_estate_type')}
          </Text>

          <Text className="text-small text-secondary dark:text-secondaryDark">
            {t('select_preferable_type')}
          </Text>
        </View>

        {/* Grid Options */}
        <View className="px-6 mt-6 flex-row flex-wrap justify-between">
          {TYPES.map((item) => {
            const isSelected = selected === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelected(item.id)}
                className={`w-[48%] mb-6 rounded-2xl overflow-hidden border ${isSelected
                  ? "border-primary dark:border-primaryDark"
                  : "border-gray-300 dark:border-gray-700"
                  }`}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-36"
                  resizeMode="cover"
                />

                <View className="py-2 pl-5">
                  <Text className="text-text text-subtitle dark:text-textDark">{t(item.label)}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <View className="px-6 mt-4">
          <PrimaryButton
            title={t('lets_get_started')}
            onPress={handleContinue}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
