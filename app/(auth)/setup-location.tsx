import PageTitle from "@/components/common/PageTitle";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import * as Location from "expo-location";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  Text,
  View
} from "react-native";

export default function SetLocationScreen() {
  const { t } = useTranslation();

  const handleAllowLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          t('permission_required'),
          t('enable_location_permission')
        );
        return;
      }

      // You can also fetch the user's location here if needed
      // const userLocation = await Location.getCurrentPositionAsync({});

        router.push("/(auth)/confirm-location?from=auto");
    } catch (error) {
      console.log(error);
      Alert.alert(t('error'), t('unable_access_location'));
    }
  };

  const handleManual = () => {
      router.push("/(auth)/confirm-location?from=manual");
  };

  return (
    <View className="flex-1 bg-background dark:bg-backgroundDark px-6 pt-14">
      {/* Back Button */}
      <PageTitle text="" leftIcon={true} leftOnPress={() => router.back()} />

      {/* Illustration */}
      <View className="items-center mt-20 mb-8">
        <Image
          source={require('../../assets/images/map-image.png')} // Replace with your asset
          resizeMode="contain"
          className="w-56 h-56"
        />
      </View>

      {/* Title */}
      <Text className="text-title text-center text-text dark:text-textDark font-bold mb-2">
        {t('set_location')}
      </Text>

      {/* Subtitle */}
      <Text className="text-small text-center text-secondary dark:text-secondaryDark mb-12">
        {t('let_us_know_location')}
      </Text>

      {/* Allow Google Maps */}
      <PrimaryButton
        title={t('allow_google_maps')}
        onPress={handleAllowLocation}
      />

      {/* Manual Button */}
      <SecondaryButton className="mt-5" onPress={handleManual} title={t('set_manually')} />
    </View>
  );
}
