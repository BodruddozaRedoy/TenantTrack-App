import PageTitle from "@/components/common/PageTitle";
import PrimaryButton from "@/components/common/PrimaryButton";
import { IconConstants } from "@/constants/icons.constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
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
    label: "House",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&w=800&q=80",
  },
  {
    id: "villa",
    label: "Villa",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&w=800&q=80",
  },
  {
    id: "apartment",
    label: "Apartment",
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&w=800&q=80",
  },
  {
    id: "workspace",
    label: "Workspace",
    image:
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&w=800&q=80",
  },
  {
    id: "cabin",
    label: "Cabin",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&w=800&q=80",
  },
  {
    id: "cluster",
    label: "Cluster",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&w=800&q=80",
  },
];


export default function RealEstateTypeScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = async () => {
    try {
      if (!selected) return toast.error('Please select a type!!');
      await AsyncStorage.setItem("real-estate-type", selected)
      router.push("/(prospectiveTenant)/(tabs)");
    } catch {
      // Error handling if needed
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <PageTitle leftIcon={true} text="" />

        {/* arrow image  */}
        <Image
          source={IconConstants.FourSideArrow}
          className="size-10 ml-5 mt-4"

        />

        {/* Title */}
        <View className="px-6 mt-4">
          <Text className="text-subtitle font-bold text-text dark:text-textDark mb-1">
            Choose real estate type
          </Text>

          <Text className="text-small text-secondary dark:text-secondaryDark">
            Select your preferable real estate type below
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
                  <Text className="text-text text-subtitle dark:text-textDark">{item.label}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <View className="px-6 mt-4">
          <PrimaryButton
            title="Let's Get Started!"
            onPress={handleContinue}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
